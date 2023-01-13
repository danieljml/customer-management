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

function BasicModal({ inputValues, modalSave, modalEdit }) {
  const { handleClose, open, updateCustomerInfo, editModal, infoAlert } = useContext(ThemeContext);
  const values = inputValues(), lastValues = values.at(-1);

  useEffect(() => {
    if (!editModal) {
      values.map(item => item.setValue(''))
    }
  }, [open]);

  useEffect(() => {
    if (editModal) {
      console.log(values)
      values.map(item => item.setValue(updateCustomerInfo[item.key]))
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
            {values.map(input => {
              return lastValues.value !== input.value ? (
                <Grid item xs={6} key={input.id}>
                  <TextField id="outlined-name" label={input.label} value={input.value} onChange={input.onChange} type={input.type} />
                </Grid>
              ) : (
                <Grid item xs={12} key={input.id}>
                  <TextField id="outlined-name" label={input.label} value={input.value} onChange={input.onChange} type={input.type} sx={{ width: '100%' }} />
                </Grid>
              );
            })}
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
