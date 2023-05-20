import * as React from 'react';
import './NavBar.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar({userType, setUserType, setIsAuthenticated}) {
    const navigte = useNavigate();

    const logout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setUserType('');
        navigte('/login');
    }
    return (
        <div>
            <AppBar position="static" className='navbar'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {localStorage.getItem('username')}
                    </Typography>
                    {
                        userType === 'TEACHER' &&
                        <React.Fragment>
                            <Link to='/questions/create' className='link-text'>
                                <Button color="inherit" >
                                    Create Question
                                </Button>
                            </Link>
                        </React.Fragment>

                    }
                    {
                        userType !== 'STUDENT' &&
                        <React.Fragment>
                            <Link to='/questions/all' className='link-text'>
                                <Button color="inherit">Questions</Button>
                            </Link>
                        </React.Fragment>
                    }
                    {
                        (userType === 'ADMIN' || userType === 'SUPER_ADMIN') &&
                        <React.Fragment>
                            <Link to='/users/all' className='link-text'>
                                <Button color="inherit">Users</Button>
                            </Link>
                        </React.Fragment>

                    }
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}