import './MoviesContainer.css';
import React from 'react'
import MoviePoster from "../MoviePoster/MoviePoster";
import VoteCount from "../VoteCount/VoteCount"

function Movies({movies, upvoteMovie, downvoteMovie}) {
  return (
      <section className='MoviesContainer'>
        <div className='movies-grid'>
          {movies.map((movie) => (
             <div key={movie.id} className="movie-card">
             <MoviePoster movie={movie} />
             <VoteCount 
                votes={movie.vote_count}
                upvote={() => upvoteMovie(movie.id)}
                downvote={() => downvoteMovie(movie.id)} />
           </div>
          ))}
          </div>
      </section>
  );
}
  
export default Movies;