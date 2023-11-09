import React from 'react'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"

import CTAButton from '../Homepage/Button'
const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>
      <div className="flex flex-col gap-5 items-center ">
          <div className="text-4xl font-semibold text-center">
          Empower your journey to <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-caribbeangreen-100'>language mastery with this tool.</span>
          </div>
          <div className='text-center text-richblue-600 mx-auto text-base font-medium w-[70%]'>
            Using spin making learning a language fun and easy with our interactive lessons, games and live classes taught by real teachers.
          </div>

          <div className="flex items-center justify-center mt-5">
              <img src={know_your_progress}
              alt='know your progress' 
              className='object-contain translate-x-[28%]'
              >
              </img>
              
              <img src={compare_with_others}
              alt='compare with others'>
              </img>

              <img src={plan_your_lessons}
              alt='plan your lessons'
              className='object-contain translate-x-[-30%]'>
              </img>
          </div>

          <div className="w-fit ">
            <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-3'>Learn More
                </div>
            </CTAButton>
          </div>
      </div>  
    </div>
  )
}

export default LearningLanguageSection
