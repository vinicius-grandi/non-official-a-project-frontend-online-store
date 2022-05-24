import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ setSearch, category, queryButtonRef }) => (
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
        onKeyDown={(e) => {
          if (e.key === 'Enter' && queryButtonRef.current) {
            queryButtonRef.current.click();
          }
        }}
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
  queryButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default SearchBar;
