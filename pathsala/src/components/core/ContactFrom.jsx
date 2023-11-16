import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/api"


const ContactFrom = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      // console.log("Email Res - ", res)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

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

        <div className="flex flex-col gap-2 text-black">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} -{ele.country}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
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
