import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";

function CourseTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError,refetch } = useGetCourseQuery();
  console.log(data);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading && isError) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !data.courses) {
    return <div></div>;
  } 

 
   

  return (
<div className="p-4 md:ml-[250px] mt-10 md:mt-0"> {/* Adjusted padding and margin for responsiveness */}
  <Button onClick={() => navigate("/admin/course/addcourse")}>
    Add Course
  </Button>
  
  {/* Add a responsive wrapper for horizontal scrolling */}
  <div className="overflow-x-auto"> 
    <Table className="mt-9 min-w-full md:min-w-0"> {/* min-w-full ensures it takes full width for scrolling */}
      <TableCaption>A list of your Course</TableCaption>
      <TableHeader className="font-bold">
        <TableRow className="border border-t-black border-b-black">
          <TableHead className="font-black font-extraboldbold">
            Title
          </TableHead>
          <TableHead className="w-[100px] font-black font-extraboldbold">
            Price
          </TableHead>
          <TableHead className="font-black font-extraboldbold">
            Status
          </TableHead>
          <TableHead className="text-center font-black font-extraboldbold ">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Check if data and courses exist before mapping */}
        {data && data.courses && data.courses.map((course, index) => (
          <TableRow key={index}>
            <TableCell>{course?.courseTitle}</TableCell>
            <TableCell className="font-medium">
              {course?.coursePrice}
            </TableCell>
            <TableCell>
              <Badge className={` ${course?.isPublished ? "bg-green-600 text-white" : "bg-red-600 text-white"} `}>{course.isPublished ? "isPublished" : "UnPublished "}</Badge>
            </TableCell>
            <TableCell className="text-center">
              <Button
                size="sm"
                onClick={()=>navigate(`/admin/course/${course._id}`)}
                className="hover:bg-white hover:text-black hover:border transition hover:duration-500 hover:border-black"
              >
                {/* Assuming <Edit /> is an icon component */}
                <Edit /> 
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</div>
  );
}

export default CourseTable;
