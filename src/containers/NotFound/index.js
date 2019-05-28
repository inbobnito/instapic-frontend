
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(5)
    }
}));

export default function NotFound() {
    const classes = useStyles();
  return (
    <article className={classes.root}>
        <Typography variant="h1" align="center" gutterBottom>
            404
        </Typography>

        <Typography variant="h4" align="center" gutterBottom>
            Resource not found.
        </Typography>
    </article>
  );
}