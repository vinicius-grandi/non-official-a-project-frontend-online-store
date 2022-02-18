import React from 'react';
import { BrowserRouter as Router, Route, Switch as Routes } from 'react-router-dom';
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';
import CheckoutProducts from './pages/CheckoutProducts';
import ProductDetails from './pages/ProductDetails';
import './App.css';

// {
//   "id": "MLB5672",
//   "name": "Acessórios para Veículos"
// },
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" component={ Search } />
        <Route exact path="/shopping-cart" component={ ShoppingCart } />
        <Route exact path="/checkout-products" component={ CheckoutProducts } />
        <Route exact path="/:id" component={ ProductDetails } />
      </Routes>
    </Router>
  );
}

export default App;
