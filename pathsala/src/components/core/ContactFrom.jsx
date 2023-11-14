import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form';
import { useState } from 'react';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/api';
import CountryCide from "../../data/countrycode.json"

const ContactFrom = () => {
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit,reset, formState: {errors,isSubmitSuccessFul}} = useForm();
    useEffect(() => {
        if(isSubmitSuccessFul){
            reset({
                name:"",
                email:"",
                subject:"",
                phoneNo:"",
                message:""
            });
        }
    }
    , [isSubmitSuccessFul,reset])
    const submitContactForm= async (data) => {
        console.log("data",data);
        // try {
        //     setLoading(true);
        //     const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data)
        //     console.log("response",response);
        //     setLoading(false);

        // } catch (error) {
        //     console.log("error",error);
        //     setLoading(false);

        // }

    }
  return (

    <div className='mb-[10px] flex flex-col justify-center items-center '>
         <div name='contact' className='w-[700px] h-screen flex justify-center items-center p-4'>
    <div className='text-white mx-auto w-11/12'>
       <div className='max-w-[1000px] mt-[50px]  p-4 flex flex-col justify-center w-full h-full'>
              
              <p className='text-[35px] heading font-bold inline border-b-4 border-[#000000] text-white pb-[1px]'>Get in Touch</p>
              <p className='text-white py-2 text-start text-[17px] -pb-[100px]'>
                 We are here to answer any questions you may have about our platform. Reach out to us and we'll respond as soon as we can.
              </p>
          </div>   

      {/* Using react-hook-form */}

      <form onSubmit={handleSubmit(submitContactForm)} className='max-w-[700px] flex flex-col h-full'>
        <div className='flex items-center gap-5'>
          <label htmlFor="name" className='block text-sm font-medium text-gray-300'>Name</label>
          <input type="text" id="name" placeholder='Enter first name' {...register("name", { required: true })}  className='bg-[#164154] text-[#fff] p-2 my-2 rounded-lg w-[600px]' />
          {errors.name && <span className='text-red-500 text-sm'>Name is required</span>}
        </div>
        <div className='flex items-center gap-5'>
          <label htmlFor="email" className='block text-sm font-medium text-gray-300'>Email</label>
          <input type="email" id="email" placeholder='Enter email' {...register("email", { required: true })}  className='bg-[#164154] text-[#fff] p-2 my-2 rounded-lg w-[600px]' />
          {errors.email && <span className='text-red-500 text-sm'>Email is required</span>}
        </div>
        <div className='flex items-center gap-5'>
          <label htmlFor="subject" className='block text-sm font-medium text-gray-300'>Subject</label>
          <input type="text" id="subject" placeholder='Enter subject' {...register("subject", { required: true })}  className='bg-[#164154] text-[#fff] p-2 my-2 w-[600px] rounded-lg' />
          {errors.subject && <span className='text-red-500 text-sm'>Subject is required</span>}
        </div>

        {/* //phone no */}

        <div className='flex gap-2'>
          <label htmlFor="phoneNo">Phone No</label>
          <div className='flex flex-row gap-5'>
            {/* Dropdown */}
            {/* <div className='flex gap-5 lg:w-[80px]'>
              <select
                name="countrycode"
                id="countrycode"
                {...register("countrycode", { required: true })}
                className='form-select w-[80px] text-black'
              >
                {CountryCide.map((country, index) => (
                  <option key={index} value={country.dial_code} className='text-black' >
                  {country.name} 
                  </option>
                ))}
              </select>
            </div> */}
            {/* Phone number input */}
            <div className='flex items-center gap-5'>
              <input
                type="text"
                id="phoneNo"
                placeholder='Enter phone no'
                {...register("phoneNo", { required: true })}
                className='bg-[#164154] w-[550px] text-[#fff] p-2 my-2 rounded-lg'
              />
              {errors.phoneNo && <span className='text-red-500 text-sm'>Phone no is required</span>}
            </div>
          </div>
        </div>

        <div className='flex items-center gap-5'>
          <label htmlFor="message" className='block text-sm font-medium text-gray-300'>Message</label>
          <textarea type="text" id="message" cols={30} rows={7} placeholder='Enter message' {...register("message", { required: true })}   className='bg-[#164154] w-[600px] text-[#fff] p-2 my-2 rounded-lg'/>
          {errors.message && <span className='text-red-500 text-sm'>Message is required</span>}
        </div>
        <div className='flex justify-center items-center mt-[50px]'>
          <button type="submit" disabled={loading} className='bg-yellow-300 text-white py-2 px-4 rounded-md hover:bg-yellow-400 focus:outline-none focus:shadow-outline-yellow flex justify-center items-center  active:bg-yellow-400'>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  </div>
    </div>
  );
};

export default ContactFrom
