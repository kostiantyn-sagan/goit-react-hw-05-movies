import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import * as theMovieDbAPI from '../services/themoviedb-api';
import Container from '../components/Container';
import MovieList from '../components/MovieList';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomeView() {
  const [status, setStatus] = useState(Status.IDLE);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus(Status.PENDING);

    theMovieDbAPI
      .fetchTrending()
      .then(({ results }) => {
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, []);

  useEffect(() => {
    if (status !== Status.REJECTED) {
      return;
    }

    toast.error(error.message);
  }, [error, status]);

  return (
    <section>
      <Container>
        <h1 className="homeViewTitle">Trending today</h1>

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
