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

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabs = [
    {
      id: 0,
      label: 'Motocicletas',
      value: 'motorcycle',
      images: ['https://acortar.link/8f0gvy', 'https://acortar.link/fuOdMt', 'https://acortar.link/ltENh5', 'https://acortar.link/re7sOH'],
    },
    {
      id: 1,
      label: 'Laptops',
      value: 'laptops',
      images: [
        'https://acortar.link/qedQ3z',
        'https://acortar.link/zobSMK',
        'https://acortar.link/XPfE5B',
        'https://acortar.link/KHMCCf',
        'https://acortar.link/Yc2sWk',
      ],
    },
    {
      id: 2,
      label: 'Telefonos',
      value: 'smartphones',
      images: [],
    },
    {
      id: 3,
      label: 'Autos',
      value: 'automotive',
      images: [],
    },
  ];

  const products = async value => {
    const res = await getProducts(value);
    const data = res.products.map((item, i) => ({ ...item, thumbnail: tabs.find(item => item.value === value).images[i] ?? item.thumbnail }));
    setDataTable(data);
  };

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
