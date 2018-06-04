import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Product from './containers/Product';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Product}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        );
    }
}
