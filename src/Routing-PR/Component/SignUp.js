import React, { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

const SignUp = ({ setIsLoggedIn, setLoggedInuser }) => {

    const [input, setInput] = useState({
        name: '',
        password: '',
    })

    const nevigate = useNavigate()


    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoggedInuser('name')

        const respose = await fetch('http://localhost:5000/users', {
            method: "GET",
        })

        const user = await respose.json()
        const findUser = user.find((item) => item.email === input.email)
        console.log(findUser)
        if (findUser) {
            swal("Already Exits!", "You clicked the button!", "error");
        } else {
            const respose = await fetch('http://localhost:5000/users', {
                method: "POST",
                body: JSON.stringify(input),
            })
            
            const user = await respose.json()
            swal("Succesfully Registered!", "You clicked the button!", "success");
            setIsLoggedIn(false)
            console.log(input)
        
            nevigate('/')
        }
        

    }

    return (
        <div className="container d-flex justify-content-center  align-items-center vh-100  ">
            <div class="form-container col-5">
                <p class="title">Register</p>
                <form class="form" onSubmit={handleSubmit}>
                    <div class="input-group">
                        <label for="username">Name</label>
                        <input type="text" name="fname" id="username" placeholder="Enter Your Username" onChange={handleChange} />
                    </div>
                    <div class="input-group">
                        <label for="username">Email</label>
                        <input type="email" name="email" id="username" placeholder="Enter Your Username" onChange={handleChange} />
                    </div>
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input type="text" name="name" id="username" placeholder="Enter Your Username" onChange={handleChange} />
                    </div>
                    <div class="input-group">
                        <label for="password">Create Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter Your Password" onChange={handleChange} />
                        <div class="forgot">
                            <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                        </div>
                    </div>
                    <button class="sign">Sign Up</button>
                </form>
                <div class="social-message">
                    <div class="line"></div>
                    <p class="message text-warning">Login with social accounts</p>
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
                <p class="signup text-success">Already have an account?
                    <Link rel="noopener noreferrer" href="#" to={'/'} > Login</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
