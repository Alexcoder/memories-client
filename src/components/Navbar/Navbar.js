import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import * as actionType from '../../constants/actionTypes';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar 
    sx={{
           borderRadius: 15,
           margin: '30px 0',
           display: 'flex',
           flexDirection: 'row',
           justifyContent: 'space-between',
           alignItems: 'center',
           padding: '10px 50px',
           flexDirection:{sm: 'column'},
           }}
    position="static" color="inherit">
      <Link to="/"
       sx={{ display: 'flex', alignItems: 'center',}}>
        <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
        <img
        sx={{
          marginLeft: '10px',
          marginTop: '5px',
        }}
        src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar 
      sx={{
           display: 'flex',
           justifyContent: 'flex-end',
           width: '400px',
           width:{sm: "auto"}
      }}>
        {user?.result ? (
          <div 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '400px',
            alignItems: 'center',
            width:{sm: "auto"},
            marginTop: 20,
            justifyContent: 'center',
          }}>
            <Avatar
            sx={{
                color: "deeppurple",
                backgroundColor: "deeppurple",
            }}
             alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography
            sx={{
                 display: 'flex',
                 alignItems: 'center',
                 textAlign: 'center',
            }}
            variant="h6">{user?.result.name}</Typography>
            <Button
            sx={{
              marginLeft: '20px',
            }}
            variant="contained" color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
