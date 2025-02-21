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

})