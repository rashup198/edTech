import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import CourseInformation from './CourseInformation/CourseInformationForm'

const RenderSteps = () => {

    const {step}= useSelector(state => state.addCourse)

    const steps =[
        {
            id:1,
            titel:"Course Details",

        },
        {
           id:2,
            titel:"Course Builder", 
        },
        {
            id:3,
            titel:"Publish Course", 

        }

    ]


  return (
    <>
    <div>
      <div className="">
        {steps.map((item) => (
            <div className="">
            <div className={`${step=item.id ?"bg-yellow-900 border-yellow-50" :" border-richblack-700 bg-richblack-800 text-richblack-300"}`}>
                {
                    step>item.id?(<FaCheck/>):(item.id)
                }
            </div>
            {   
                
                item.id !== steps.length && (
                    <div className="flex-1 border-t-2 border-richblack-700"></div>
                )
            }
            </div>

            // add the dashes between the steps
            
            
            

        ))}
      </div>
    </div>
    <div className="">
        {step.map((item) => (
            <>
            <div className="">
                <p>{item.titel}</p>
            </div>
            </>
        ))}
    </div>

            {
                step === 1 && (<CourseInformation/>)
            }
            {/* {
                step === 2 && (<CourseBuilder/>)
            }
            {
                step === 3 && (<PublishCourse/>) 
            } */}
    </>
  )
}

export default RenderSteps
