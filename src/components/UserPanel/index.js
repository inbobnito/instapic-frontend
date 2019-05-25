import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import LoginForm from '../LoginForm';
import RegistrationForm from '../RegistrationForm';

const useStyles = makeStyles(theme => ({
    hero: {
        margin: theme.spacing(5)
    }
}));

export default function UserPanel() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    function onOpenLoginDiaglogue() {
        console.log("setting open");
      setOpen(true);
    }
  
    function handleClose() {
      setOpen(false);
    }

    return (
        <div>
           <LoginForm />
           <RegistrationForm />
        </div>
    )
}