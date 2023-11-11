import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/auth/ProfileDropDown'

const Navbar = () => {

  const {token} = useSelector(state => state.auth);
  // const {user} = useSelector(state => state.user);
  const {totalItems}= useSelector(state => state.cart);

  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({path: route}, location.pathname);
  }
  return (
    <div className='flex h-14 border-b-[1px] border-b-richblack-500'>
      <div className="w-11/12 flex max-w-maxContent items-center  justify-between ">
        <Link to='/' className='text-2xl font-bold text-white'>Pathshala</Link>

        {/* // Navbar Links */}
        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {NavbarLinks.map((link,index) => (
              <li key={index}>
                {
                  link.title ==="Catalog" ? (<div></div>) : (<div>
                    <Link to={link?.path}>
                      <div className={` ${matchRoute(link?.path) ? 'text-yellow-25 hover:text-yellow-25' : 'text-white'}`}>
                        {link?.title}
                      </div>
                    </Link>

                  </div>)
                }
                
              </li>
            ))}
            
          </ul>
        </nav>

      {/* // Login Button */}

      <div className="flex gap-x-4 items-center">
        {/* {
          user && user?.accountType != "Instructor" && (
            <Link to={"/dashboard/cart"} className='relative'>
              <AiOutlineShoppingCart className='text-2xl text-white' />
              {
                totalItems > 0 && (
                  <div>
                    {totalItems}
                  </div>
                )
              }
            </Link>

          )
        } */}
        {
          token === null && (
            <Link to='/login' className='border border-richblack-700 bg-richblue-800 px-[12px] py-[5px] rounded-md text-white font-semibold'>Login</Link>
          )
        }
        {
          token === null &&(
            <Link to={"/signup"} className='border border-richblack-700 bg-richblue-800 px-[12px] py-[5px] rounded-md text-white font-semibold'>Signup</Link>
          )
        }

        {
          token !== null && <ProfileDropDown />
        }
      </div>

      </div> 
    </div>
  )
}

export default Navbar
