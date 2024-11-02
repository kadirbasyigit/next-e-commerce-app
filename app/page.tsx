import Products from './components/product/Products';
import Header from './components/ui/Header';
import SearchProduct from './components/product/SearchProduct';

export default function Home() {
  return (
    <>
      <Header />
      <SearchProduct />
      <Products />
    </>
  );
}
