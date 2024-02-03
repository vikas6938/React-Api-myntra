import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

const Product = ({ loggedInuser }) => {

    const [product, setProduct] = useState()
    const [cart, setCart] = useState()
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetchProduct()
        fetchCart()
    }, [])

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
        const userCart = await response.json();
        setCart(userCart)
        setCount(userCart.length)


    }

    const itemExist = (id) => cart.some((item) => item.product.id === id);

    const handleAdd = async (id) => {
        if (!itemExist(id)) {
            const response = await fetch(`http://localhost:5000/cart`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: loggedInuser.id,
                    product: product.find((item) => item.id === id),
                    quantity: 1
                })
            });

            const updatedCart = await response.json();
            setCart(updatedCart);
            setCount(updatedCart.length);
        } else {
            const updatedItem = cart.find((item) => item.product.id === id)
            const response = await fetch(`http://localhost:5000/cart/${updatedItem.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    userId: loggedInuser.id,
                    product: product.find((item) => item.id === id),
                    quantity: updatedItem.quantity + 1
                })
            });

            const updatedCart = await response.json();
            setCart(updatedCart)
           
        }
        fetchCart()

    };


    return (
        <div className=' container px-3 overflow-scroll h-100'>
            <div className="breadcrumb-header d-flex my-3 justify-content-between dark-card">
                <div className="my-auto">
                    <h4 className='text-white'>Product's</h4>
                </div>
                <Link className='btn-product position-relative  px-4 py-6 fs-6 text-white' to={'/cart'}>
                    Cart<i class="fa-solid fa-cart-arrow-down ms-2"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{count}
                    </span>
                </Link>
            </div>
            <div className="d-flex g-2 flex-wrap  ">
                {
                    product && product.map((item, id) => {
                        return (
                            <div key={id} className="col-3" >
                                <div className="pr-bg me-3 ">
                                    <div className=' bg-white  p-3 rounded-1 '>
                                        <img src={item.image} alt="" className='img-fluid w-100 ' style={{ height: '250px' }} />
                                    </div>
                                    <div className="des d-flex mt-3 justify-content-between ">
                                        <div className='text-white'>
                                            <h6 className='mb-0'>{item.name}</h6>
                                            <span>Rs. {item.price}</span>
                                        </div>
                                        <button className='btn btn-warning ' onClick={() => handleAdd(item.id)}><i class="fa-solid fa-cart-arrow-down"></i></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Product
