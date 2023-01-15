import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/customerData';
import { TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { getProducts } from '../utils/api/products';
import CustomizedTable from '../components/table/table';
import Title from '../components/title/title';

const Products = () => {
  const [tabValue, setTabValue] = useState('smartphones');
  const { setDataTable } = useContext(ThemeContext);

  useEffect(() => {
    products(tabValue);
  }, [tabValue]);

  const columns = [
    { id: 0, title: 'Producto', key: 'title' },
    { id: 1, title: 'Precio ($)', key: 'price' },
    { id: 3, title: 'Marca', key: 'brand' },
    { id: 2, title: 'Clasificacion', key: 'rating' },
    { id: 4, title: 'Imagen', key: 'thumbnail' },
  ];

  const products = async value => {
    const res = await getProducts(value);
    setDataTable(res.products);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabs = [
    { id: 0, label: 'Telefonos', value: 'smartphones' },
    { id: 1, label: 'Laptops', value: 'laptops' },
    { id: 2, label: 'Motocicletas', value: 'motorcycle' },
    { id: 3, label: 'Autos', value: 'automotive' },
  ];

  return (
    <>
      <Title title="Productos" />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 3 }}>
        <TabContext value={tabValue}>
          <Box>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {tabs.map(tab => (
                <Tab key={tab.id} label={tab.label} value={tab.value} />
              ))}
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <CustomizedTable columns={columns} />
    </>
  );
};

export { Products };
