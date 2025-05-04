/** @format */

import { Link } from "react-router-dom";

export default function MovieCard({ movie, toggleFavorite, isFavorite }) {
  return (
    <div className='movie-card'>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <div className='card-actions'>
        <Link to={`/movie/${movie.imdbID}`} className='custom-btn details'>
           Details
        </Link>
        <button
          onClick={() => toggleFavorite(movie)}
          className='custom-btn favorite'>
          {isFavorite ? "★ Remove" : "☆ Favorite"}
        </button>
      </div>
    </div>
  );
}
