import './MoviesContainer.css';
import React from 'react'
import MoviePoster from "./MoviePoster"

function Movies({movies}) {
  return (
      <section className='MoviesContainer'>
        <div className='movies-grid'>
          {movies.map((movie) => (
            <MoviePoster key={movie.id} movie={movie} />
          ))}
          </div>
      </section>
  );
}
  
export default Movies;