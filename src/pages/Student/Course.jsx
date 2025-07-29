import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom";
function Course({index,course}) {

  return (
    <Link to={`/CourseDetail/${course._id}`}>
      <Card className="overflow-hidden mb-3 rounded-lg dark:shadow-lg dark:shadow-white bg-white dark:bg-gray-800  shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative ">
        <img
          className="w-full h-44 "
          // eslint-disable-next-line react/prop-types
          src={course?.courseThumbnail } >
          </img>
      </div>
      <CardContent>
        <h1  className="hover:underline hover:cursor-pointer  font-bold text-lg  mt-2 truncate">
          {course?.courseTitle}
        </h1>
        <div className="flex mt-2  justify-between items-center ">
          <div className="flex items-center  gap-2">
            <Avatar className="h-8 w-8 rounded-md  overflow-hidden mt-2 ">
              <AvatarImage className="w-full h-full object-cover" src={course.creator.photoURL || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium  whitespace-nowrap mt-1">{course.creator.name}</h1>
          </div>
          <div>
            <Badge className="bg-blue-500  ml-16 mt-2 px-3 py-1">{course.courseLevel}</Badge>
          </div>
        </div>
        <div className="font-mono text-lg font-bold text-green-500 mt-2"><span>{course.coursePrice} ₹ </span></div>
      </CardContent>
    </Card>
    </Link>
    
  );
}


export default Course;
