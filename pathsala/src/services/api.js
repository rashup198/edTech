const BASE_URL = process.env.REACT_APP_BASE_URL;


//auth api
export const endpoints = {
    SENDOTP_API:"http://localhost:5000/api/v1/auth/sendotp",
    SIGNUP_API:"http://localhost:5000/api/v1/auth/signup",
    LOGIN_API: "http://localhost:5000/api/v1/auth/login",
    RESETPASSTOKEN_API: "http://localhost:5000/api/v1/auth/resetPasswordToken",
    RESETPASSWORD_API:"http://localhost:5000/api/v1/auth/resetPassword",
  };

  //profile api
  export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profil/getEnrolledCourses",
  }

  //course api

export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
}

//student api
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  }

  // rating api

export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getAllRatingAndReview",
}

// CATAGORIES API
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  }
  
// contact us api
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
  }
  
  //settings api
  export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  }