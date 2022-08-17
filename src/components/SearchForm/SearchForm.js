import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import s from './SearchForm.module.css';

export default function SearchForm({ onSubmit, styles }) {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.warn('Search by empty string!');
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
      <input
        className={s.input}
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
        autoComplete="off"
        placeholder="Search movies"
      />
      <button className={s.btn} type="submit">
        <FaSearch />
        <span className={s.label}>Search</span>
      </button>
    </form>
  );
}
