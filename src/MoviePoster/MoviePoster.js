import './MoviePoster.css';

function MoviePoster() {
  return (
    <section className='MoviePoster'>
      <div className="movie-card">
        <img src={MoviePoster.poster_path} alt={movie.title} />
      </div>
    </section>
  );
}

export default MoviePoster;