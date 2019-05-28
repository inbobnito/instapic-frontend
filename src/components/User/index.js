import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageFeed from '../../components/ImageFeed';
import { Typography } from '@material-ui/core';
import Container  from '@material-ui/core/Container';
import { connect } from 'react-redux';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    uname: {
        fontWeight: 500
    },
    header: {
        margin: theme.spacing(4)
    }
}));

export function User({match, userNotFound}) {
    const classes = useStyles();
    return (
        <section className={classes.root}>
         <Container maxWidth="md" className={classes.header}>
            {!userNotFound && <Typography variant="h5">
                Viewing images submitted by <span className={classes.uname}>{match.params.id}</span>:
            </Typography> }
            {userNotFound && <Typography variant="h4">User not found.</Typography>}
            </Container>

            <ImageFeed user={match.params.id} />
        </section>
    );
}

const mapStateToProps = state => ({
    isLoading: state.appReducer.loading,
    userNotFound: state.appReducer.userNotFound,
    username: state.appReducer.username
});

export default connect(mapStateToProps)(User);