
import React, { useState } from 'react'
import './sidebar.css'
import { useNavigate, NavLink } from 'react-router-dom';
import { MdOutlineDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoMdCart } from "react-icons/io";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// takes a prop named Children.
function Sidebar({ Children }) {

  const [isOpen, setIsOpen] = useState(true);

  // The toggle function is defined to toggle the value of isOpen between true and false when called.
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const menuItem = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: <MdOutlineDashboard />
    },
    {
      title: 'Add Product',
      path: '/admin/add-product',
      icon: <MdOutlineProductionQuantityLimits />,
    },
    {
      title: 'Cart',
      path: '/admin/cart-admin',
      icon: <IoMdCart />,
    },
    {
      title: 'Profile',
      path: '/admin/profile',
      icon: <CgProfile />
      ,
    }
 
  ]


  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    toast("Logout Successfully!");
  }



  return (
    <>
      <div className='sidebar-screen'>
      {/* If isOpen is true, the width is set to "300px"; otherwise, if isOpen is false, the width is set to "105px" */}
        <div style={{ width: isOpen ? "300px" : "105px" }} className='sidebar-screen-wrapper'>
          <div className='top-section'>
            <h1 style={{ display: isOpen ? "block" : "none" }} className='logo'>Topshop</h1>
            <div style={{ marginLeft: isOpen ? "105px" : "0px" }} className='bars'>
              <FaBars onClick={toggle} />
            </div>
          </div>
          {
            menuItem.map((elem) => (
              <NavLink
                to={elem.path}
                key={elem.path}
                className="link"
                activeClassName="active"
              >
                <div className='"icon'>{elem.icon}</div>
                <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{elem.title}</div>
              </NavLink>
            ))
          }
          <div className='sidebar-log'>
              <button
              className="link-btn"
              activeClassName="active"
              onClick={() => handleLogout()}>
              <div className="icon">
                <TbLogout />
              </div>
              <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Logout</div>
              </button>
          </div>
        </div>
        <main>{Children}</main>
      </div>
    </>
  )
}

export default Sidebar
