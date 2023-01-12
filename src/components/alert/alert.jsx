import * as React from 'react';
import { Alert, AlertTitle } from '@mui/material';

function BasicAlerts({infoAlert}) {
  const { title, type, content} = infoAlert
  const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-60%, -60%)',
    width: '220px',
    boxShadow: 24,
    p: 4,
    borderRadius: '9px',
    padding: '10px'
  };
  return (
    <>
        <Alert variant="filled" severity={type} sx={style}>
          <AlertTitle>{title}</AlertTitle>
          {content}
        </Alert>
    </>
  );
}

export { BasicAlerts };
