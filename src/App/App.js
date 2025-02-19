import './App.css';
import { useState, useEffect } from 'react';
import Movies from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails';
import moviePosters from '../data/movie_posters'; 
import movieDetails from '../data/movie_details';

function App() {

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : moviePosters;
  });

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  
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
        {selectedMovie && <button onClick={() => setSelectedMovie(null)}>Home</button>}
      </header>

      {selectedMovie ? (
        <MovieDetails movie={movieDetails} />
      ) : (
        <Movies 
          movies={movies} 
          onMovieClick={() => setSelectedMovie(movieDetails)} 
          upvoteMovie={upvoteMovie} 
          downvoteMovie={downvoteMovie} 
        />
      )}
    </main>
  );
}

export default App;
