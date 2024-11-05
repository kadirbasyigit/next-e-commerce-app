import { Button, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from '@/app/utils/Link';

const SuccessPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 50, color: 'green' }} />
      <Typography variant="h5" sx={{ marginY: 2 }}>
        Your order has been received. Thank you.
      </Typography>
      <Link href={'/orders'}>
        <Button variant="contained" sx={{ marginY: 1 }}>
          My Orders
        </Button>
      </Link>
      <Link href={'/'}>
        <Button variant="outlined">Return to Home</Button>
      </Link>
    </Box>
  );
};

export default SuccessPage;
