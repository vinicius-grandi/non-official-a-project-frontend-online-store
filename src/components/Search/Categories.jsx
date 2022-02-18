import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import * as api from '../../services/api';

const Categories = ({ setCategory, search }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  if (categories.length === 0) {
    return (<p>carregando</p>);
  }

  return (
    categories.map(
      (category) => (
        <label htmlFor={ category.id } key={ category.name } data-testid="category">
          <input
            type="radio"
            value={ category.id }
            id={ category.id }
            name="category"
            onClick={ (e) => setCategory({ search, category: e.target.value }) }
          />
          {category.name}
        </label>
      ),
    )
  );
};

Categories.propTypes = {
  setCategory: Proptypes.func.isRequired,
  search: Proptypes.string.isRequired,
};

export default Categories;
