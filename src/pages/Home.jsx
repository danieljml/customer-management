import { useContext, useState } from 'react';
import CustomeBtn from '../components/button/button';
import { BasicModal } from '../components/modal/modal';
import CustomizedTable from '../components/table/table';
import Title from '../components/title/title';
import { ThemeContext } from '../context/customerData';

export const Home = () => {
  const { setOpen, setEditModal } = useContext(ThemeContext);

  const columns = [
    { id: 1, title: 'Nombre', key: 'firstname' },
    { id: 2, title: 'Apellido', key: 'lastname' },
    { id: 3, title: 'Email', key: 'email' },
    { id: 4, title: 'Telefono', key: 'phone' },
    { id: 5, title: 'Direccion', key: 'address' },
    { id: 6, title: 'Acciones' },
  ];

  const addClientModal = () => {
    setOpen(true);
    setEditModal(false);
  };

  return (
    <>
      <Title title="Gestion de clientes" />
      <CustomeBtn title="Agregar cliente" onClick={() => addClientModal()} />
      <BasicModal />
      <CustomizedTable columns={columns} actions={true}/>
    </>
  );
};
