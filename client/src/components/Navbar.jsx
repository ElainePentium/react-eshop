import React, { useEffect, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, 
  Button,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, emptyCart, addToCart } from '../features/cart/cartSlice';

function NavigationBar() {
//   const user = useSelector((state) => state.signin.user);
//   console.log("navbar", user)
  const [canvasIsOpen, setCanvasIsOpen] = useState(false);
  const toggleOffcanvas = () => {
    setCanvasIsOpen(!canvasIsOpen);
  };

  const cart = useSelector((state) => (state.cart))
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(removeFromCart(e.target.id))
  }

  const handleEmpty = () => {
    dispatch(emptyCart())
  }

  const handleSaveDB = async () => {
    console.log('🛒-->💾')
    const cartArray = [];
    cart.cart.forEach(product => {
      cartArray.push(product.id)
    });
    const cartString = '['+cartArray+']'

    await fetch('/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productList: cartString
      })
    });
  }

  const handleGetDBCart = async () => {
    console.log('💾-->🛒')

    localStorage.clear();
    dispatch(emptyCart())

    const prodList = await fetch(`/cart`)
      .then((results) => results.json())
      // .then((productList) => console.log('fetch', productList))

    console.log('prodList', prodList)
    prodList.forEach(async prod => {
      fetch(`https://fakestoreapi.com/products/${prod}`)
      .then(async res => res.json())
      .then(async json => {
        // setProduct(json)
        console.log(`id${prod}`, json)
        dispatch(addToCart(json))
      });
    });

    // console.log('cartDB', cartDB)

    // .then(([results]) => {
    //   if (results.length) {
    //       res.json(results[0]);
    //   }
    //   else {
    //       res.sendStatus(404);
    //   }
   
  // })

  }

  useEffect(() => {
    if (!cart.cart) {
      setCanvasIsOpen(false);
    }
  }, [cart.cart])

  return (
    <div>
      <Navbar expand={"md"}>
        <NavbarBrand tag={Link} to="/">🦄🌈 Shop </NavbarBrand>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/products">Products</NavLink>
          </NavItem>
        </Nav>
        <Button color='info' onClick={handleGetDBCart} style={{marginRight:'10px'}}>Get DB Cart</Button>
        <Button onClick={toggleOffcanvas} color='info' outline>🛒({cart.cart ? cart.cart.length : 0 })</Button>

         <div id='cart'>
           <Offcanvas direction="end" fade={false} toggle={toggleOffcanvas} isOpen={
              cart.cart ? 
                canvasIsOpen
                : false
              }>
             <OffcanvasHeader toggle={toggleOffcanvas}>Your Cart</OffcanvasHeader>
             <OffcanvasBody>
                {cart.cart ? <Button outline color='info' onClick={handleEmpty}>🚮</Button> : <p>🛒</p>}
                {cart.cart && 
                  (<div>
                    {cart.cart.map((item, i) => (
                      // <div key={item.id}>{item.title}</div>
                    <Card key={item.id}>
                      <CardBody>
                        <CardTitle tag="h6">{item.title}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6" >$ {item.price}</CardSubtitle>
                        <Button id={i} color='danger' outline size="sm" onClick={handleClick}>❌</Button>
                      </CardBody>
                      </Card>
                    ))}
                  </div>)
                  }
                  {<Button outline color='info' onClick={handleSaveDB}>💾</Button>}
             </OffcanvasBody>
           </Offcanvas>
         </div>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
