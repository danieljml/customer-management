import {AppBar, Link, styled} from '@mui/material';
import { NavLink } from "react-router-dom";

const CustomeAppBar = styled(AppBar)(()=> ({
    borderRadius: 5,
    background: 'black'
  }))
const CustomeLink = styled(NavLink)(() => ({
    color: 'white',
    listStyle: 'none',
    textDecoration: 'none',
    cursor: 'pointer'
  }));
const Item = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'start',
    color: '#ffff',
    height: '100%',
    padding: '0 20px'
  }));
const Menu = styled('ul')(() => ({
    display: 'flex',
    justifyContent: 'space-evenly'
  }));

export {CustomeAppBar, CustomeLink, Item, Menu}