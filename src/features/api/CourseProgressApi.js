import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const CourseProgressBaseURL="https://backendc-1-qq4i.onrender.com/api/v1/courseProgress";
const CourseProgressBaseURL=`${import.meta.env.VITE_BASE_URL}/api/v1/courseProgress`;

export const CourseProgressApi=createApi({
    reducerPath:"CourseProgressApi",
    
    baseQuery:fetchBaseQuery({
        baseUrl:CourseProgressBaseURL,
        credentials:'include'
    }),

    endpoints: (builder) => ({

        getCourseProgress:builder.query({
            query:(courseId)=>({
                url:`/${courseId}`,
                method:"get"
            })
        }),

        UpdateLectureProgress:builder.mutation({
            query:({courseId,lectureId})=>({
                url:`/${courseId}/lecture/${lectureId}/view`,
                method:"post"
            })
        }),

        CompleteCourse:builder.mutation({
            query:(courseId)=>({
                url:`/${courseId}/complete`,
                method:"post"
            })
        }),

        InCompleteCourse:builder.mutation({
            query:(courseId)=>({
                url:`/${courseId}/Incomplete`,
                method:"post"
            })
        })
    })
})

export const {useGetCourseProgressQuery
    ,useCompleteCourseMutation,
    useInCompleteCourseMutation,
    useUpdateLectureProgressMutation
    
}=CourseProgressApi