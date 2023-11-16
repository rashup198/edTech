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
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";




function App() {
  const user = useSelector((state) => state.auth.user)
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
        <Route element={<PrivateRoute>
          <Dashboard></Dashboard>
        </PrivateRoute>}
        >
           <Route path="/dashboard/my-profile" element={<MyProfile></MyProfile>}></Route>
           <Route path ="/dashboard/settings" element={<Settings></Settings>}></Route>
           
           
           {
            user?.accountType ===ACCOUNT_TYPE.STUDENT&&(
              <>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses></EnrolledCourses>}></Route>
              <Route path="/dashboard/cart" element={<Cart></Cart>}></Route>
              </>
            )
           }
           
        </Route>
       



      </Routes>
   </div>
  );
}

export default App;
