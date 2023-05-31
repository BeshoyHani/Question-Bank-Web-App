import * as React from 'react';
import './NavBar.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import AccountMenu from './AccountMenu';

export default function NavBar({ userType, setUserType, setIsAuthenticated }) {
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
                        <Link to='/questions/create' className='link-text'>
                            <Button color="inherit" >
                                Create Question
                            </Button>
                        </Link>
                    }
                    {
                        userType !== 'STUDENT' &&
                        <Link to='/questions' className='link-text'>
                            <Button color="inherit">Questions</Button>
                        </Link>
                    }
                    {
                        (userType === 'ADMIN' || userType === 'SUPER_ADMIN') &&
                        <Link to='/users/all' className='link-text'>
                            <Button color="inherit">Users</Button>
                        </Link>

                    }

                    <Link to='/exam' className='link-text'>
                        <Button color="inherit" >
                            exams
                        </Button>
                    </Link>

                    <Link to='/exam/create' className='link-text'>
                        <Button color="inherit" >
                            Create exam
                        </Button>
                    </Link>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                    <AccountMenu />
                </Toolbar>
            </AppBar>
        </div>
    );
}