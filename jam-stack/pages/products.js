import { createClient } from 'contentful';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const client = createClient({
    space: 'kbsymavgdoej',
    environment: 'master',
    accessToken: 'yY0q9Bjbqwjxyo7eo_qJAYTiWKDro7QiVLFl9b08Ab4'
});

const Products = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        client.getEntries()
        .then((response) => setProducts(response))
        .catch(console.error)
    }, []);
    
    return (
        <div className='products'>

          <h1 className="header">FANKY SHOPPING</h1>

          <section className="gallery">

            {products?.items.map(product => 
                <div className='product' key={product.fields.id}>
                    <Link href={{pathname: `/products/[id]`, query: { id: product.sys.id }}}>
                      <h1>{product.fields.name}</h1>
                    </Link>
                </div>
            )}
            
          </section>
        </div>
    )
}

export default Products;