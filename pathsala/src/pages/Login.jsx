import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Don't miss your next opportunity. Sign in to stay updated on your professional world."
      description2="Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login