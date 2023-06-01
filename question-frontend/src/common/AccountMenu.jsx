import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import HighlightIcon from '@mui/icons-material/Highlight';
import QuizIcon from '@mui/icons-material/Quiz';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import Roles from './Roles';

export default function AccountMenu({ userType, logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', mx: 3 }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 50, height: 50 }}>B</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link className='link-text' to='/'>
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
        </Link>

        <Divider />

        <Link className='link-text' to='/exam'>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <HelpOutlineIcon fontSize="small" />
            </ListItemIcon>
            Exams
          </MenuItem>
        </Link>

        {
          userType === Roles.TEACHER &&
          <Link className='link-text' to='/exam/create'>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DriveFileRenameOutlineIcon fontSize="small" />
              </ListItemIcon>
              Create Exam
            </MenuItem>
          </Link>
        }

        {
          userType !== Roles.STUDENT &&
          <Link className='link-text' to='/questions'>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <HighlightIcon fontSize="small" />
              </ListItemIcon>
              Questions
            </MenuItem>
          </Link>
        }
        {
          userType === Roles.TEACHER &&
          <Link className='link-text' to='/questions/create'>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <QuizIcon fontSize="small" />
              </ListItemIcon>
              Create Question
            </MenuItem>
          </Link>
        }

        <Link className='link-text' onClick={() => logout()}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Link>

      </Menu>
    </React.Fragment>
  );
}
