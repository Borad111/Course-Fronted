import BuyCoursePurchase from "@/components/BuyCoursePurchase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailsWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import { CardFooter } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function CourseDetail() {
  const PurchaseCourse = false;
  const { courseId } = useParams();
  const navigate=useNavigate();
  const { data, refetch, isError, isLoading, isSuccess } =
    useGetCourseDetailsWithStatusQuery(courseId);

  const course = data?.course;
  const status = data?.status;

  const HandleContinueCourse=()=>{
     navigate(`/course-progress/${courseId}`)
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    toast.error(isError.data?.message || "Error in Frountend Of Course Detail");
  }
  return (
 <div className="mt-16">
  {/* Course Header Section */}
  <div className="bg-[#2D2F31] text-white">
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col gap-2">
      <h1 className="font-bold text-2xl md:text-3xl">
        {course?.courseTitle}
      </h1>
      <p className="text-base md:text-lg">{course?.subTitle}</p>
      <p>
        Created By{" "}
        <span className="text-[#C0C4FC]"> {course?.creator.name}</span>
      </p>
      <div className="flex gap-2 items-center">
        <BadgeInfo size={20} className="mt-1" />
        <p>Last Update {course?.createdAt.split("T")[0]}</p>
      </div>
      <div>
        <p>Student Enroll {course?.enrolledStudent.length}</p>
      </div>
    </div>
  </div>

  {/* Main Content Section */}
  <div className="max-w-7xl mx-auto my-5 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
      {/* Left Column - Description & Lectures */}
      <div className="w-full lg:w-1/2 space-y-5">
        <h1 className="font-bold text-xl md:text-2xl">Description</h1>
        <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: course?.description }} />
        
        <Card className="border-white dark:shadow-md dark:shadow-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Course Content
            </CardTitle>
            <CardDescription className="text-sm">
              {course?.lectures.length} Lecture{course?.lectures.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {course?.lectures?.map((data, index) => (
              <div key={index} className="flex gap-2 items-center">
                <span>
                  {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                </span>
                <p className="text-sm sm:text-base">{data?.lectureTitle}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Video Player */}
      <div className="w-full lg:w-1/2">
        <Card className="dark:border-white dark:shadow-md dark:shadow-white">
          <CardContent className="p-4 flex flex-col">
            <div className="w-full aspect-video mb-4">
              <ReactPlayer
                width="100%"
                height="100%"
                controls={true}
                url={course?.lectures[0]?.vidioUrl}
              />
            </div>
            <h1 className="font-semibold text-sm sm:text-base">
              {course?.lectures[0]?.lectureTitle || "Introduction"}
            </h1>
            <Separator className="my-2" />
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-4 sm:mx-5 my-2">
            <h1 className="text-lg sm:text-xl text-green-500 font-semibold">
              Price: {course?.coursePrice} ₹
            </h1>

            {status ? (
              <Button 
                onClick={HandleContinueCourse} 
                className="bg-green-700 text-white border hover:border-black transition-all hover:scale-105 hover:duration-300 hover:bg-green-600 w-full sm:w-auto"
              >
                Continue Course
              </Button>
            ) : (
              <div className="w-full sm:w-auto">
                <BuyCoursePurchase courseId={courseId} />
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</div>
  );
}

export default CourseDetail;
