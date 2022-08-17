import { lazy, useState, useEffect, Suspense } from 'react';
import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import * as theMovieDbAPI from '../services/themoviedb-api';
import Container from '../components/Container';
import GoBackButton from '../components/GoBackButton';
import Description from '../components/Description';
import AdditionalInfo from '../components/AdditionalInfo';
import FallbackLoader from '../components/FallbackLoader';

const Cast = lazy(() => import('./Cast.js' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('./Reviews.js' /* webpackChunkName: "reviews" */),
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

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

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
        toast.error(error.message);
      });
  }, [movieId]);

  // const onGoBack = () => {
  //   history.push(location?.state?.from ?? '/');
  // };

  return (
    <section>
      <Container>
        {/* <button type="button" onClick={onGoBack}>
        Назад
      </button> */}
        <GoBackButton />

        {status === Status.PENDING && (
          <Loader
            className="loader"
            type="Audio"
            height={60}
            width={60}
            color="#C5AFA4"
          />
        )}

        {/* {status === Status.REJECTED && <p>{error.message}</p>} */}

        {status === Status.RESOLVED && (
          <article>
            <Description
              posterPath={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
              voteAverage={movie.vote_average}
              overview={movie.overview}
              genres={movie.genres}
            />
            <AdditionalInfo />

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
