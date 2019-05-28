import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { registerUser } from '../../containers/App/actions';

const useStyles = makeStyles(theme => ({
    signupButton: {
        marginTop: theme.spacing(2)
    },
    progress: {
        margin: theme.spacing(2),
      },
}));

const RegistrationForm = ({dispatch, isLoading, isError, username}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    let uname;
    let pass;

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(registerUser({username: uname, password: pass}));
    };

    function getPass(event) {
        pass = event.target.value;
    }

    function getUserName(event) {
        uname = event.target.value;
    }

    function onOpenRegistrationDialogue() {
      setOpen(true);
    }
  
    function handleClose() {
      setOpen(false);
    }

    useEffect(() => {
        if (username) {
            setOpen(false);
        }
    });

    return (
        <span>
            <Button color="inherit" onClick={onOpenRegistrationDialogue}>Sign Up</Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                <DialogContent>
                    {isLoading && <CircularProgress className={classes.progress} /> }
                    {isError && <Typography align="center" variant="h5">An error occured.</Typography>}
                    {!isLoading && <form className={classes.form} noValidate onSubmit={handleSubmit}> 
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            onChange={getUserName}
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            onChange={getPass}
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        </Grid>
                    </Grid>
                    <div className={classes.signupButton}>
                        <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                            Sign Up
                        </Button>
                    </div>
                    </form> }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    )
}

const mapStateToProps = state => ({
        isLoading: state.appReducer.loading,
        isError: state.appReducer.error,
        username: state.appReducer.username
});
  
export default connect(mapStateToProps)(RegistrationForm);