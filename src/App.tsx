import * as React from 'react';
import { hot } from 'react-hot-loader';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// import bouldering from "./images/Bouldering-Start-Image.jpg";

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
}));

type AppProps = {
  heightFt: number,
  heightIn: number,
  weight: number,
  armspan: number
}

const App = ({heightFt, heightIn, weight, armspan}:AppProps) => {
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOnChange = (event: { target: { value: any; }; }, label: string) => {
      // console.log(event.target.value);
      // console.log(label);

      if(label == "hf"){
        heightFt = event.target.value;
      }
      else if(label == "hi"){
        heightIn = event.target.value;
      }
      else if(label == "w"){
        weight = event.target.value;
      }
      else if(label == "a"){
        armspan = event.target.value;
      }

      // console.log("hf:" + heightFt + " hi:" + heightIn + " w:" + weight + " a:" + armspan);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      //send data somewhere and close nav?
      handleDrawerClose();
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
            {/* <img width="75%" src={bouldering} alt="Indoor Bouldering" /> */}
            <p>IMAGE WILL BE HERE</p>
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
          <TextField style={{margin:"10px"}} id="outlined-basic" label="Height (ft)" variant="outlined" type="number" onChange={(e)=>{handleOnChange(e, "hf")}}/>
          <TextField style={{margin:"10px"}} id="outlined-basic" label="Height (in)" variant="outlined" type="number" onChange={(e)=>{handleOnChange(e, "hi")}}/>
          <TextField style={{margin:"10px"}} id="outlined-basic" label="Weight (lbs)" variant="outlined" type="number" onChange={(e)=>{handleOnChange(e, "w")}}/>
          <TextField style={{margin:"10px"}} id="outlined-basic" label="Armspan (ft)" variant="outlined" type="number" onChange={(e)=>{handleOnChange(e, "a")}}/>
          <Divider />
          <Typography style={{margin:"10px"}}>2. Upload the route image</Typography>
          <TextField style={{margin:"10px"}} id="outlined-basic" label="File Upload" variant="outlined" />
          <Divider />
          <Typography style={{margin:"10px"}}>3. Pick the route color and click Submit</Typography>
          <TextField style={{margin:"10px"}} id="outlined-basic" label="Route Color" variant="outlined" />
          <Button style={{margin:"10px"}} variant="contained" color="secondary" onClick={(e)=>{handleSubmit(e)}}> Submit </Button> 
        </Drawer>
      </div>
    </div>
    )};

export default hot(module)(App);