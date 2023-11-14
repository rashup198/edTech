import React from 'react'
import CTAButton from '../components/core/Homepage/Button'
import classNames from 'classnames';

const LearingGridArray = [
    {
        order:-1,
        heading:"World Class Curriculum",
        description:"Learn the latest skills like business analytics, graphic design, Python, and more",
        btnText:"Explore",
        btnLink:"/"
    },
    {
        order:1,
        heading:"Top Quality Instructors",
        description:"Learn from industry experts who are passionate about teaching",
    },
    {
        order:2,
        heading:"Earn a Career Credential",
        description:"Get ready for a career in high-demand fields like IT, AI and cloud engineering",

    },
    {
        order:3,
        heading:"Learn at Your Own Pace",
        description:"Self-paced learning - whenever and wherever you want",

    },
    {
        order:4,
        heading:"Hands-on Learning",
        description:"Apply what you learn with self-paced quizzes and hands-on projects",

    },
    {
        order:5,
        heading:"Shareable Certificate",
        description:"Add a stunning certificate to your LinkedIn or resume",

    },
    
]



const About = () => {
    return (
        <div>

        
        <div className="grid mx-auto grid-cols-1 lg:grid-cols-4 mt-[100px]">
        {LearingGridArray.map((card, index) => (
          <div
            key={index}
            className={classNames(
              { 'lg:col-span-2 lg:h-[250px]': index === 0 },
              { 'bg-richblack-600': card.order % 2 === 1, 'bg-richblack-800 lg:h-[250px]': card.order % 2 !== 1 },
              { 'lg:col-start-2': card.order === 3 },
              'p-6 lg:w-[90%] flex flex-col pb-5' // Additional spacing
            )}
          >
            {card.order < 0 ? (
              <div className='text-white flex flex-col gap-5'>
                <h1 className="text-3xl text-white">{card.heading}</h1>
                <p className="text-xl w-fit">{card.description}</p>
                <div className='w-fit'>
                <CTAButton active={true} link={card.btnLink}>
                  {card.btnText}
                </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col text-white gap-5">
                <h1 className="p-2 text-3xl">{card.heading}</h1>
                <p>{card.description}</p>
              </div>
            )}
          </div>
        ))}
        </div>
  
        <div className="h-[100vh] flex flex-col align-top bg-gradient-to-r  text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center mb-[100px]">About Me</h1>

            <div className=" bg-blue-400 p-5 rounded-lg">
            <p className="text-xl mb-4">
                I'm Priyanshu Kumar Pandey, currently pursuing my bachelor's degree in Electronics and Computer Engineering from VIT Chennai.
            </p>
            <p className=" text-xl mb-4">
                I have crafted numerous projects utilizing <span className="font-bold">HTML, CSS, Tailwind CSS, JavaScript, React.js, Node.js, and Express.js</span>. Some of my notable projects include GitHub profile finder, shopping cart, password generator, Discord Clone, Microsoft Clone, VIT Cultural Fest Clone, and more. Check out my projects on <a className="text-yellow-300 font-bold hover:underline" href="https://github.com/rashup198">GitHub</a>.
            </p>
            <p className="text-xl mb-4">
                View my <a  className="text-yellow-300 font-bold hover:underline" href="https://drive.google.com/file/d/1ceb52YEZT-glKFeF0SR1r6f-_X4UwEIj/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">Resume</a>.
            </p>
            <p className= "text-xl mb-4">
                Explore my portfolio: <a  className="text-yellow-300 font-bold hover:underline" href="https://priyanshu-pandey.netlify.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>.
            </p>
            </div>
            </div>
        
        </div>
      );
    };
    
    export default About;