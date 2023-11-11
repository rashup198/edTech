import {createSlice} from '@reduxjs/toolkit';

//initial state

const initialState = {
    user:null
}

//create slice
const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
        setUser(state, value)
        {
            state.token=value.payload;
        }
    }
})  

//export actions

export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;