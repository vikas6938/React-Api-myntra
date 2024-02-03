import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import form from '../Assets/Image/Mention-rafiki.png'

const Form = ({ user, setUser, isEdit }) => {
    const [input, setInput] = useState({ name: '', email: '' })
    let { id } = useParams()
    const nevigate = useNavigate()

    useEffect(() => {
        if (isEdit) {
            setInput(user[id])
        }
    }, [])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        console.log(input)
    }
    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isEdit) {
            const temp = [...user]
            temp[id] = input
            setUser([...temp])
        } else {
            setUser([...user, input])
        }
        console.log(user)
        nevigate('/users')
    }

    return (
        <div className='d-flex col-12'>
            <div className='col-5 dark-card me-3'>
                <h2 className=' text-primary '>Welcome!</h2>
                <h5 className='text-white fw-normal mb-3'>Enter Your Details to Continue.</h5>
                <form action="" onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="" className='text-white d-block mb-1'>Name :</label>
                        <input type="text" value={input.name} name='name' onChange={handleChange} className='w-100  mb-3 rounded-2 text-white' style={{padding: "0.375rem 0.75rem"}} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className='text-white d-block mb-1'>Email :</label>
                        <input type="email" value={input.email} name='email' onChange={handleChange} className='w-100  mb-4 rounded-2 text-white' style={{padding: "0.375rem 0.75rem"}} required />
                    </div>
                    <button className='btn w-100 btn-primary'>{isEdit ? 'Update' : 'Add'}</button>
                </form>
            </div>
            <div className=" dark-card w-100 text-center ">
                <img src={form} alt=""  className='img-fluid ' style={{height:"300px"}}/>
            </div>
        </div>
    )
}

export default Form

