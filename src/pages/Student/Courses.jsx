// import { Skeleton } from "@/components/ui/skeleton";
import  { useEffect } from "react";
import Course from "./Course";
import CourseSkeleton from "./CourseSkeleton";
import {  useGetPublishCoursesQuery } from "@/features/api/courseApi";
import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

function Courses() {

  const {
  data,
  isError,
  isLoading,
  refetch,
} = useGetPublishCoursesQuery(undefined, {
  pollingInterval: 5000, // refresh every 5 seconds
});
 
  if(isError){
    toast.error(isError?.data?.message || "Error is Occured")
  }
  if(isLoading){
    return (
      <div className="spinner ml-[50%] mt-[10%] w-12 h-12 border-t-2 dark:border-white border-black rounded-full  animate-spin"></div>
    );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  
  return (
    <div  className="light:bg-gray-50 ">
      <div  className="mx-auto   max-w-7xl p-3">
        <h1  className="font-bold text-3xl text-center">Our Courses</h1>
       <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-6 md:px-0 w-full max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-3rem)] md:max-w-full mx-auto">
  {isLoading ? (
    Array.from({ length: 8 }).map((_, index) => (
      <CourseSkeleton key={index} />
    ))
  ) : (
    data?.courses?.map((course, index) => (
      <Course key={index} course={course} />
    ))
  )}
</div>
      </div>
    </div>
  );
}

export default Courses;


