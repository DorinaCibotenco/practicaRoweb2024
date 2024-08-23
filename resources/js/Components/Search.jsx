import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  return (
    <form action="/search" method="GET" className="flex items-end">
      <input
        type="text"
        name="query"
        placeholder="Search..."
        className="px-4 py-2 w-full border border-zinc-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
      <button
      type="submit"
      className="flex items-center px-4 py-3 text-white bg-slate-700 border border-green-800 rounded-full hover:bg-slate-600 focus:ring-2 focus:ring-zinc-500 focus:outline-none"
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2 ml-2" />
    </button>
    </form>
  );
};

export default Search;
