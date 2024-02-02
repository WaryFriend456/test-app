import React, { useContext } from 'react'; // Add useContext here
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, makeStyles, Switch, createTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { DarkModeContext } from './DarkmodeContext'

const useStyles = makeStyles((theme) => ({
    menuPaper: {
        backgroundColor: '#1F2937', // Tailwind CSS 'coolGray.800'
        color: '#F3F4F6', // Tailwind CSS 'coolGray.100'
        borderRadius: '0.375rem', // Tailwind CSS 'rounded-md'
    },
}));

// Create a theme instance.
const lightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#3f51b5', // Change this to your light mode color
        },
    },
});

const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#303030', // Change this to your dark mode color
        },
    },
});

export default function NavBar() {
    const classes = useStyles();
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
    console.log('Rendering NavBar with isDarkMode =', isDarkMode);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <AppBar position="sticky">
                <Toolbar className="flex justify-between">
                    <Typography variant="h6">
                        <Link to="/" className="text-white font-bold text-2xl">
                            VocalWheels
                        </Link>
                    </Typography>
                    <div>
                        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                        <Switch checked={isDarkMode} onChange={toggleDarkMode} />
                        </ThemeProvider>                        
                        <Button color="inherit" onClick={handleClick}>
                            CommandCenter
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            classes={{ paper: classes.menuPaper }} // Apply the custom style here
                        >
                            <MenuItem onClick={handleClose}>
                                <Link to="/voicecommand" className="text-white px-2 py-1 font-medium">Voice Command</Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link to="/textcommand" className="text-white px-2 py-1 font-medium">Text Command</Link>
                            </MenuItem>
                        </Menu>
                        <Button color="inherit">
                            <Link to="/demo" className="text-white px-2 py-1 font-medium">Demo</Link>
                        </Button>
                        <Button color="inherit">
                            <Link to="/log" className="text-white px-2 py-1 font-medium">Log</Link>
                        </Button>
                        <Button color="inherit">
                            <Link to="/about" className="text-white px-2 py-1 font-medium">About</Link>
                        </Button>
                        <Button color="inherit">
                            <Link to="/videofeed" className="text-white px-2 py-1 font-medium">VideoFeed</Link>
                        </Button>
                        <Button color="inherit">
                            <Link to="/status" className="text-white px-2 py-1 font-medium">Status</Link>
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}