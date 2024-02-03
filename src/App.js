import logo from './logo.svg';
import './App.css';
import Header from './Routing-PR/Admin-panel/Header';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import Dashboard from './Routing-PR/Admin-panel/Dashbord';
import Users from './Routing-PR/Admin-panel/Users';
import Settings from './Routing-PR/Admin-panel/Settings';
import Layout from './Routing-PR/Admin-panel/Layout';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './Routing-PR/Admin-panel/reduxThunk/Store';
import Product from './Routing-PR/Admin-panel/Product';
import Cart from './Routing-PR/Admin-panel/Cart';
import Login from './Routing-PR/Component/Login';
import SignUp from './Routing-PR/Component/SignUp';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[loggedInuser,setLoggedInuser] = useState(null)


  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserLoggedIn = localStorage.getItem('storedUserLoggedIn');
    if (storedLoggedIn) {
      setIsLoggedIn(JSON.parse(storedLoggedIn));
      setLoggedInuser(JSON.parse(storedUserLoggedIn));
    }
  }, []);


  return (
    <>
      {
        isLoggedIn ? (
          <BrowserRouter >
            <div className=" d-flex-column container-fluid p-0 ">
          <Header setIsLoggedIn={setIsLoggedIn} loggedInuser={loggedInuser}  />
              <div className="d-flex dark-theme vh-100 w-100 ">
                {/* <div style={{ marginLeft: "300px" }} className='w-100'> */}
                {/* <Layout loggedInuser={loggedInuser}/> */}
                  <Routes  >
                    <Route path="/" element={<Dashboard />} ></Route>
                    <Route path="/product" element={<Product loggedInuser={loggedInuser}/>} ></Route>
                    <Route path="/settings" element={<Settings />} ></Route>
                    <Route path="/cart" element={<Cart loggedInuser={loggedInuser} />} ></Route>
                    <Route path='*' element={<h1 className='container text-white '>404 Page Error...</h1>} />
                  </Routes>
                </div>
              </div>
             
            {/* </div> */}
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setLoggedInuser={setLoggedInuser} />} />
              <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} setLoggedInuser={setLoggedInuser}/>} />
            </Routes>
          </BrowserRouter>

        )
      }
    </>
  )
}

export default App;
