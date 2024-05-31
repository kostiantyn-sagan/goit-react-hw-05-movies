import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import s from './SearchForm.module.css';

export default function SearchForm({ onSubmit, styles }) {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.warn('Search by empty string!');
      setQuery('');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <form
      className={s.searchForm}
      onSubmit={handleSubmit}
      style={{ ...styles }}
    >
      <button className={s.btn} type="submit">
        <FaSearch />
        <span className={s.label}>Search</span>
      </button>
      <input
        className={s.input}
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
        autoComplete="off"
        placeholder="Search movies"
      />
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  styles: PropTypes.object,
};
