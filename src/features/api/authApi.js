import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userLoggedIn, userLoggedOut } from "../authSlice";
// import { build } from "vite";

// const userApi="https://backendc-1-qq4i.onrender.com/api/v1/user/"
const userApi=`${import.meta.env.VITE_BASE_URL}/api/v1/user/`

export  const authApi=createApi({
    reducerPath:"authApi",

    baseQuery:fetchBaseQuery({
        baseUrl:userApi,
        credentials:'include'
    }),

    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(inputData)=>({
                url:"registration",
                method:"POST",
                body:inputData,
            })
        }),
        loginUser:builder.mutation({
            query:(inputData)=>({
                url:"login",
                method:"POST",
                body:inputData,
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const result=await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}))
                }catch(error){
                    console.log(error);
                }
            }
        }),
        loadUser:builder.query({
            query:()=>({
                url:"profile",
                method:"GET"
            }),
        
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const result=await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}))
                }catch(error){
                    console.log(error);
                }
            }
        }),
        UpdateUser:builder.mutation({
            query:(formdata)=>({
                url:"profile/update",
                method:"PUT",
                body:formdata,
                credentials:"include"
            })
        }),
        UserLogout:builder.mutation({
            query:()=>({
                url:"logout",
                method:"POST",
            }),
            async onQueryStarted(arg,{dispatch}){
                try{
                    dispatch(userLoggedOut())
                }catch(error){
                    console.log(error);
                }
            }
        })
    })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation,
    useUserLogoutMutation
}=authApi