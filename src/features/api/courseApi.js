import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const courseBaseApi = "https://backendc-1-qq4i.onrender.com/api/v1/course";
const courseBaseApi = "http://localhost:3000/api/v1/course"; 

export const courseApi = createApi({
  reducerPath: "courseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: courseBaseApi,
    credentials: "include",
  }),

  endpoints: (builder) => ({

    CreateCourse: builder.mutation({
      query: (inputData) => ({
        url: "/",
        method: "POST",
        body: inputData,
      }),
    }),

    GetCourse: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    
    FetchEditCourse:builder.query({
      query:(courseId)=>({
        url:`/fetchEditCourse/${courseId}`,
        method:"GET"
      })
    })
,
    EditCourse:builder.mutation({
      query:({inputData,courseId})=>({
        url:`/${courseId}`,
        method:"PUT",
        body:inputData,
      })
    }),

    DeleteCourse:builder.mutation({
      query:({courseId})=>({
        url:`/deletecourse/${courseId}`,
        method:"DELETE"
      })
    }),

    CreateLecture:builder.mutation({
      query:({inputData,courseId})=>({
        url:`/${courseId}/createLecture`,
        method:"POST",
        body:inputData,
      })
    }),

    GetLecture:builder.query({
      query:(courseId)=>({
        url:`/${courseId}/getLecture`,
        method:"GET"
      })
    }),

   GetLectureDataFormParticularCourse:builder.query({
    query:(lectureId)=>({
      url:`/lecture/${lectureId}`,
      method:"GET"
    })
   }),

   UpdateLecture:builder.mutation({
    query:({inputData,courseId,lectureId})=>({
      url:`/${courseId}/course/${lectureId}/lecture`,
      method:"PUT",
      body:inputData,
    })
  }),

  DeleteLecture:builder.mutation({
    query:(lectureId)=>({
      url:`/lecture/${lectureId}`,
      method:"DELETE",
    })
  }),

  PublishCourse:builder.mutation({
    query:({courseId,query})=>({
      url:`/${courseId}?publish=${query}`,
      method:"PATCH",
    })
  }),

  GetPublishCourses:builder.query({
    query:()=>({
      url:"/getPublishCourses",
      method:"GET",
    })
  }),

    

  GetSerachCourse:builder.query({
    query:({searchquery,categories,sortByPrice})=>{
      let queryString = `/search?query=${encodeURIComponent(searchquery)}`;
      
      if(categories && categories.length >0){
        const categoriesString=categories.map(encodeURIComponent).join(',');
        queryString+=`&categories=${encodeURIComponent(categoriesString)}`
      }
       
      //Append Sort By Pass If Available

      if(sortByPrice){
        queryString+=`&sortByPrice=${encodeURIComponent(sortByPrice)}`
      }

      return {
        url: queryString,
        method: "GET",
      }
    }
  })




  }),
});

export const { useCreateCourseMutation, 
  useGetSerachCourseQuery,
  useGetCourseQuery,
  useEditCourseMutation,
useFetchEditCourseQuery,
useCreateLectureMutation,
useGetLectureDataFormParticularCourseQuery,
useGetLectureQuery,
useUpdateLectureMutation,
useDeleteLectureMutation,
usePublishCourseMutation,
useGetPublishCoursesQuery,
useDeleteCourseMutation } = courseApi;
