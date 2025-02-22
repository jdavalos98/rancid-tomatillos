import movieDetails from '../fixtures/movie_details.json';
import posters from '../fixtures/movie_posters.json'

describe('Movie Details Page', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/122',
      {
        statusCode: 200,
        body: movieDetails
      }
    ).as('getMovieDetails');

    cy.visit('http://localhost:3000/122');
    cy.wait('@getMovieDetails');
  });

  it('displays the correct movie details', () => {
    cy.get('h1').contains('Rancid Tomatillos');

    cy.get('.MovieDetails h2').should('contain', movieDetails.title);
    cy.get('.backdrop').should('have.attr', 'src', movieDetails.backdrop_path);
    
    cy.get('.MovieDetails').within(() => {
      cy.contains(`Genres: ${movieDetails.genres.join(', ')}`).should('exist');
      cy.contains(movieDetails.release_date).should('exist');
      cy.contains(movieDetails.overview).should('exist');
    });
  });

  it('has a working back to home button', () => {
    cy.intercept('GET', 'https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies', {
      statusCode: 200,
      body: posters
    }).as('getMovies');
    cy.get('.back-button').should('contain', 'Back to Home').click();
    cy.visit('http://localhost:3000/');
    cy.url().should('eq', 'http://localhost:3000/');
  });

  describe('Fetch Movie Details - Error Case', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/999', {
        statusCode: 404, 
        body: {}  
      }).as('getMovieDetailsError');
    });
  
    it('should display an error message when movie details fetch fails', () => {
      cy.visit('http://localhost:3000/999');
      cy.wait('@getMovieDetailsError');
      cy.contains('Error: Failed to fetch movie');
    });
  });
  
});
