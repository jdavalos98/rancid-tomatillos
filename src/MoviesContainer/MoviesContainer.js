import './MoviesContainer.css';
import React from 'react';
import MoviePoster from '../MoviePoster/MoviePoster';
import VoteCount from '../VoteCount/VoteCount';
import { Link } from 'react-router-dom';

function Movies({ movies, onMovieClick, upvoteMovie, downvoteMovie }) {
  return (
    <section className='MoviesContainer'>
      <div className='movies-grid'>
        {movies.map((movie) => (
          <div key={movie.id} className='movie-card'>
            <Link to={`/${movie.id}`} className="movie-link">
              <MoviePoster movie={movie} />
            </Link>
            <VoteCount
              votes={movie.vote_count}
              upvote={(e) => {
                e.stopPropagation();
                upvoteMovie(movie.id);
              }}
              downvote={(e) => {
                e.stopPropagation();
                downvoteMovie(movie.id);
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Movies;
