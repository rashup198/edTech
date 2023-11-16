import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div>
      <div className="">
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>

        <div className=" ">
            <IconBtn onClick={modalData?.btn1Handler} text={modalData.btn1Text} customClasses="bg-red-500 text-white"/>

            <button onClick={modalData?.btn2Handler}>
                {modalData.btn2Text}
            </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
