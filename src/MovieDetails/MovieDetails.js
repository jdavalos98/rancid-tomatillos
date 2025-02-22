
import { useParams, Link } from 'react-router-dom';
import './MovieDetails.css';
import { useState, useEffect } from 'react';
import homeIcon from '../icons/home.png';

const API_URL = "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
      fetch(`${API_URL}/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch movie");
          }
          return response.json();
        })
        .then(data => {
          console.log(data)
          setMovie(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;

  return (
    <section className='MovieDetails'>
       <h1>Rancid Tomatillos</h1>

        <Link to="/" className="back-button"><img src={homeIcon} alt="Home" className="home-icon" /></Link>
      <img
        className='backdrop'
        src={movie.backdrop_path}
        alt={`${movie.title} backdrop`}
      />
      <h2>{movie.title}</h2>
      <p>Genres: {movie.genre_ids.join(', ')}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Overview: {movie.overview}</p>
    </section>
  );
}

export default MovieDetails;
