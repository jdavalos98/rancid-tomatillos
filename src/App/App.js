import './App.css';
import { useState, useEffect } from 'react';
import Movies from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails';

const API_URL = "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const fetchMovieDetails = (id) => {
    setLoading(true);
    fetch(`${API_URL}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        return response.json();
      })
      .then((data) => {
        setSelectedMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const upvoteMovie = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote_direction: 'up' }),
    })
      .then((response) => response.json())
      .then((updatedMovie) => {
        setMovies(
          movies.map((movie) =>
            movie.id === updatedMovie.id ? updatedMovie : movie
          )
        );
      })
      .catch(() => {
        setError('Error updating vote');
      });
  };

  const downvoteMovie = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote_direction: 'down' }),
    })
      .then((response) => response.json())
      .then((updatedMovie) => {
        setMovies(
          movies.map((movie) =>
            movie.id === updatedMovie.id ? updatedMovie : movie
          )
        );
      })
      .catch(() => {
        setError('Error updating vote');
      });
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <main className='App'>
      <header>
        <h1>Rancid Tomatillos</h1>
        {selectedMovie && (
          <button onClick={() => setSelectedMovie(null)}>Back to Movies</button>
        )}
      </header>

      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} />
      ) : (
        <Movies
          movies={movies}
          onMovieClick={(movie) => fetchMovieDetails(movie.id)}
          upvoteMovie={upvoteMovie}
          downvoteMovie={downvoteMovie}
        />
      )}
    </main>
  );
}

export default App;