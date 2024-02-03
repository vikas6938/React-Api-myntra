import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Cart = ({ loggedInuser }) => {
    // const cart = useSelector((state) => state.cart);
    const [cart, setCart] = useState()
    const [product, setProduct] = useState()
    const [noRecords, setNoRecords] = useState(false);
    const [total, setTotal] = useState(0);
    const Discount = 15


    useEffect(() => {
        fetchProduct()
        fetchCart()
    }, [cart])


  



    const fetchProduct = async () => {
        const respose = await fetch('http://localhost:5000/product', {
            method: "GET",
        })

        const product = await respose.json()
        setProduct(product)
    }

    const fetchCart = async () => {
        const response = await fetch(`http://localhost:5000/cart?userId=${loggedInuser.id}`, {
            method: 'GET',
        });

        const cart = await response.json()

        const userCart = cart.filter((item, id) => loggedInuser.id === item.userId);
        setCart(userCart);

        if (userCart.length === 0) {
            setNoRecords(true);
            setTotal(0)
        } else {
            setNoRecords(false);
            const subtotal = userCart.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
            setTotal(subtotal);


            // console.log(subtotal);
        }
    }



    const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:5000/cart/${itemId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedCart = cart.filter((item) => item.id !== itemId);
                setCart(updatedCart);

                if (updatedCart.length === 0) {
                    setNoRecords(true);
                }
            } else {
                console.error('Failed to delete item from the server');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };



    const handleIncrement = async (id) => {
        const updatedItem = cart.find((item) => item.product.id === id);
        const response = await fetch(`http://localhost:5000/cart/${updatedItem.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                userId: loggedInuser.id,
                product: product.find((item) => item.id === id),
                quantity: updatedItem.quantity + 1
            })
        });

        const updatedCart = await response.json();
        const updatedCartArray = cart.map((item) =>
            item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );

        setCart(updatedCartArray);

    }
    const handleDecrement = async (id) => {
        const updatedItem = cart.find((item) => item.product.id === id);
        if (updatedItem.quantity > 1) {
            const response = await fetch(`http://localhost:5000/cart/${updatedItem.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    userId: loggedInuser.id,
                    product: product.find((item) => item.id === id),
                    quantity: updatedItem.quantity - 1
                })
            });

            const updatedCart = await response.json();
            const updatedCartArray = cart.map((item) =>
                item.product.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );

            setCart(updatedCartArray);
        }
    }
 



    // console.log(userCart)

    return (
        <div className='container px-3'>
            <div className="breadcrumb-header d-flex my-3 justify-content-between dark-card">
                <div className="my-auto">
                    <h4 className='text-white'>Cart / <span className='text-theme fs-6'>product</span></h4>
                </div>
                <div>
                    <Link className='btn-cart px-4 py-6 fs-6 me-2 text-white' to={'/product'}>Product<i className="fa-solid fa-cart-arrow-down ms-2"></i></Link>
                </div>
            </div>

            <div className="row">
                <div className="col-9">
                    <div className="dark-card p-0 ">
                        <div className="cart-heading p-2" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                            <h5 className="m-0 text-theme ">Shopping Cart</h5>
                        </div>
                        <div className="cart-body p-3 " style={{ height: "60vh", overflowY: "scroll" }}>
                            <table class="table">
                                <thead>
                                    <tr className='text-theme'>
                                        <th scope="col">PRODUCT</th>
                                        <th scope="col">QUANTITY</th>
                                        <th scope="col">PRICE</th>
                                        <th scope="col">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {noRecords ? (
                                        <>
                                            <td className='text-center fw-bold  pe-0 py-5' colSpan={4}>Your Cart is Empty</td>
                                        </>
                                    ) : (
                                        cart && cart.map((item, id) => {
                                            return (
                                                <tr key={id}>
                                                    <td >
                                                        <img src={item.product.image} alt="" className='img-fluid' style={{ height: '70px', width: "70px", borderRadius: "3px" }} />
                                                        <span className='ms-3'>{item.product.name}</span></td>
                                                    <td >
                                                        <button className='btn  text-white rounded-0 ' style={{ border: "1px solid #bfc8de" }} onClick={() => handleIncrement(item.product.id)}>+</button>
                                                        <span className='btn text-theme rounded-0 ' style={{ border: "1px solid #bfc8de" }}>{item.quantity}</span>
                                                        <button className='btn text-white rounded-0 ' style={{ border: "1px solid #bfc8de" }} onClick={() => handleDecrement(item.product.id)}>-</button></td>
                                                    <td>Rs. {item.product.price}</td>
                                                    <td><button className='btn' onClick={() => handleDelete(item.id)}><i class="fa-solid fa-trash-can text-danger fs-5"></i></button></td>
                                                </tr>
                                            )
                                        })
                                    )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="dark-card text-center p-0">
                        <div className="cart-heading p-2" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                            <h5 className="m-0 text-theme ">Price Details</h5>
                        </div>
                        <div className="p-3">
                            <table class="table ">
                                <tbody>
                                    <tr className='fs-6'>
                                        <td>Sub Total</td>
                                        <td>{total}</td>
                                    </tr>
                                    <tr className='fs-6'>
                                        <td>Discount</td>
                                        <td>15 %</td>
                                    </tr>
                                    <tr className='fs-6'>
                                        <td>Shipping</td>
                                        <td>Free</td>
                                    </tr>
                                    <tr className='fw-bold fs-6'>
                                        <td >Total</td>
                                        <td>Rs. {total - (Discount)/100}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
