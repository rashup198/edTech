import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from '../components/core/Homepage/Button'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
const Home = () => {
  return (
    <div>
      {/*  section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between '>
            <Link to="/signup">
                <div className='mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>
                    <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 '>
                        <p>Become an Educator</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className=' text-center flex flex-col mt-7'>
                <h1 className='text-2xl font-bold text-center'>Learn from the <span className='text-richblue-200'>Best</span></h1>
                <p className='text-xl text-center'>Get the best education from the <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-caribbeangreen-100'>Best Educators</span></p>
            </div>

            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 '>   
                With our online courses , you can learn at your own pace , from anywhere in the world, and get access to resources, including hands-on projects, quizzes, and much more. 
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                    Start a Demo Class
                </CTAButton>
            </div>

            <div className=' mx-3 my-12  shadow-blue-200'>
                <video muted loop autoPlay>
                    <source src={Banner} type='video/mp4'></source>
                </video>
            </div>

            {/* code section 1 */}

            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <h1 className='text-3xl font-bold text-center'>Learn from the <span className='text-richblue-200'>Best</span></h1>
                    }
                    subheading={
                        <p className='text-xl text-center'> Our courses are designed and taught by industry experts who have years of <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-caribbeangreen-100'>experience</span>in there field </p>
                    }
                    ctabtn1={{
                        btnText:"Try it yourself",
                        active:true,
                        linkto:"/signup"
                    }}
                    ctabtn2={{
                        btnText:"Learn More",
                        active:false,
                        linkto:"/login"
                    }}
                    codeblock={`
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>My First Page</title>
                      <style></style>
                    </head>
                    <body>
                    <p>hello world</p>
                    </body>
                    </html>`}
                    codeColor={"text-yellow-400"}
                />

            </div>

            {/* code section 2 */}

            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <h1 className='text-3xl font-bold text-center'>Unloack you <span className='text-richblue-200'>Coding Potential </span>with our online courses</h1>
                    }
                    subheading={
                        <p className='text-xl text-center'> Our courses are designed and taught by industry experts who have years of <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-caribbeangreen-100'>experience</span>in there field </p>
                    }
                    ctabtn1={{
                        btnText:"Try it yourself",
                        active:true,
                        linkto:"/signup"
                    }}
                    ctabtn2={{
                        btnText:"Learn More",
                        active:false,
                        linkto:"/login"
                    }}
                    codeblock={`
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>My First Page</title>
                      <style></style>
                    </head>
                    <body>
                    <p>hello world</p>
                    </body>
                    </html>`}
                    codeColor={"text-yellow-400"}
                />

            </div>
        {/*  section 3 */}

        {/* footer */}
        </div>

    
        
    </div>
  )
}

export default Home
