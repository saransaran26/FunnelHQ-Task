import { createSlice } from "@reduxjs/toolkit";

const Userslice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    getUser : (state,action) => {
        state.users = action.payload.map(user => {
            return {id:user._id,name:user.name,email:user.email,age:user.age}
        })
    },
    createUser : (state,action) => {
        state.users.push(action.payload)
    },
    updateUser : (state,action) => {
        const index = state.users.findIndex(e => e.id === action.payload.id)
        state.users[index] = {
            id:action.payload.id,
            name:action.payload.name,
            email:action.payload.email,
            age:action.payload.age,
        }
    },
    deleteUser : (state,action) => {
        const id = action.payload.id
        state.users = state.users.filter(u => u.id !== id)
    }
  },
});

export const {getUser,createUser,updateUser,deleteUser} = Userslice.actions;
export default Userslice.reducer;
