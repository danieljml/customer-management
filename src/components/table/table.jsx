/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from './tableStyles';
import CustomeBtn from '../button/button';
import { deleteCustomer } from '../../utils/api/customers';
import { ThemeContext } from '../../context/customerData';

export default function CustomizedTable({ columns, actions }) {
  const { dataCustomer, loadClients, updateClient, cleanAlert, setInfoAlert } = useContext(ThemeContext);
  useEffect(() => {
    loadClients();
  }, []);

  const deleteClient = async id => {
    const res = await deleteCustomer(id);

    if (res.status === 200) {
      setInfoAlert({
        open: true,
        type: 'success',
        title: 'Exitoso',
        content: 'Eliminacion exitosa',
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map(row => (
              <StyledTableCell key={row.id} align="left">
                {row.title}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!dataCustomer ? (
            <TableRow>
              <StyledTableCell component="th" scope="row">
                Sin resultado
              </StyledTableCell>
            </TableRow>
          ) : (
            dataCustomer.map((row, i)=> (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row[columns[0].key]}
                </StyledTableCell>
                <StyledTableCell align="left">{row[columns[1].key]}</StyledTableCell>
                <StyledTableCell align="left">{row[columns[2].key]}</StyledTableCell>
                <StyledTableCell align="left">{row[columns[3].key]}</StyledTableCell>
                <StyledTableCell align="left">{row[columns[4].key]}</StyledTableCell>
                {actions ? (
                  <StyledTableCell align="left">
                    <CustomeBtn title="Modificar" onClick={() => updateClient(row.id)} />
                    <CustomeBtn title="Eliminar" onClick={() => deleteClient(row.id)} />
                  </StyledTableCell>
                ) : (
                  ''
                )}
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
