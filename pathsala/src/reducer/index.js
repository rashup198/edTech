import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import cartReducer from '../slices/cartSlice';


const rootReducer = combineReducers({

    profile:profileReducer,
    cart:cartReducer,
    auth:authReducer,



});


export default rootReducer;
