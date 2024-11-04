import { Product } from '@/app/components/product/Products';

export const generateStaticParams = async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  const products = data.products;

  return products.map((product: Product) => ({
    productId: product.id.toString(),
  }));
};

const ProductId = async ({ params }: { params: { productId: string } }) => {
  const response = await fetch(
    `https://dummyjson.com/products/${params.productId}`
  );
  const product = await response.json();

  return (
    <div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.images[0]} alt={product.title} width={300} />
    </div>
  );
};

export default ProductId;
