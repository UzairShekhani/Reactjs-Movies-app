import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import toast, { Toaster } from 'react-hot-toast';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('Avengers');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  const fetchMovies = async (title) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://www.omdbapi.com/`, {
        params: {
          apikey: API_KEY,
          s: title,
        },
      });

      if (res.data.Response === 'True') {
        setMovies(res.data.Search);
      } else {
        setMovies([]);
        toast.error('No movies found');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error('Error fetching movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      setSearchTerm(query.trim());
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const toggleFavorite = (movie) => {
    const exists = favorites.find(m => m.imdbID === movie.imdbID);
    const updated = exists
      ? favorites.filter(m => m.imdbID !== movie.imdbID)
      : [...favorites, movie];

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));

    toast.success(
      exists ? 'Removed from Favorites' : 'Added to Favorites'
    );
  };

  return (
    <div className="home-page">
      {/* Toaster component */}
      <Toaster position="top-right" />

      {/* Search bar */}
      <div className="search-bar" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleEnterKey}
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffa500',
            border: 'none',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      {/* Loader */}
      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '18px' }}>Loading movies...</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some((m) => m.imdbID === movie.imdbID)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
