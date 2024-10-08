import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AppleIcon from '@mui/icons-material/Apple';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import { NavLink } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InventoryIcon from '@mui/icons-material/Inventory';
import DiscountIcon from '@mui/icons-material/Discount';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AirIcon from '@mui/icons-material/Air';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const adminlink = [
  {
    title: 'Fruits',
    to: '/admin/Fruits',
    icon: <AppleIcon />
  },
  {
    title: 'coupon',
    to: '/admin/coupon',
    icon: <DiscountIcon />
  },
  {
    title: 'Category',
    to: '/admin/category',
    icon: <CategoryIcon />
  },
  {
    title: 'SubCategory',
    to: '/admin/subcategory',
    icon: <BookmarkAddIcon />
  },
  {
    title: 'Facilities',
    to: '/admin/facilities',
    icon: <EmojiEmotionsIcon />
  },
  {
    title: 'Product',
    to: '/admin/product',
    icon: <InventoryIcon />
  },
  {
    title: 'counter',
    to: '/admin/counter',
    icon: <AddCircleIcon />
  },
  {
    title: 'Favorite',
    to: '/admin/favorite',
    icon: <BookmarkAddIcon />
  },
  {
    title: 'productdata',
    to: '/admin/productdata',
    icon: <AlignHorizontalRightIcon />
  },
  {
    title: 'Contact',
    to: '/admin/contact',
    icon: <ContactEmergencyIcon />
  },

  {
    title: 'Variant',
    to: '/admin/variant',
    icon: <AirIcon />
  },
  {
    title: 'Salespeople',
    to: '/admin/salespeople',
    icon: <PeopleIcon />
  },
]

export default function Layout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Fruitable Admin side
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {adminlink.map((value, index) => (
            <ListItem key={index} disablePadding component={NavLink} to={value.to} sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {value.icon}
                </ListItemIcon>
                <ListItemText primary={value.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
