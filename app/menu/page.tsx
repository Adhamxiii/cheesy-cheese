import MenuPage from "@/components/menu/MenuPage";

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/categories', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const getProducts = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};


const Page = async() => {
  const categories = await getData();
  const products = await getProducts();
  return <MenuPage categories={categories} products={products} />;
};

export default Page;
