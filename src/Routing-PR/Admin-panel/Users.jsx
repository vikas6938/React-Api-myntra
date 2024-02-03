import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = ({ user, setUser }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchFees, setSearchfess] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterValue, setFilterValue] = useState('');


    const [team, setTeam] = useState([
        { id: '3023', name: 'Omprakash Jat', course: 'Full Stack Developer', contact: '9913138325', fees: 'Paid' },
        { id: '3245', name: 'Sajjan Kumavat', course: 'Flutter', contact: '7990069889', fees: 'Paid' },
        { id: '3011', name: 'Vikas Borse', course: 'Full Stack Developer', contact: '7567252434', fees: 'Pending' },
        { id: '2692', name: 'Jay Nandarbarwala', course: 'Front-End Developer', contact: '8866406360', fees: 'Paid' },
        { id: '2994', name: 'Kashyap Chauhan', course: 'Full Stack Developer', contact: '6356730885', fees: 'Paid' },
        { id: '2787', name: 'Nilay', course: 'Animation', contact: '6359012188', fees: 'Paid' },
        { id: '2956', name: 'Priyanshu Mishra', course: 'Full Stack Developer', contact: '6386058989', fees: 'Pending' },
    ])

    const handleSort = () => {
        const sortedData = [...team].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

        setTeam(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
    const filteredData = team.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.fees.toLowerCase().includes(searchFees.toLowerCase())
        
    );

 




    return (
        <div className=' container px-3'>
            <div className="breadcrumb-header d-flex my-3 justify-content-between dark-card">
                <div className="my-auto">
                    <h4 className='text-white'>Students</h4>
                </div>
                <button className='btn btn-primary px-4 py-6 fs-6' onClick={handleSort}>
                    Sort {sortOrder === 'asc' ? <i class="ms-2 fa-regular fa-circle-up"></i> : <i class="ms-2 fa-regular fa-circle-down"></i>}
                </button>
            </div>
            <div className=" m-auto dark-card">
                <h4 className='text-white fs-6 mb-3'>LIST OF THE CURRENT USERS</h4>
                <table class="table table-bordered-theme mb-0 " border={'1'} style={{ borderColor: "black" }} >
                    <thead>
                        <tr>
                            <th scope="col">GRID</th>
                            <th scope="col">Name
                                <input type="text" placeholder='search..' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className=' ms-2 search px-2 py-1 text-white' />
                            </th>
                            <th scope="col">Course</th>
                            <th scope="col">Contact</th>
                            <th scope="col">
                                Fees
                                <select name="" id="" onChange={(e) => setSearchfess(e.target.value)} className='search px-2 py-1 text-center text-theme ms-2'>
                                    <option value="" >--Select-Option--</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Pending">Pending</option>
                                    <option value="">All</option>
                                </select>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{
                        filteredData && filteredData.map((item, index) => {
                            return (
                                <tr>
                                    <td scope="row">{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.course}</td>
                                    <td>{item.contact}</td>
                                    {
                                        item.fees == 'Paid' ?
                                            (<td><span className=' badge fw-bold ' style={{ backgroundColor: '#664c1dc2' }}>{item.fees}</span></td>)
                                            : (<td><span className=' badge fw-bold ' style={{ backgroundColor: '#3b2046c2' }}>{item.fees}</span></td>)
                                    }
                                </tr>
                            )
                        })

                    }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users
