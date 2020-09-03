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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { remote } from 'electron';
const fs = remote.require('fs');
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import bouldering from './images/Bouldering-Start-Image.jpg';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

const App = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    //Number Input Fields
    const [heightFt, setHeightFt] = React.useState(0);
    const [heightIn, setHeightIn] = React.useState(0);
    const [weight, setWeight] = React.useState(0);
    const [armspan, setArmspan] = React.useState(0);

    //Color
    const [color, setColor] = React.useState('');

    //Drawer Open
    const handleDrawerOpen = () => {
        setOpen(true);
        // console.log(true);
    };

    //Drawer Close
    const handleDrawerClose = () => {
        setOpen(false);
        // console.log(false);
    };

    //Opening an Image
    const handleOpenImage = () => {
      
      remote.dialog.showOpenDialog(
        { properties: [ 'openFile'], filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]}
        )
        .then(data=>{
          var _img = fs.readFileSync(data.filePaths[0]).toString('base64');
          var _out = '<img src="data:image/png;base64,' + _img + '" />';
          document.getElementById('imagePlaceholder').innerHTML = "";
          var _target = document.getElementById('imagePlaceholder');
          _target.insertAdjacentHTML('beforeend', _out);
          document.getElementById('imageBouldering').hidden = true;
        })
    }

    //Updating number text fields
    const handleOnChange = (event: { target: { value: any; }; }, label: string) => {
      // console.log(event.target.value);
      // console.log(label);

      if(label == "hf"){
        setHeightFt(event.target.value);
      }
      else if(label == "hi"){
        setHeightIn(event.target.value);
      }
      else if(label == "w"){
        setWeight(event.target.value);
      }
      else if(label == "a"){
        setArmspan(event.target.value);
      }

      // console.log("hf:" + heightFt + " hi:" + heightIn + " w:" + weight + " a:" + armspan);
    };

    //Submit Button Functionality
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      //TODO: send data somewhere and close nav?
      //TODO: add image check here
      if(heightFt > 0 && heightIn > 0 && weight > 0 && armspan > 0 && color != ""){
        handleDrawerClose();
      }
      else{
        alert("You must fill all fields correctly before submitting. All number values must be > 0.");
      }

    };

    //Handling Dropdown Functionality
    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown; }>) => {
      var valueString = String(event.target.value);
      setColor(valueString);
    };

    return(
    <div>
      <div className={classes.root} style={{width: '130%'}}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
          })}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              Welcome to the Auto Rock Climber (ARC)!
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main
          className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
          <div className={classes.drawerHeader} />
          <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <img width="130%" id="imageBouldering" src={bouldering} alt="Indoor Bouldering" />
            <div id='imagePlaceholder'></div>
          </div>
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}>
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
          <Button style={{margin:"10px"}} variant="contained" color="secondary" 
          onClick={() => {handleOpenImage()}}>
            Upload File 
            <input type="file" style={{ display: "none" }}/>
          </Button>
          <Divider />
          <Typography style={{margin:"10px"}}>3. Pick the route color and click Submit</Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Route Color</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={color}
              onChange={(e)=>{handleChange(e)}}
              label="Route Color"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"blue"}>Blue</MenuItem>
              <MenuItem value={"green"}>Green</MenuItem>
              <MenuItem value={"black"}>Black</MenuItem>
              <MenuItem value={"red"}>Red</MenuItem>
              <MenuItem value={"pink"}>Pink</MenuItem>
              <MenuItem value={"purple"}>Purple</MenuItem>
              <MenuItem value={"white"}>White</MenuItem>
              <MenuItem value={"orange"}>Orange</MenuItem>
              <MenuItem value={"yellow"}>Yellow</MenuItem>
              <MenuItem value={"brown"}>Brown</MenuItem>
              <MenuItem value={"grey"}>Grey</MenuItem>
            </Select>
          </FormControl>

          <Button style={{margin:"10px"}} variant="contained" color="secondary" onClick={(e)=>{handleSubmit(e)}}> Submit </Button> 
        </Drawer>
      </div>
    </div>
    )};

export default hot(module)(App);