import { Button } from '@mui/material';

const CustomeBtn = ({title, onClick}) => {
  return (
    <Button
    sx={{
      my: 2,
      mr: 2,
      border: '1px solid black',
      oxShadow: '9px 16px 34px -13px rgba(0,0,0,0.58)',
    }}
    variant="contained"
    onClick={onClick}
  >
    {title}
  </Button>
  )
}

export default CustomeBtn
