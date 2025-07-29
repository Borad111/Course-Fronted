import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import React from "react";

import { Link } from "react-router-dom";

function SearchResult({course}) {
  return (
<Card className="mb-4 dark:shadow-lg dark:shadow-white w-full mx-2 sm:mx-0">
  <div className="flex flex-col sm:flex-row p-4 sm:p-6 gap-4">
    {/* Course Thumbnail - Perfectly responsive with spacing */}
    <Link 
      to={`/CourseDetail/${course._id}`} 
      className="sm:h-32 sm:w-64 w-full h-48 flex-shrink-0"
    >
      <img
        className="object-cover h-full w-full rounded-lg"
        src={course?.courseThumbnail}
        alt="Course Thumbnail"
      />
    </Link>

    {/* Course Info - Optimized spacing */}
    <div className="flex-1 sm:ml-4 space-y-2">
      <h3 className="text-lg sm:text-xl dark:text-white font-semibold text-gray-800">
        {course?.courseTitle}
      </h3>
      
      <p className="text-sm sm:text-base dark:text-gray-300 text-gray-600 line-clamp-2">
        {course?.subTitle}
      </p>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 pt-1">
        <p className="text-sm sm:text-base">
          Instructor: <span className="font-semibold">{course?.creator?.name}</span>
        </p>
        <Badge className="bg-green-500 w-fit">{course?.courseLevel}</Badge>
      </div>
      
      <div className="pt-2 text-right sm:text-left">
        <span className="text-lg sm:text-xl font-bold text-green-600">
          {course?.coursePrice} ₹
        </span>
      </div>
    </div>
  </div>
</Card>

  );
}

export default SearchResult;
