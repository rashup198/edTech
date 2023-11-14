import React from 'react'
import instructor from '../../../assets/Images/teacher.jpg'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from '../Homepage/Button'
const InstructorSection = () => {
  return (
    <div className='mt-[100px] mb-[100px]'>
      <div className="flex gap-[100px] items-center ">
        <div className='w-50%'>
            <img src={instructor} alt='instructor' className='w-[700px] rounded-lg shadow-blue-200'></img>
        </div>
        <div className="w-[50%] flex flex-col gap-10 ">
            <div className=" text-4xl font-semibold">
                Become an <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-caribbeangreen-100'>Instructor</span> 
            </div>
            <p className=' font-medium text-[16px] text-richblack-300 w-[80%]'>
                Pathsala is a platform for instructors to build up their own brand and teach students around the world.We provide the tools and skills to teach what you love.
            </p>
            <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-3'>Start Teaching Today <FaArrowRight/>
                </div>
            </CTAButton>
            </div>
        </div>

      </div>
    </div>
  )
}

export default InstructorSection
