import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from 'contentful';

const client = createClient({
  space: 'kbsymavgdoej',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'yY0q9Bjbqwjxyo7eo_qJAYTiWKDro7QiVLFl9b08Ab4'
});

/* export async function getStaticProps () {
  const res = await fetch('/api/productsDb/')
} */

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [mongoShit, setMongoShit] = useState(null);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!id) {
      return;
    }
    client.getEntry(id).then(data => {
      // console.log(data);
      setProduct(data);
    });
  }, [id])

  useEffect(() => {
    if (!product) {
      return;
    }
    fetch("/api/productsDb/")
      .then((res) => res.json())
      .then((data) => {
        console.log(product.fields.id);
        setMongoShit(data.find(({ id }) => id === product.fields.id));
      });
  }, [product])

  return (
    <div>
      <h1>{product?.fields.name}</h1>
      <p>{product?.fields.description}</p>
      <h3>In stock: {mongoShit?.stock}</h3>
    </div>
  )
}

export default ProductPage;