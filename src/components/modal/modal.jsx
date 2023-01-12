/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import { Typography, TextField, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useField } from '../../hooks/useField';
import CustomeBtn from '../button/button';
import { addCustomer, updateCustomer } from '../../utils/api/customers';
import { ThemeContext } from '../../context/customerData';
import { BasicAlerts } from '../alert/alert';

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

function BasicModal() {
  let { loadClients, handleClose, open, updateCustomerInfo, editModal, infoAlert, setInfoAlert, cleanAlert } = useContext(ThemeContext);
  const name = useField({ type: 'text' });
  const lastname = useField({ type: 'text' });
  const email = useField({ type: 'email' });
  const address = useField({ type: 'text' });
  const phone = useField({ type: 'text' });
  console.log(infoAlert)

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

  const saveClient = async () => {
    const body = {
      firstname: name.value,
      lastname: lastname.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
    };
    const res = await addCustomer(body);
    handleClose();

    if (res.status === 200) {
      setInfoAlert({
        open: true,
        type: 'success',
        title: 'Exitoso',
        content: 'Guardado exitoso',
      });
      loadClients();
      cleanAlert();
    } else {
      setInfoAlert({
        open: true,
        type: 'error',
        title: 'Error',
        content: 'Hubo un error',
      });
      cleanAlert();
    }
  };

  const updateClient = async () => {
    const body = {
      firstname: name.value,
      lastname: lastname.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      id: updateCustomerInfo.id,
    };
    const res = await updateCustomer(body);
    handleClose();

    if (res.status === 200) {
      setInfoAlert({
        open: true,
        type: 'success',
        title: 'Exitoso',
        content: 'Modificacion exitosa',
      });
      loadClients();
      cleanAlert();
    } else {
      setInfoAlert({
        open: true,
        type: 'error',
        title: 'Error',
        content: 'Hubo un error',
      });
      cleanAlert();
    }
  };

  return (
    <div>
      {infoAlert.open ? <BasicAlerts infoAlert={infoAlert}/> : ''}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography sx={{ m: 2, textAlign: 'center', color: 'black' }} id="modal-modal-title" variant="h6" component="h2">
            {editModal ? 'Modificar cliente' : 'Agregar cliente'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField id="outlined-name" label="Nombre" {...name} />
            </Grid>
            <Grid item xs={6}>
              <TextField id="outlined-name" label="Apellido" {...lastname} />
            </Grid>
            <Grid item xs={6}>
              <TextField id="outlined-name" label="Email" {...email} />
            </Grid>
            <Grid item xs={6}>
              <TextField id="outlined-name" label="Telefono" {...phone} />
            </Grid>
            <Grid item xs={12}>
              <TextField id="outlined-name" label="Direccion" {...address} sx={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              {editModal ? <CustomeBtn title="Modificar" onClick={() => updateClient()} /> : <CustomeBtn title="Guardar" onClick={() => saveClient()} />}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export { BasicModal };
