import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import NotFound from '../NotFound';
import Index from '../Index';
import Users from '../Users';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Images from '../Images';
  
export default function App() {
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