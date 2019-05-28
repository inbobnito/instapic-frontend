import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const pageDate = new Date();

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2)
    }
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.root}>
            <Typography variant="body2" color="textSecondary" align="center">
                {`Loaded on `} <em>{pageDate.toLocaleDateString()}</em> {` at `} <em>{pageDate.toLocaleTimeString()}</em>
            </Typography>
        </footer>
    );
}