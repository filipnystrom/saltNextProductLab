import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from 'contentful';

const client = createClient({
  space: 'kbsymavgdoej',
  environment: 'master',
  accessToken: 'yY0q9Bjbqwjxyo7eo_qJAYTiWKDro7QiVLFl9b08Ab4'
});

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [mongoDb, setMongoDb] = useState(null);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!id) {
      return;
    }
    client.getEntry(id).then(data => {
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
        setMongoDb(data.find(({ id }) => id === product.fields.id));
      });
  }, [product])

  return (
    <section className="productPage">

      <h1 className="header">{product?.fields.name}</h1>

      <div className="product productCard">
        <p>{product?.fields.description}</p>
        <h3>In stock: {mongoDb?.stock}</h3>

        <a href="http://localhost:3000/products/">
          <button>Go back</button>
        </a>

      </div>
    </section>
  )
}

export default ProductPage;