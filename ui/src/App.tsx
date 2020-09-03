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

    //Image Vars
    const [uploadedImage, setUploadedImage] = React.useState("");
    const [uploadedImagePath, setUploadedImagePath] = React.useState("");

    const [open, setOpen] = React.useState(true);

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
    };

    //Drawer Close
    const handleDrawerClose = () => {
        setOpen(false);
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
          setUploadedImage(_img);
          setUploadedImagePath(data.filePaths[0]);
        })
    }

    //Updating number text fields
    const handleOnChange = (event: { target: { value: any; }; }, label: string) => {

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

    };

    //Submit Button Functionality
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

      if(heightFt > 0 && heightIn > 0 && weight > 0 && armspan > 0 && color != "" && uploadedImagePath != ""){
        handleDrawerClose();

        // Push data to server
        // Convert image string to blob
        // from https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
        const byteCharacters = atob(uploadedImage);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blobImage = new Blob(byteArrays, {type: 'image'});

        // Building FormData for request
        var formdata = new FormData();
        formdata.append("image", blobImage, uploadedImagePath);
        formdata.append("color", "blue");

        // Building Request
        var requestOptions = {
          method: 'POST',
          body: formdata,
          mode: 'no-cors'
        };

        //Send request to server
        fetch("http://localhost:8002/rockLibrary/imageupload", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
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
          <TextField style={{margin:"10px"}} label="Height (ft)" variant="outlined" type="number" onChange={(e)=>{handleOnChange(e, "hf")}}/>
          <TextField style={{margin:"10px"}} label="Height (in)" variant="outlined" type="number" onChange={(e)=>{handleOnChange(e, "hi")}}/>
          <TextField style={{margin:"10px"}} label="Weight (lbs)" variant="outlined" type="number" onChange={(e)=>{handleOnChange(e, "w")}}/>
          <TextField style={{margin:"10px"}} label="Armspan (ft)" variant="outlined" type="number" onChange={(e)=>{handleOnChange(e, "a")}}/>
          <Divider />
          <Typography style={{margin:"10px"}}>2. Upload the route image</Typography>
          <Typography style={{margin:"10px", wordWrap: "break-word", maxWidth: "200px"}}>Current: {uploadedImagePath}</Typography>
          <Button style={{margin:"10px"}} variant="contained" color="secondary" 
          onClick={() => {handleOpenImage()}}>
            Upload File 
            <input type="file" style={{ display: "none" }}/>
          </Button>
          <Divider />
          <Typography style={{margin:"10px"}}>3. Pick the route color and click Submit</Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="route-color-label">Route Color</InputLabel>
            <Select
              labelId="route-color-label"
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