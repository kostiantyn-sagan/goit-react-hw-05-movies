import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import * as theMovieDbAPI from '../services/themoviedb-api';
import Container from '../components/Container';
import SearchForm from '../components/SearchForm';
import MovieList from '../components/MovieList';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesView() {
  const location = useLocation();
  const history = useHistory();
  const searchQuery = new URLSearchParams(location.search).get('query');

  const [status, setStatus] = useState(Status.IDLE);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      setStatus(Status.IDLE);
      return;
    }

    setStatus(Status.PENDING);

    theMovieDbAPI
      .fetchMoviesByQuery(searchQuery)
      .then(({ results }) => {
        if (results.length === 0) {
          return Promise.reject(
            new Error('There are no suggestions for your query'),
          );
        }

        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery]);

  useEffect(() => {
    if (status !== Status.REJECTED) {
      return;
    }

    toast.error(error.message);
  }, [error, status]);

  const changeURLSearchParams = query => {
    history.push({ ...location, search: `query=${query.toLowerCase()}` });
  };

  return (
    <section>
      <Container>
        <SearchForm
          onSubmit={changeURLSearchParams}
          styles={{
            marginBottom:
              status === Status.IDLE || status === Status.REJECTED
                ? '0'
                : '16px',
          }}
        />

        {status === Status.PENDING && (
          <Loader
            type="Audio"
            height={60}
            width={60}
            color="#DBC2CF"
            className="loader"
          />
        )}

        {status === Status.RESOLVED && <MovieList movies={movies} />}
      </Container>
    </section>
  );
}
