import React, { useState, useRef } from 'react';
import Categories from '../components/Search/Categories';
import SearchBar from '../components/Search/SearchBar';
import Products from '../components/Products';
import ShoppingCartIcon from '../components/ShoppingCart/ShoppingCartIcon';

const Search = () => {
  const [search, setSearch] = useState('');
  const queryButtonRef = useRef(null);
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState({ search: '', category: '' });
  return (
    <div className="search-form">
      <div className="categories">
        <p>Categorias: </p>
        <Categories setCategory={ setQuery } search={ query.search } />
      </div>
      <div className="container">
        <div>
          <SearchBar setSearch={ setQuery } category={ query.category } queryButtonRef={queryButtonRef} />
          <button
            type="button"
            data-testid="query-button"
            id="query-button"
            ref={queryButtonRef}
            onClick={ () => {
              setCategory(query.search);
              setSearch(query.search);
            } }
          >
            Search
          </button>
        </div>
        {(search !== '' && category !== '')
          && (
            <Products
              search={ search }
              category={ category }
            />
          ) }
      </div>
      <ShoppingCartIcon />
    </div>
  );
};

export default Search;
