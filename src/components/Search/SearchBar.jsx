import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ setSearch, category }) => (
  <div id="search-bar-container">
    <label
      htmlFor="search-bar"
      data-testid="home-initial-message"
      id="initial-message"
    >
      <input
        type="text"
        id="search-bar"
        data-testid="query-input"
        onChange={ (e) => setSearch({ search: e.target.value, category }) }
      />
      <br />
      Digite algum termo de pesquisa ou escolha uma categoria
    </label>
  </div>
);

SearchBar.propTypes = {
  setSearch: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default SearchBar;
