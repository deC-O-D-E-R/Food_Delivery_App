import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../pages/Cart';
import { useCart } from './ContextReducer';


function Navbar() {

  const [cartView, setCartView] = useState(false);

  let data = useCart();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Saifeasta</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5 active" aria-current="page" to="/">Home</Link>
              </li>
            {(localStorage.getItem("authToken"))?
            <li className="nav-item">
            <Link className="nav-link fs-5 active" aria-current="page" to="/myOrder">My Orders</Link>
            </li>
            :"" }
            </ul>

          {(!localStorage.getItem("authToken"))?

          <div className='d-flex'>
            <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
      
            <Link className='btn bg-white text-success mx-1' to="/createuser">SignUp</Link>
          </div>
          : 
          <div>
          <div className="btn bg-white text-success mx-2" onClick={() => {setCartView(true)}}>
            My Cart {" "}
            <Badge pill bg='danger'> {data.length} </Badge>
          </div>
          {cartView? <Modal onClose={() => setCartView(false)}><Cart/></Modal> : null}

          <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
            Logout
          </div>
          </div>
          }

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar