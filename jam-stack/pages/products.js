import { createClient } from 'contentful';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const client = createClient({
    space: 'kbsymavgdoej',
    environment: 'master', // defaults to 'master' if not set
    accessToken: 'yY0q9Bjbqwjxyo7eo_qJAYTiWKDro7QiVLFl9b08Ab4'
});

const Products = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        client.getEntries()
        .then((response) => setProducts(response))
        .catch(console.error)
    }, []);

    console.log(products);
    
    return (
        <div className='products'>
            {products?.items.map(product => 
                <div className='product' key={product.fields.id}>
                    <Link href={{pathname: `/products/[id]`, query: { id: product.fields.id, name: product.fields.name, description: product.fields.description }}}>
                      <h1>{product.fields.name}</h1>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Products;