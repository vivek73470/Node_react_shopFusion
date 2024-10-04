import React, { useEffect } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchUserData } from '../../Redux/auth/action';
import { FaBars } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoMdCart } from "react-icons/io";
import { MdOutlineDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";

function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((store) => store.AuthReducer.userData)
  const userId = localStorage.getItem('userId')




  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData(userId));
    }
  }, [dispatch, userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login')
  }


  const handleNavigation = (url) => {
    navigate(url);

  };
  return (
    <>
      <div className='Admin-Header-screen'>
        <div className='Admin-Header-screen-wrapper'>
          <div className='Admin-Header-title'>
            <div className='admin-header-offcanvas' data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
              <FaBars />
            </div>
            <div className='Admin-Header-title-welcome'>{userDetails?.username}</div>
          </div>
        </div>
      </div>

      <div class="offcanvas offcanvas-start  hamburger-offcanvas-wid" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div id='admin-offcanvas-header-hambopen' class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">ShopFusion</h5>
          <button type="button" class="btn-close admin-closebtn-canvas" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div class="adminoffcanvas-body-wrapper">
            <div className='admin-offcanvas-body-homecnt'>
              <span className='admin-offcanvas-body-linkk' onClick={() => handleNavigation('/admin/dashboard')} data-bs-dismiss="offcanvas">
                <MdOutlineDashboard />
                <span className='admin-navbar-head-homcnt-hamb'>Dashboard</span>
              </span>
              <span className='admin-offcanvas-body-linkk' to='/admin/add-product' onClick={() => handleNavigation('/admin/add-product')} data-bs-dismiss="offcanvas">
                <MdOutlineProductionQuantityLimits />
                <span className='admin-navbar-head-homcnt-hamb'>Add Products</span>
              </span>

              <span className='admin-offcanvas-body-linkk' to='/admin/cart-admin' onClick={() => handleNavigation('/admin/cart-admin')} data-bs-dismiss="offcanvas">
                <IoMdCart />
                <span className='admin-navbar-head-homcnt-hamb'>Cart</span>
              </span>

              <span className='admin-offcanvas-body-linkk' to='/admin/profile' onClick={() => handleNavigation('/admin/profile')} data-bs-dismiss="offcanvas">
                <CgProfile />
                <span className='admin-navbar-head-homcnt-hamb'>Profile</span>
              </span>
            </div>

            <div className='admin-offcanvas-logout' onClick={() => handleLogout()} data-bs-dismiss="offcanvas">
              <TbLogout />
              <span className='admin-navbar-head-homcnt-hamb'>  Logout</span>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default AdminHeader


