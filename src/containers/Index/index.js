import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Hero from '../../components/Hero';
import ImageFeed from '../../components/ImageFeed';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    }
}));

export default function Index() {
    const classes = useStyles();
    return (
        <section className={classes.root}>
            <Hero />
            <ImageFeed />
        </section>
    );
}