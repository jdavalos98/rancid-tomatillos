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

  it('increases vote count when upvoted', () => {
    const movie = posters[0]
    const updatedVotes = movie.vote_count + 1

    cy.intercept('PATCH', `https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${movie.id}`, {
      statusCode: 200,
      body: { ...movie, vote_count: updatedVotes }
    }).as('upvoteMovie');

    cy.get('.movie-card').first().within(() => {
      cy.get('.vote-count').should('contain', movie.vote_count)
      cy.get('.up-vote-btn').click()
    })
    
    cy.wait('@upvoteMovie')
    cy.get('.movie-card').first().within(() => {
      cy.get('.vote-count').should('contain', updatedVotes)
    })
  })

  it('decreases vote count when downvoted', () => {
    const movie = posters[0]
    const updatedVotes = movie.vote_count - 1

    cy.intercept('PATCH', `https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${movie.id}`, {
      statusCode: 200,
      body: { ...movie, vote_count: updatedVotes }
    }).as('downvoteMovie');

    cy.get('.movie-card').first().within(() => {
      cy.get('.vote-count').should('contain', movie.vote_count)
      cy.get('.down-vote-btn').click()
    })

    cy.wait('@downvoteMovie')
    cy.get('.movie-card').first().within(() => {
      cy.get('.vote-count').should('contain', updatedVotes)
    })
  })
})