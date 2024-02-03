import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert'

const Login = ({ setIsLoggedIn, setLoggedInuser}) => {

    const [input, setInput] = useState({
        name: '',
        password: ''
    })



    
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const respose = await fetch('http://localhost:5000/users', {
            method: "GET",
        })

        const user = await respose.json()
        const findUser = user.find((item) => item.email === input.email && item.password === input.password)
        if (findUser) {
            swal("Succesfully Login!", "You clicked the button!", "success");
            setIsLoggedIn(true)
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            localStorage.setItem('storedUserLoggedIn', JSON.stringify(findUser));
            setLoggedInuser(findUser)
        } else {
            // swal("Invalid Username or Password!", "You clicked the button!", "error");
            toast.warning("Invalid Username or Password!");
        }

    }

    return (
        <div className="container d-flex justify-content-center  align-items-center vh-100  ">
            <div class="form-container col-5">
                <p class="title">Login</p>
                <form class="form" onSubmit={handleSubmit}>
                    <div class="input-group">
                        <label for="username" className='text-white'>Username / Email</label>
                        <input type="email" name="email"  id="username" placeholder="Enter Your Username" onChange={handleChange} />
                        <ToastContainer />
                    </div>
                    <div class="input-group">
                        <label for="password" className='text-white'>Password</label>
                        <input type="password"  name="password" id="password" placeholder="Enter Your Password" onChange={handleChange} />
                        <div class="forgot">
                            <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                        </div>
                    </div>
                    <button class="sign">Sign in</button>
                </form>
                <div class="social-message">
                    <div class="line"></div>
                    <p class="message text-success fw-bold">Login with social accounts</p>
                    <div class="line"></div>
                </div>
                <div class="social-icons">
                    <button aria-label="Log in with Google" class="icon">
                        <i class="fa-brands fa-facebook text-white "></i>
                    </button>
                    <button aria-label="Log in with Twitter" class="icon">
                        <i class="fa-brands fa-google text-white "></i>
                    </button>
                    <button aria-label="Log in with GitHub" class="icon">
                        <i class="fa-brands fa-github text-white "></i>
                    </button>
                </div>
                <p class="signup text-white">Don't have an account?
                    <Link rel="noopener noreferrer" href="#" to={'/signup'} class="signup text-warning"> Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
