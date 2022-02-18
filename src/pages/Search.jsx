import React, { useState } from 'react';
import Categories from '../components/Search/Categories';
import SearchBar from '../components/Search/SearchBar';
import Products from '../components/Products';
import { useProductCount } from '../contexts/ShoppingCartProvider';
import ShoppingCartIcon from '../components/ShoppingCart/ShoppingCartIcon';

const Search = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState({ search: '', category: '' });
  const { count } = useProductCount();
  return (
    <div className="search-form">
      <div className="categories">
        <p>Categorias: </p>
        <Categories setCategory={ setQuery } search={ query.search } />
      </div>
      <div className="container">
        <div>
          <SearchBar setSearch={ setQuery } category={ query.category } />
          <button
            type="button"
            data-testid="query-button"
            id="query-button"
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
      <ShoppingCartIcon count={ count } />
    </div>
  );
};

export default Search;
