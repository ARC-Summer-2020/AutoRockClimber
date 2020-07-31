import * as React from 'react';
import { hot } from 'react-hot-loader';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';

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
          {/* <Button variant="contained" color="primary">
            Hello World
          </Button>

          <p style={{textAlign:"center"}}>BottomNavigation from MaterialUI</p>
          <BottomNavigation>
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation> */}
          {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
          <br/><br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed tempor and vitality, so that the 
          labor and sorrow, some important things to do eiusmod. Textile consumer has no element is present 
          lion or antioxidants. Smile at my basketball season hairstyle. Makeup, one should not always laughter 
          in the hendrerit gravida elit. Convallis convallis tellus id interdum velit laoreet that, until the 
          leakage. One customer convenience, but hate hate jasmine customer. Ultricies whole lot of players who 
          receive undergraduate drink. Performance running any cartoon nibh tomorrow. Fears Vulputate football 
          warm chocolate recipes financing microwave refrigerator. Mauris any financing mass developers. Tomorrow 
          developers carton eu live at propaganda. But propaganda need arc was varied homework at the main lorem. 
          But ullamcorper outdoor soccer developers. Lorem sapien mass until the throat and television.
          </Typography>
          <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
          <br/><br/>
          Planning mauris now lives only once. Nulla pede ullamcorper need to soccer diameter. The cushion
          element of the embedded dictum sagittis ac tincidunt. But unless the pool deck suspended, but the 
          Product. Chili carrots weekend photography start. But the element Eu hate the disease. Performance 
          skirt smile vulputate at any hardware. Website link football cartoon chili mass consumer or law 
          enforcement need. In the makeup, Whosoever shall not nibh sed ac hendrerit gravida ac. Nor for any 
          sem et tortor Pellentesque. They inhabit the sad old age and disease. Importantly developer homework 
          is sad more items. Default jasmine Performance element only one deductible. Please pull Maecenas layer 
          tanks or antioxidants. There is no set clinical care of some avenging arrows.
          </Typography> */}
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
          {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          </List> */}
          {/* <Divider />
          <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          </List> */}
        </Drawer>
      </div>
    </div>
    )};

export default hot(module)(App);