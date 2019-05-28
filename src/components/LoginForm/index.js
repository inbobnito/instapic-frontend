import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { signInUser } from '../../containers/App/actions';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
}));

export function LoginForm({dispatch}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let uname;
    let pass;

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(signInUser({user_name: uname, password: pass}));
    }

    function getPass(event) {
        pass = event.target.value;
    }

    function getUserName(event) {
        uname = event.target.value;
    }

    function onOpenLoginDiaglogue() {
      setOpen(true);
    }
  
    function handleClose() {
      setOpen(false);
    }

    return (
        <span>
            <Button color="inherit" onClick={onOpenLoginDiaglogue}>Login</Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            onChange={getUserName}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User name"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            onChange={getPass}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
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

export default connect()(LoginForm);