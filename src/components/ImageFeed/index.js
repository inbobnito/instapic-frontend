import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import { actionLoadImages } from '../../containers/App/actions';
import { connect } from 'react-redux';
import { LinearProgress, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    loader: {
        flexGrow: 1,
        width: '700px',
        margin: theme.spacing(5)
    },
    image: {
        padding: theme.spacing(2),
        margin: '0 auto 0',
        display: 'block',
        width: '75%'
    },
    box: {
        padding: theme.spacing(2),
        margin: '0 auto 0',
        display: 'block',
        width: '50%'
    }
}));

export function ImageFeed({dispatch, user, isLoading, isError, images}) {
    const classes = useStyles();
    const [loaded, setLoaded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [currImage, setImage] = React.useState({});

    function handleClose() {
        setOpen(false);
    }

    function onOpenDialogue(image) {
            setImage(image);
            setOpen(true);

    }

    useEffect(() => {
        if (!loaded) {
            dispatch(actionLoadImages({user: user}));   
            setLoaded(true);
        }
    });

    return (
        <section>
            {!isLoading && <GridList cols={3} cellHeight={350}>
                {images && images.length > 0 && images.map(image => (
                    <GridListTile key={image.created_on} cols={images.length <= 3 ? 3 - images.length : 1}>
                        <img src={image.image} alt={image.title} />
                        <GridListTileBar
                            title={image.title}
                            subtitle={<span>{`By ${image.user_name}`}</span>}
                            actionIcon={
                            <IconButton className={classes.icon} onClick={() => onOpenDialogue(image)}>
                                <InfoIcon />
                            </IconButton>
                        }/>
                    </GridListTile>
                ))}
            </GridList> }
             <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <AppBar>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                        <CloseIcon />
                        </IconButton>
                        <Typography variant="h6">
                        Viewing image: {currImage.title}
                        </Typography>
                    </Toolbar>
                    </AppBar>
                     <DialogTitle id="form-dialog-title">{currImage.title}</DialogTitle>
                     <Container> 
                         <Paper>
                            <img className={classes.image} src={currImage.image} alt={currImage.title} />
                            <Box className={classes.box}>
                                <Typography align="center" variant="h6"><em>{currImage.description}</em></Typography>
                                <Typography align="center" variant="h6">Author: {currImage.user_name}</Typography>
                                <Typography align="center" gutterBottom>{`Submitted on ${(new Date(currImage.created_on).toLocaleDateString())} at ${(new Date(currImage.created_on).toLocaleTimeString())}`}</Typography>
                            </Box>
                         </Paper>
                     </Container>
            </Dialog> 
            {isLoading && <div className={classes.loader}><LinearProgress variant="query" /></div>}
            {!isLoading && images && images.length === 0 && <Typography className={classes.loader} align="center" variant="h6">No Images uploaded.</Typography>}
        </section>
    )
}

const mapStateToProps = state => ({
    isLoading: state.appReducer.loading,
    isError: state.appReducer.error,
    images: state.appReducer.images
});

export default connect(mapStateToProps)(ImageFeed);