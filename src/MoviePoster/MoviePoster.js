import './MoviePoster.css';

function MoviePoster({ movie }) {
  return (
    <section className='MoviePoster'>
      <div className="movie-card">
        <img src={movie.poster_path} alt={movie.title} />
      </div>
    </section>
  );
}

export default MoviePoster;