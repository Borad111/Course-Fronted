import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { AlertCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSerachCourseQuery } from "@/features/api/courseApi";

function SearchPage() {
  // const isLoading = false;
  const [searchParams]=useSearchParams();
  const query=searchParams.get('query');
  const [selectedCategories,SetSelectedCategories]=useState([]);
  const [selectedSortBy, setSelectedSortBy]=useState("");
  const {data,isError,isSuccess,isLoading}=useGetSerachCourseQuery({searchquery:query,categories:selectedCategories,sortByPrice:selectedSortBy});
                          
  if(isLoading){
    return "Loding";
  }

  const course=data?.courses;

  const courseEmpty=!isLoading && data?.courses?.length==0;
  const handlefilerChange=(categories,price)=>{
    SetSelectedCategories(categories);
    setSelectedSortBy(price);
  }
  return (
    <div className="max-w-7xl mx-auto p-4 mt-14 ">
      <div className="my-6">
        <p className="mt-2 font-bold ">
          Showing result for 
          <span className="text-blue-800 text-2xl ">  "{query}"</span>
        </p>
      </div>
      <div className="flex  justify-between ">
          <div>
            <Filter handlefilerChange={handlefilerChange} />
          </div>
          <div className="flex-1 ml-20 ">
          {isLoading ? (
          <>
            {Array.from({ length: 3 }).map(() => (
              // eslint-disable-next-line react/jsx-key
              <CourseSkeleton/>
            ))}
          </>
          ) : courseEmpty ? (
          <>
          {
            <CourseNotFound />
          }
          </>
          ) : (
          <>
            {course.map((data, index) => (
              <SearchResult course={data}   key={index} />
            ))}
          </>
          ) }
          </div>
      </div>
    </div>
  );
}

export default SearchPage;


const CourseNotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6">
        <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
        <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
          Course Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Sorry, we couldn't find the course you're looking for.
        </p>
        <Link to="/" className="italic">
          <Button variant="link">Browse All Courses</Button>
        </Link>
      </div>
    );
  };
  
  const CourseSkeleton = () => {
    return (
      <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 py-4">
        <div className="h-32 w-full md:w-64">
          <Skeleton className="h-full w-full object-cover" />
        </div>
  
        <div className="flex flex-col gap-2 flex-1 px-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-1/3" />
          </div>
          <Skeleton className="h-6 w-20 mt-2" />
        </div>
  
        <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
          <Skeleton className="h-6 w-12" />
        </div>
      </div>
    );
  };