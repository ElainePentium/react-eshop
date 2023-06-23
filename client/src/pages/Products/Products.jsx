import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        // console.log(json)
        setProducts(json)
      })
      // .then(product => console.log(products[0].title))
  }, []);

  return (
    <div style={{display: "flex", justifyContent: 'center', flexWrap: 'wrap'}}>
      {products.map(product => (
        <ProductCard product={product} key={product.id}/>
      ))}
    </div>
  )
}

export default Products

//  <div>
//    {foodItems.map(foodItem => (
//      <MenuItem foodItem={foodItem} key={foodItem.itemName}/>
//    ))}
// </div>