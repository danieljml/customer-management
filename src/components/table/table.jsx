/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/customerData';
import {Table, TableBody, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { StyledTableCell, StyledTableRow } from './tableStyles';
import CustomeBtn from '../button/button';

export default function CustomizedTable({ columns }) {
  const { dataCustomer, loadClients, updateClient, deleteClient} = useContext(ThemeContext);
  useEffect(() => {
    loadClients();
  }, []);

  const withoutResults = (
    <TableRow>
      <StyledTableCell component="th" scope="row">
        Sin resultado
      </StyledTableCell>
    </TableRow>
  );

  const tableRows = !dataCustomer
    ? withoutResults
    : dataCustomer.map(row => (
        <StyledTableRow key={row.id.toString()}>
          {columns.map((cell, j) => {
            return cell.key === 'actions' ? (
              <StyledTableCell align="left" key={cell.id.toString()}>
                <CustomeBtn title="Modificar" onClick={() => updateClient(row.id)} />
                <CustomeBtn title="Eliminar" onClick={() => deleteClient(row.id)} />
              </StyledTableCell>
            ) : (
              <StyledTableCell align="left" key={cell.id.toString()}>
                {row[columns[j].key]}
              </StyledTableCell>
            );
          })}
        </StyledTableRow>
      ));

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
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
