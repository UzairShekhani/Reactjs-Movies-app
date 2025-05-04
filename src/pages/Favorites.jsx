import { useState } from 'react';
import MovieCard from '../components/MovieCard';

export default function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  const toggleFavorite = (movie) => {
    const updated = favorites.filter(m => m.imdbID !== movie.imdbID);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="favorites-page">
      <h2>Your Favorites</h2>
      <div className="movie-grid">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            toggleFavorite={toggleFavorite}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
}
