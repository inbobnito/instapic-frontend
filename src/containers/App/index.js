import React, {useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import NotFound from '../NotFound';
import Index from '../Index';
import Users from '../Users';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Images from '../Images';
import { connect } from 'react-redux';
import {checkLogIn} from './actions';
  
export function App({dispatch}) {
    let loaded = false;

    // Check login
    useEffect(() => {
        if (!loaded) {
            setImmediate(() => dispatch(checkLogIn()), 1000);
            loaded = true;
        }
    });

    return (
        <div>
            <Header />
            <Container>
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route path="/user" component={Users} />
                    <Route path="/image" component={Images} />
                    <Route path="" component={NotFound} />
                </Switch>
            </Container>
            <Footer />
        </div>
    )
}

export default connect()(App)