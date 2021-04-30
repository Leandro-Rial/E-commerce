import React, {useContext} from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from '../mainPages/Products/Products';
import DetailProduct from './DetailProduct/DetailProduct';
import Cart from '../mainPages/Cart/Cart';
import Login from '../mainPages/Auth/Login';
import Register from '../mainPages/Auth/Register';
import Categories from '../mainPages/Categories/Categories';
import CreateProduct from '../mainPages/CreateProduct/CreateProduct';
import NotFound from '../mainPages/Utils/NotFound/NotFound';
import {GlobalState} from '../../GlobalState';

const Pages = () => {

    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
        <Switch>
            <Route path="/" exact component={Products} />

            <Route path="/detail/:id" component={DetailProduct} />

            <Route path="/login" component={ isLogged ? NotFound : Login} />
            <Route path="/register" component={ isLogged ? NotFound : Register} />
            
            <Route path="/category" component={ isAdmin ? Categories : NotFound} />
            
            <Route path="/create_product" component={ isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" component={ isAdmin ? CreateProduct : NotFound} />

            <Route path="/cart" component={Cart} />
            
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default Pages
