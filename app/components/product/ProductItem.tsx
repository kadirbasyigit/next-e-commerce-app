import { Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { Product } from './Products';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Paper
      elevation={4}
      sx={{
        textAlign: 'center',
        width: '252px',
        height: '378px',
      }}
    >
      <Image
        src={product.images[0]}
        alt={product.title}
        width={200}
        height={200}
        style={{ objectFit: 'cover' }}
      />
      <Typography variant="h6">{product.title}</Typography>
      <Typography variant="body1">${product.price}</Typography>
    </Paper>
  );
};

export default ProductItem;
