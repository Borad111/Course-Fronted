import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const PurchasebaseApi="https://backendc-1-qq4i.onrender.com/api/v1/purchase";
const PurchasebaseApi="http://localhost:3000/api/v1/purchase";

export const purchaseApi=createApi({
    reducerPath:"purchaseApi",

    baseQuery:fetchBaseQuery({
        baseUrl:PurchasebaseApi,
        credentials:'include'
    }),

    endpoints:(builder)=>({

        queryCheckOutSession:builder.mutation({
            query:(courseId)=>({
                url:"/checkout/create-checkout-session",
                method:"post",
                body:{courseId}
            })
        }),

        getCourseDetailsWithStatus:builder.query({
            query:(courseId)=>({
                url:`/course/${courseId}/detail-with-status`,
                method:"GET"
            })
        }),

        getPurchaseCourse:builder.query({
            query:()=>({
                url:"/",
                method:"GET",
            })
        })
    })
})


export const {useQueryCheckOutSessionMutation,
    useGetCourseDetailsWithStatusQuery,
    useGetPurchaseCourseQuery
}=purchaseApi;