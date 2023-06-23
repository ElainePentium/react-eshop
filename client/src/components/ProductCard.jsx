// import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
} from 'reactstrap';
import { addToCart } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import store from '../app/store';

function ProductCard({product}) {
    const dispatch = useDispatch();
    // const [clickable, setClickable] = useState(false)
    const cart = useSelector((state) => state.cart)

    const handleClick = () => {
        // setClickable(!clickable)
        dispatch(addToCart(product))
    }

    // useEffect(() => {
    // }, [])
    
    return (
        // <div>ProductCard {product.title}</div>
        <Card style={{width: '18rem'}}>
            <img alt={product.title} src={product.image} style={{height: '150px', maxWidth: '100%', margin: 'auto'}}/>
            <CardBody>
                <CardTitle tag="h5">{product.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">$ {product.price}</CardSubtitle>
                {/* <CardText>{product.description}</CardText> */}
                <Button tag={Link} to={`/products/${product.id}`} color='info' style={{marginRight: '10px'}}>View Product</Button>
                <Button disabled={Boolean(store.getState().cart.cart && cart.cart.find((e) => e.id === product.id))} 
                    color='info' onClick={handleClick}>Add to Cart</Button>
            </CardBody>
        </Card>
    )
}

export default ProductCard