import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GiNinjaStar } from 'react-icons/gi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeFromCart } from '../../../../slices/cartSlice';
import ReactStars from 'react-rating-stars-component';

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      {cart.map((course, index) => (
        <div key={index} className="border p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={course?.thumbnail} className="w-16 h-16 object-cover" alt={course?.courseName} />
            <div>
              <p className="text-lg font-bold">{course?.courseName}</p>
              <p className="text-gray-500">{course?.category?.name}</p>
              <div className="flex items-center space-x-2">
                {/* Replace the hardcoded rating with the actual rating from the backend */}
                <span className="text-yellow-500 font-bold">4.5</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />
                <span className="text-gray-500">{course?.ratingAndReviews?.length} Ratings</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center space-x-2 text-red-500"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="text-lg font-bold">Rs {course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
