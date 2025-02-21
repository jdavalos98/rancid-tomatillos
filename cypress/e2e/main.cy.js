import posters from '../fixtures/movie_posters.json'
// import details from '../fixtures/movie_details.json' (you will need to add your own mock data to this file!)

describe('Main Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies', {
      statusCode: 200,
      body: posters
    }).as('getMovies');

    cy.visit('http://localhost:3000/');
  });
  it('displays title on page load', () => {
    cy.get('h1').contains('Rancid Tomatillos');
  });

  it('displays the correct number of movie posters', () => {
    cy.wait('@getMovies'); 

    
    cy.get('.MoviePoster img').should('have.length', posters.length);
  });

  it('displays the correct first and last movie posters', () => {
    cy.wait('@getMovies');

    
    cy.get('.MoviePoster img').first().should('have.attr', 'src', posters[0].poster_path);

    
    cy.get('.MoviePoster img').last().should('have.attr', 'src', posters[posters.length - 1].poster_path);
  });
})