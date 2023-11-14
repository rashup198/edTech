import React from 'react'

const About = () => {
  return (
    <div className="h-[100vh] flex flex-col align-top bg-gradient-to-r text-white p-6 rounded-lg shadow-lg">
    <h1 className="text-4xl font-bold text-center mb-[100px]">About Me</h1>

    <div className=" bg-blue-400 p-5 rounded-lg">
    <p className="text-xl mb-4">
      I'm Priyanshu Kumar Pandey, currently pursuing my bachelor's degree in Electronics and Computer Engineering from VIT Chennai.
    </p>
    <p className=" text-xl mb-4">
      I have crafted numerous projects utilizing <span className="font-bold">JavaScript, React.js,HTML, CSS, Tailwind CSS,  Node.js, and Express.js</span> Check out my projects on <a className="text-yellow-300 font-bold hover:underline" href="https://github.com/rashup198">GitHub</a>.
    </p>
    <p className="text-xl mb-4">
      View my <a  className="text-yellow-300 font-bold hover:underline" href="https://drive.google.com/file/d/1ceb52YEZT-glKFeF0SR1r6f-_X4UwEIj/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">Resume</a>.
    </p>
    <p className= "text-xl mb-4">
      Explore my portfolio: <a  className="text-yellow-300 font-bold hover:underline" href="https://priyanshu-pandey.netlify.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>.
    </p>
    </div>
  </div>
  )
}

export default About
