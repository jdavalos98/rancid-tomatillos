import './MoviesContainer.css';
import React from 'react'
import MoviePoster from "../MoviePoster/MoviePoster";
import VoteCount from "../VoteCount/VoteCount"

function Movies({movies}) {
  return (
      <section className='MoviesContainer'>
        <div className='movies-grid'>
          {movies.map((movie) => (
             <div key={movie.id} className="movie-card">
             <MoviePoster movie={movie} />
             <VoteCount votes={movie.vote_count} />
           </div>
          ))}
          </div>
      </section>
  );
}
  
export default Movies;