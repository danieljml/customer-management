import React, { useState } from 'react';
import { findCustomer, getCustomers, deleteCustomer } from '../utils/api/customers';

export const ThemeContext = React.createContext();

const ContextCustomerData = props => {
  const [dataTable, setDataTable] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateCustomerInfo, setUpdateCustomerInfo] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [infoAlert, setInfoAlert] = useState({ open: false, content: 'This is the content', type: 'error', title: 'this a title' });

  const loadClients = async () => {
    const response = await getCustomers();
    setDataTable(response);
  };

  const handleClose = () => {
    setOpen(false);
    setEditModal(false);
  };

  const updateClient = async id => {
    const res = await findCustomer(id);
    setUpdateCustomerInfo(res);
    setOpen(true);
    setEditModal(true);
  };

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

  const cleanAlert = () => {
    return setTimeout(() => {
      setInfoAlert({
        open: false,
      });
    }, 3000);
  };

  return (
    <ThemeContext.Provider
      value={{
        dataTable,
        setDataTable,
        loadClients,
        handleClose,
        open,
        setOpen,
        updateClient,
        deleteClient,
        updateCustomerInfo,
        editModal,
        setEditModal,
        infoAlert,
        setInfoAlert,
        cleanAlert,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ContextCustomerData;
