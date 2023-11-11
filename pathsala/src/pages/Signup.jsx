import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/auth/Template"

function Signup() {
  return (
    <Template
      title="Join Pathsala Today !"
      description1="Pathsala is the best place to learn and grow. Get started now!"
      description2="Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup