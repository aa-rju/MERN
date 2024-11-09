import React from 'react'
import { Link,matchPath } from 'react-router-dom'
import logo from "../../../src/assets/logo/Logo1.png"
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
// import { categories } from '../../services/apis';
// import { apiConnector } from '../../services/apiconnector';
import { useSelector } from 'react-redux';
// import { useState } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import {toast} from "react-hot-toast"

const subLinks = [
    {
        title: "python", 
        link:"/catalog/python"
    },
        {
        title: "web development", 
        link:"/catalog/webdevelopment"
    }
]

const Navbar = (props) => {
    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    // const [subLinks, setSubLinks] = useState([]);

    // const fetchSubLinks=async() => {
    //         try {
    //             const result = await apiConnector("GET", categories.CATEGORIES_API);
    //             console.log("Printing SubLinks result:", result);
    //             setSubLinks(result.data.data);
    //         }
    //         catch(error) {
    //             console.log("Could not fetch the category list");
    //         }
    // }
    
    // // api call
    // useEffect(() => {
    //     fetchSubLinks();
    // },[])




    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
  return (
      <div className='flex h-12 items-center justify-center border-b-[1px] border-gray-100'>
          <div className='flex w-11/12 max-w-maxContent items-center justify-between mx-2 '>
              
              <Link to="/">
                  <img src={logo} width={50} height={32} alt="" />
              </Link>
            </div>
          {/* Nav links */}
          <nav>
              <ul className='flex text-richblack-10 gap-x-4 items-center justify-center mx-8'>
                  {
                      NavbarLinks.map((link, index) => (
                         <li key={index}>
                              {
                                  link.title === "Catalog" ? (
                                      //   needa call api from frontend for catalog
                                      // on clicking->service/function -> backend controller->function call->response...
                                      <div className='flex items-center gap-2 group relative'>
                                          <p>{link.title}</p>
                                          <FaAngleDown />

                                          <div className='invisible absolute left-[50%] top-[50%] 
                                          translate-x-[-50%] translate-y-[80%]
                                          flex flex-col rounded-md bg-richblack-5 text-richblack-100 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] '>

                                              <div className='absolute left-[50%] top-0 h-6 
                                              rotate-45 rounded bg-richblack-5
                                              translate-y-[45%] '>
                                                  
                                              </div>  

                                              {
                                                  subLinks.length ? (
                                                      
                                                          subLinks.map((subLink, index) => (
                                                              <Link to={`${subLink.link}`} key={index}>
                                                                  <p> {subLink.title}</p>
                                                              </Link>
                                                      ))
                                                  
                                                  ) : (<div></div>)
                                              }
                                          </div>

                                      </div>
                                  ) : (
                                      <Link to={link?.path}>
                                          <p className={`${matchRoute(link?.path)? "text-yellow-50" :"text-richblack-10"}`}>
                                              {link.title}
                                          </p>
                                      </Link>
                                  )
                              }
                          </li>
                      ))
                  }
                  
              </ul>
          </nav>

          {/* login /signup /Dashboard */} 
            {/* <div className="flex items-center gap-x-4 text-white">
                {!isLoggedIn && (
                    <Link to="/login">
            <button className="bg-green-600 px-[12px] py-[8px]">Login</button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup">
            <button
              className="bg-green-600 px-[12px] py-[8px]"
              onClick={() => {
                setIsLoggedIn(false);
                toast.success("Logged Out");
              }}
            >
              SignUp
            </button>
          </Link>
        )}
        {/* {isLoggedIn && (
          <Link to="/">
            <button
              className="bg-green-600 px-[12px] py-[8px]"
              onClick={() => {
                setIsLoggedIn(false);
                toast.success("Logged Out");
              }}
            >
              LogOut
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/dashboard">
            <button className="bg-green-600 px-[12px] py-[8px]">
              Dashboard
            </button>
          </Link>
        )}
          <div className='flex gap-x-4 items-center '> 
              {/* npm i redux-toolkit */}
              {
                  user && user?.accountType !== "Instructor" &&
                  <Link to="/dashboard/cart" className='relative' >
                          <CiShoppingCart />   
                          {
                              totalItems > 0 && (
                                  <span>
                                      {totalItems}
                                  </span>
                              )
                          }
                  </Link>
              }
              {
                  token === null && (
                      <Link to="/login" >
                          <button className='border border-richblack-100 bg-richblack-50 px-[12px] py-[8px] text-richblack-5 w-fit rounded-md '>
                              Log in
                          </button>
                      </Link>
                  )
              }
              {
                  token === null && (
                      <Link to="/signup" >
                          <button className='border border-richblack-100 bg-richblack-50 px-[12px] py-[8px] text-richblack-5 rounded-md '>
                              Sign Up
                          </button>
                      </Link>
                  )
              }
              {
                  token !== null && <ProfileDropDown />
              }
          </div>

    )
    
}


export default Navbar