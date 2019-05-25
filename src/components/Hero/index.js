import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    hero: {
        margin: theme.spacing(5)
    }
}));

export default function Hero() {
    const classes = useStyles();
    return (
        <Container maxWidth="sm" className={classes.hero}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                InstaPic
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                The latest memes.
            </Typography>
        </Container>
    )
}