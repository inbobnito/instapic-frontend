import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Hero from '../../components/Hero';
import ImageFeed from '../../components/ImageFeed';
import { connect } from 'react-redux';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    form: {
        margin: theme.spacing(4)
    },
    button: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2)
    }
}));

export function Index({isLoading}) {
    const classes = useStyles();
    const [user, setUser] = React.useState(null);

    function handleUser(event) {
        setUser(event.target.value);
    }

    return (
        <section className={classes.root}>
            <Hero />
            {!isLoading && <div className={classes.form}>
                <TextField
                    onChange={handleUser}
                    id="standard-dense"
                    label="Search images by user"
                    margin="dense"
                />
                <Button color="secondary" variant="contained" className={classes.button} disabled={!user}>
                    <Link color="inherit" component={RouterLink} to={`/user/${user}`}>Search User</Link>
                </Button>
            </div> }
           
            <ImageFeed />
        </section>
    );
}

const mapStateToProps = state => ({
    isLoading: state.appReducer.loading,
    isError: state.appReducer.error,
});

export default connect(mapStateToProps)(Index)