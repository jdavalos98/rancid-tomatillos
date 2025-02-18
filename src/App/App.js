import './App.css';
import searchIcon from '../icons/search.png';

import { useState, useEffect } from 'react';
import MoviePoster from '../MoviePoster/MoviePoster'
import moviePosters from '../data/movie_posters'; 
import movieDetails from '../data/movie_details';
import Movies from '../MoviesContainer/MoviesContainer';

function App() {
  const [movies, setMovies] = useState(moviePosters);

  const upvoteMovie = (id) => {
    setMovies(movies.map(movie => 
      movie.id === id ? { ...movie, vote_count: movie.vote_count + 1 } : movie
    ));
  };

  const downvoteMovie = (id) => {
    setMovies(movies.map(movie => 
      movie.id === id && movie.vote_count > 0 
        ? { ...movie, vote_count: movie.vote_count - 1 } 
        : movie
    ));
  };

  return (
    <main className='App'>
      <header>
        <h1>Rancid Tomatillos</h1>
      </header>
      <Movies movies={movies} upvoteMovie={upvoteMovie} downvoteMovie={downvoteMovie} />
    </main>
  );
}

export default App;