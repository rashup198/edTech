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
    <div className='text-white max-w-md mx-auto'>
      <h1 className='text-2xl font-semibold mb-4'>Get in Touch</h1>
      <p className='mb-6'>
        We are here to answer any questions you may have about our platform. Reach out to us, and we'll respond as soon as we can.
      </p>

      {/* Using react-hook-form */}

      <form onSubmit={handleSubmit(submitContactForm)} className='space-y-4'>
        <div>
          <label htmlFor="name" className='block text-sm font-medium text-gray-300'>Name</label>
          <input type="text" id="name" placeholder='Enter first name' {...register("name", { required: true })} className='form-input' />
          {errors.name && <span className='text-red-500 text-sm'>Name is required</span>}
        </div>
        <div>
          <label htmlFor="email" className='block text-sm font-medium text-gray-300'>Email</label>
          <input type="email" id="email" placeholder='Enter email' {...register("email", { required: true })} className='form-input' />
          {errors.email && <span className='text-red-500 text-sm'>Email is required</span>}
        </div>
        <div>
          <label htmlFor="subject" className='block text-sm font-medium text-gray-300'>Subject</label>
          <input type="text" id="subject" placeholder='Enter subject' {...register("subject", { required: true })} className='form-input' />
          {errors.subject && <span className='text-red-500 text-sm'>Subject is required</span>}
        </div>

        {/* //phone no */}

        <div className='flex flex-col gap-2'>
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
            <div className='flex-grow'>
              <input
                type="text"
                id="phoneNo"
                placeholder='Enter phone no'
                {...register("phoneNo", { required: true })}
                className='form-input text-black'
              />
              {errors.phoneNo && <span className='text-red-500 text-sm'>Phone no is required</span>}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="message" className='block text-sm font-medium text-gray-300'>Message</label>
          <textarea type="text" id="message" cols={30} rows={7} placeholder='Enter message' {...register("message", { required: true })} className='form-input text-black' />
          {errors.message && <span className='text-red-500 text-sm'>Message is required</span>}
        </div>
        <div>
          <button type="submit" disabled={loading} className='bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow active:bg-yellow-700'>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactFrom
