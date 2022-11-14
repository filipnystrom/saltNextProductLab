import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from 'contentful';

const client = createClient({
  space: 'kbsymavgdoej',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'yY0q9Bjbqwjxyo7eo_qJAYTiWKDro7QiVLFl9b08Ab4'
});

function ProductPage(req, res) {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const id = router.query.id;
  const name = router.query.name;
  const description = router.query.description;
  // console.log(id);

    // useEffect(() => {
    //   console.log(id);
    //   client.getEntry(id).then((res) => console.log(res));
    // }, []);
  
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  )
}

export default ProductPage;