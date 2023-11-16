import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'


const Cart = () => {

    const {total, totalItems} = useSelector((state) => state.cart)
  return (
    <div className='text-white'>
      <h1>Cart</h1>
      <p>{totalItems} Courses in Cart</p>

      {
        total>0 ? (
            <div>
                <RenderCartCourses />
                <RenderTotalAmount></RenderTotalAmount>
            </div>
        ):(<div>
            <p>Cart is Empty</p>
            </div>)
      }
    </div>
  )
}

export default Cart
