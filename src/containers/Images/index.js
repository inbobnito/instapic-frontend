import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import Upload from '../../components/Upload';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    }
}));

export default function Images({match}) {
    const classes = useStyles();
    return (
        <section className={classes.root}>
            <Route path={`${match.path}/:id`} component={Image} />
            <Route
                exact
                path={match.path}
                component={Upload}
            />
        </section>
    );
}