import { Button, Box, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from '@/app/utils/Link';

const CancelPage = () => {
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
      <CancelIcon sx={{ fontSize: 50, color: 'red' }} />
      <Typography variant="h5" sx={{ marginY: 2 }}>
        Your order has been canceled.
      </Typography>
      <Link href={'/orders'}>
        <Button variant="contained" sx={{ marginY: 1 }}>
          My orders
        </Button>
      </Link>
      <Link href={'/'}>
        <Button variant="outlined">Return to Home</Button>
      </Link>
    </Box>
  );
};

export default CancelPage;
