import React from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import { useState } from 'react'

const tabsName =[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0])
    const [courses , setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards= (value)=>{
        setCurrentTab(value)
        const result = HomePageExplore.filter((course)=>course.tag === value)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }

  return (
    <div>
      <div className="text-4xl font-semibold text-center">
        Unlock the <span className=' '>Power of Code</span>
      </div>

      <p className='text-center text-small
       text-richblack-300'>
        Learn to build anything you can imagine
      </p>

      <div className="flex gap-7 justify-center rounded-full bg-richblack-800 mb-35 pl-3 pr-3  mt-5 px-2 py-2">
      {
        tabsName.map((element,index)=>{
            return(
                <div className={`text-[16px] flex items-center gap-2 ${
                    currentTab === element
                      ? "bg-richblack-900 px-3 text-white font-medium"
                      : "text-pure-greys-200"
                  } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:px-2  hover:text-white py-2`} key={index} onClick={()=>setMyCards(element)}>
                    {element}
                    </div>
            )
        })
      }
      </div>

      <div className="h-[150px]"></div>

      {/* //card */}

      <div className=" flex gap-5 mb-[50px]">
        {
            // all the data should be in card form 
            courses.map((element,index)=>{
                return(
                   // create a card component
                     <div className={`flex flex-col gap-3 w-[250px] h-[250px] bg-richblack-800 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-2xl hover:bg-richblack-900 hover:text-white ${currentCard === element.heading ? "border-2 border-pink-400" : "border-0"}`} key={index} onClick={()=>setCurrentCard(element.heading)}>
                          <div className='text-2xl text-center text-caribbeangreen-300 font-semibold'>
                            {element.heading}
                          </div>
                          <div className='text-[18px] text-justify leading-7'>
                            {element.description}
                          </div>
                        </div>
                )
            })
        }
      </div>

    </div>
  )
}

export default ExploreMore
