import './App.css';
import searchIcon from '../icons/search.png';

// import { useState, useEffect } from 'react';
import MoviePoster from '../MoviePoster/MoviePoster'
import moviePosters from '../data/movie_posters'; 
import movieDetails from '../data/movie_details';
import Movies from '../MoviesContainer/MoviesContainer';

function App() {
  const [movies, setMovies] = useState(moviePosters)
  return (
    <main className='App'>
      <header>
        <h1>Rancid Tomatillos</h1>
      </header>
      <Movies movies={moviePosters} />
    </main>
  );
}

export default App;
