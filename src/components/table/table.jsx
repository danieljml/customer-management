/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/customerData';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './tableStyles';
import CustomeBtn from '../button/button';

export default function CustomizedTable({ columns, data }) {
  const { dataTable, setDataTable, loadClients, updateClient, deleteClient } = useContext(ThemeContext);
  useEffect(() => {
    setDataTable(data);
    loadClients();
  }, []);

  const withoutResults = (
    <TableRow>
      <StyledTableCell component="th" scope="row">
        Sin resultado
      </StyledTableCell>
    </TableRow>
  );

  const tableRows = !dataTable
    ? withoutResults
    : dataTable.map(row => (
        <StyledTableRow key={row.id.toString()}>
          {columns.map((cell, j) => {
            if (cell.key === 'actions')
              return (
                <StyledTableCell align="left" key={cell.id.toString()}>
                  <CustomeBtn title="Modificar" onClick={() => updateClient(row.id)} />
                  <CustomeBtn title="Eliminar" onClick={() => deleteClient(row.id)} />
                </StyledTableCell>
              );
            if (cell.key === 'thumbnail') {
              return (
                <StyledTableCell align="center" key={cell.id.toString()}>
                  <img src={row.thumbnail} alt={row[columns[j].title]} style={{width: '110px', height: '80px',}} />
                </StyledTableCell>
              );
            }
            return (
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
            {columns.map(column => {
              return column.key === 'thumbnail' ? (
                <StyledTableCell key={column.id} align="center">
                  {column.title}
                </StyledTableCell>
              ) : (
                <StyledTableCell key={column.id} align="left">
                  {column.title}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
