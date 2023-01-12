import * as React from 'react';
import { Grid } from '@mui/material';
import { CustomeAppBar, CustomeLink, Item, Menu } from './navigationBarStyles';

function customeBar() {
  return (
    <>
      <CustomeAppBar position="static">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Item>
                  <CustomeLink to="/">Inicio</CustomeLink>
                </Item>
              </Grid>
              <Grid item xs={9}>
                <Menu>
                  <CustomeLink to="/productos">Productos</CustomeLink>
                  <CustomeLink to="/nosotros">Nosotros</CustomeLink>
                  <CustomeLink to="/servicios">Servicios</CustomeLink>
                  <CustomeLink to="/contactos">Contactos</CustomeLink>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CustomeAppBar>
    </>
  );
}
export default customeBar;
