import { useContext } from 'react';
import { ThemeContext } from '../context/customerData';
import { addCustomer, updateCustomer } from '../utils/api/customers';
import { BasicModal } from '../components/modal/modal';
import { useField } from '../hooks/useField';
import Title from '../components/title/title';
import CustomizedTable from '../components/table/table';
import CustomeBtn from '../components/button/button';

export const Home = () => {
  let { loadClients, handleClose, setOpen, updateCustomerInfo, setEditModal, setInfoAlert, cleanAlert } = useContext(ThemeContext);
  const name = useField({ type: 'text', defaultValue: '' });
  const lastname = useField({ type: 'text', defaultValue: '' });
  const email = useField({ type: 'email', defaultValue: '' });
  const address = useField({ type: 'text', defaultValue: '' });
  const phone = useField({ type: 'text', defaultValue: '' });

  const columns = [
    { id: 0, title: 'Nombre', key: 'firstname' },
    { id: 1, title: 'Apellido', key: 'lastname' },
    { id: 2, title: 'Email', key: 'email' },
    { id: 3, title: 'Telefono', key: 'phone' },
    { id: 4, title: 'Direccion', key: 'address' },
    { id: 5, title: 'Acciones', key: 'actions' }, // Add this obj if the table need actions
  ];

  const inputValues = () => [
    { ...name, id: 1, label: 'Nombre', key: 'firstname' },
    { ...lastname, id: 2, label: 'Apellido', key: 'lastname' },
    { ...email, id: 3, label: 'Email', key: 'email' },
    { ...phone, id: 4, label: 'Telefono', key: 'phone' },
    { ...address, id: 5, label: 'Direccion', key: 'address' },
  ];

  const addClientModal = () => {
    setOpen(true);
    setEditModal(false);
  };

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
    <>
      <Title title="Gestion de clientes" />
      <CustomeBtn title="Agregar cliente" onClick={() => addClientModal()} />
      <BasicModal inputValues={inputValues} modalSave={saveClient} modalEdit={updateClient} />
      <CustomizedTable columns={columns} />
    </>
  );
};
