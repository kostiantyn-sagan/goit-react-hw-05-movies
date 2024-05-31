import { lazy, useState, useEffect, Suspense } from 'react';
import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import * as theMovieDbAPI from '../services/themoviedb-api';
import Container from '../components/Container';
import GoBackButton from '../components/GoBackButton';
import MovieCard from '../components/MovieCard';
import FallbackLoader from '../components/FallbackLoader';

const Cast = lazy(() =>
  import('../components/Cast' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../components/Reviews' /* webpackChunkName: "reviews" */),
);

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MovieDetailsView() {
  const { movieId } = useParams();
  const { path } = useRouteMatch();

  const [status, setStatus] = useState(Status.IDLE);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus(Status.PENDING);

    theMovieDbAPI
      .fetchMovieById(movieId)
      .then(movie => {
        setMovie(movie);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  useEffect(() => {
    if (status !== Status.REJECTED) {
      return;
    }

    toast.error(error.message);
  }, [error, status]);

  return (
    <section>
      <Container>
        <GoBackButton />

        {status === Status.PENDING && (
          <Loader
            type="Audio"
            height={60}
            width={60}
            color="#DBC2CF"
            className="loader"
          />
        )}

        {status === Status.RESOLVED && (
          <article>
            <MovieCard
              posterPath={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
              voteAverage={movie.vote_average}
              overview={movie.overview}
              genres={movie.genres}
            />

            <Suspense fallback={<FallbackLoader />}>
              <Switch>
                <Route path={`${path}/cast`}>
                  <Cast credits={movie.credits} />
                </Route>
                <Route path={`${path}/reviews`}>
                  <Reviews reviews={movie.reviews} />
                </Route>
              </Switch>
            </Suspense>
          </article>
        )}
      </Container>
    </section>
  );
}
