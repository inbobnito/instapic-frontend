import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import User from '../../components/User';
import NotFound from '../NotFound';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    }
}));

export default function Users({match}) {
    const classes = useStyles();
    return (
        <section className={classes.root}>
            <Route path={`${match.path}/:id`} component={User} />
            <Route
                exact
                path='/'
                component={NotFound}
            />
        </section>
    );
}