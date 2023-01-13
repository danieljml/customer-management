/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { Box, Typography, TextField, Grid } from '@mui/material';
import { ThemeContext } from '../../context/customerData';
import { BasicAlerts } from '../alert/alert';
import Modal from '@mui/material/Modal';
import CustomeBtn from '../button/button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

function BasicModal({initialValues, modalSave, modalEdit}) {
  let { handleClose, open, updateCustomerInfo, editModal, infoAlert } = useContext(ThemeContext);
  let { name, lastname, email, phone, address } = initialValues();

  useEffect(() => {
    if (!editModal) {
      name.setValue('');
      lastname.setValue('');
      email.setValue('');
      address.setValue('');
      phone.setValue('');
    }
  }, [open]);

  useEffect(() => {
    if (editModal) {
      name.setValue(updateCustomerInfo.firstname);
      lastname.setValue(updateCustomerInfo.lastname);
      email.setValue(updateCustomerInfo.email);
      address.setValue(updateCustomerInfo.address);
      phone.setValue(updateCustomerInfo.phone);
    }
  }, [updateCustomerInfo]);

  return (
    <div>
      {infoAlert.open ? <BasicAlerts infoAlert={infoAlert} /> : ''}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography sx={{ m: 2, textAlign: 'center', color: 'black' }} id="modal-modal-title" variant="h6" component="h2">
            {editModal ? 'Modificar cliente' : 'Agregar cliente'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField id="outlined-name" label="Nombre" value={name.value} onChange={name.onChange} type={"text"} />
            </Grid>
            <Grid item xs={6}>
              <TextField id="outlined-name" label="Apellido" value={lastname.value} onChange={lastname.onChange} type={"text"} />
            </Grid>
            <Grid item xs={6}>
              <TextField id="outlined-name" label="Email" value={email.value} onChange={email.onChange} type={"email"} />
            </Grid>
            <Grid item xs={6}>
              <TextField id="outlined-name" label="Telefono" value={phone.value} onChange={phone.onChange} type={"text"}  />
            </Grid>
            <Grid item xs={12}>
              <TextField id="outlined-name" label="Direccion" value={address.value} onChange={address.onChange} type={"text"} sx={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              {editModal ? <CustomeBtn title="Modificar" onClick={() => modalEdit()} /> : <CustomeBtn title="Guardar" onClick={() => modalSave()} />}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export { BasicModal };
