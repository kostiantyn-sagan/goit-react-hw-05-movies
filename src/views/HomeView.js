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
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

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
        toast.error(error.message);
      });
  }, []);

  // if (status === Status.REJECTED) {
  //   toast('qweewqeqw');
  //   return <p>{error.message}</p>;
  // }

  return (
    <section>
      <Container>
        <h1 className="trendingTitle">Trending today</h1>

        {status === Status.PENDING && (
          <Loader
            className="loader"
            type="Audio"
            height={60}
            width={60}
            color="#C5AFA4"
          />
        )}

        {status === Status.RESOLVED && <MovieList movies={movies} />}
      </Container>
    </section>
  );
}
