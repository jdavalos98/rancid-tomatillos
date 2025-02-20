import './App.css';
import { useState, useEffect } from 'react';
import Movies from '../MoviesContainer/MoviesContainer';

const API_URL = "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies";

function App() {
  const [movies, setMovies] = useState([]);
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

  if (loading) return <h2>Loading movies...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <main className='App'>
      <header>
        <h1>Rancid Tomatillos</h1>
      </header>
      <Movies movies={movies} />
    </main>
  );
}

export default App;