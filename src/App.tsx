import * as React from 'react';
import { hot } from 'react-hot-loader';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextField from '@material-ui/core/TextField';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import bouldering from "./images/Bouldering-Start-Image.jpg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const App = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        console.log(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        console.log(false);
    };

    return(
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              Welcome to the Auto Rock Climber (ARC)!
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main
          className={clsx(classes.content, {
          [classes.contentShift]: open,
        })} 
        >
          <div className={classes.drawerHeader} />
          <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <img src={bouldering} alt="Indoor Bouldering" />
          </div>
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
            <Typography>ARC :)</Typography>
          </div>
          <Divider />
          <Typography style={{margin:"10px"}}>1. Enter your dimensions</Typography>
          <TextField style={{margin:"10px"}} id="outlined-basic" label="Height" variant="outlined" />
          <TextField style={{margin:"10px"}} id="outlined-basic" label="Weight" variant="outlined" />
          <TextField style={{margin:"10px"}} id="outlined-basic" label="Armspan" variant="outlined" />
          <Divider />
          <Typography style={{margin:"10px"}}>2. Upload the route image</Typography>
          <TextField style={{margin:"10px"}} id="outlined-basic" label="File Upload" variant="outlined" />
          <Divider />
          <Typography style={{margin:"10px"}}>3. Pick the route color and click Submit</Typography>
          <TextField style={{margin:"10px"}} id="outlined-basic" label="Route Color" variant="outlined" />
          <Button style={{margin:"10px"}} variant="contained" color="secondary"> Submit </Button>
        </Drawer>
      </div>
    </div>
    )};

export default hot(module)(App);