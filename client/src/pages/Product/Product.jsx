import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { addToCart } from '../../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

function Product() {
  const [product, setProduct] = useState({})
  const {id} = useParams()
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(json => {
        setProduct(json)
      });
  }, [id]);

  const handleClick = () => {
    dispatch(addToCart(product))
  }

  return (
    <div>
      <div style={{width: '80vw', margin: 'auto', padding: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <img src={product.image} style={{height: '150px', paddingRight: '20px'}} alt={product.title}/>
        <div>
          <h2>{product.title}</h2>
          <h3>$ {product.price}</h3>
          <p>{product.description}</p>
        </div>
      </div>
      <div style={{margin: 'auto', display: 'flex', justifyContent: 'center'}}>
        <Button tag={Link} to={`/products`} color='info' style={{marginRight: '10px'}}>Back to Products</Button>
        <Button disabled={cart.cart && cart.cart.find((e) => e.id === product.id)} 
                color="info" onClick={handleClick}>Add to Cart</Button>
      </div>
    </div>
  )
}

export default Product
