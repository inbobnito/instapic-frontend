import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageFeed from '../../components/ImageFeed';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },

    uname: {
        fontWeight: 500
    }
}));

export default function User({match}) {
    const classes = useStyles();
    return (
        <section className={classes.root}>
            <Typography variant="h5">
                Viewing images submitted by <span className={classes.uname}>{match.params.id}</span>:
            </Typography>

            <ImageFeed />
        </section>
    );
}