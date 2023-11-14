import { Routes,Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/auth/OpenRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Error from "./pages/Error";
import About from "./pages/About";
import ContactFrom from "./components/core/ContactFrom";


function App() {
  return (
   <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>

        <Route path="/signup" element={<OpenRoute>
          <Signup></Signup>
        </OpenRoute>}
        ></Route>

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>

        <Route path="/update-password/:id" element={<UpdatePassword/>}></Route>
        
        <Route path="*" element={<Error></Error>}></Route>
        <Route path="verify-email" element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<ContactFrom></ContactFrom>}></Route>
        


      </Routes>
   </div>
  );
}

export default App;
