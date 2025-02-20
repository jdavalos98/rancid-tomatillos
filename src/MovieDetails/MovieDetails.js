import './MovieDetails.css';

function MovieDetails({ movie }) {
  return (
    <section className='MovieDetails'>
      <img 
        className='backdrop' 
        src={movie.backdrop_path} 
        alt={`${movie.title} backdrop`} 
      />
      <h2>{movie.title}</h2>
        <p>Genres:{movie.genre_ids.join(', ')}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Overview:{movie.overview}</p>
    </section>
  );
}

export default MovieDetails;