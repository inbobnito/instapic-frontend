import React from 'react';
import Button from '@material-ui/core/Button';
import LoginForm from '../LoginForm';
import RegistrationForm from '../RegistrationForm';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux';
import { logout } from '../../containers/App/actions';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

export function UserPanel({dispatch, username}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    function handleMenu(event) {
      setAnchorEl(event.currentTarget);
    }
  
    function handleClose() {
      setAnchorEl(null);
    }

    function handleLogout() {
        dispatch(logout());
    }

    return (
        <div>
           {!username && <LoginForm />}
           {!username && <RegistrationForm />}
           {username && <span>
               <IconButton color="inherit" onClick={handleMenu}>
                <AccountCircle />
              </IconButton>
              <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link color="inherit" component={RouterLink} to={`/user/${username}`}>My Pics</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link color="inherit" component={RouterLink} to='/image'>Upload Pic</Link>
              </MenuItem>
            </Menu>
            </span>}
           {username && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </div>
    )
}

const mapStateToProps = state => ({
    username: state.appReducer.username
});

export default connect(mapStateToProps)(UserPanel);