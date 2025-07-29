import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from "@/features/api/CourseProgressApi";
import { CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CardTitle } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CourseProgress() {
  // const isCompleted = true;
  const { courseId } = useParams();

  const [CurrentLecture, SetCurrentLecture] = useState(null);

  const { isLoading, isSuccess, data, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  
  const [UpdateLectureProgress,{data:UpdateData,isError:updateError,isLoading:updateLoading,isSuccess:updateSuccess }]=useUpdateLectureProgressMutation();

  const[CompleteCourse,{data:completeData,isSuccess:successData,isError:completeError}]=useCompleteCourseMutation();
  const[InCompleteCourse,{data:IncompleteData,isSuccess:IncompleteSuccess,isError:IncompleteError} ]=useInCompleteCourseMutation();

 
  useEffect(() => {
    if (courseId) {
      console.log(courseId);  // Check courseId
      refetch();  // Only refetch if courseId exists
    }else{
      console.log("Course Id Not get")
    }
  },[courseId]);

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const { CourseDetail, progress, completed } = data?.data || {};
  const { courseTitle } = CourseDetail;
  const { lectures } = CourseDetail;
  const initialLecture = CurrentLecture || lectures[0];

  const isLectureCompleted = (lectureId) => {
    return progress.some(
      (prog) => prog?.lectureId === lectureId && prog?.viewed
    );
  };

  const handleSelectLecture=(lecture)=>{
    SetCurrentLecture(lecture);
  }

  const HandleLectureProgress=async(lectureId)=>{
    await UpdateLectureProgress({courseId,lectureId});
    refetch();
  }

  const HandleCompleteCourse=async()=>{
    await CompleteCourse(courseId);
    refetch();
  }

  const HandleInCompleteCourse=async()=>{
    await InCompleteCourse(courseId);
    refetch();
  }
  return (
<div className="max-w-7xl mx-auto p-4 sm:p-6 mt-8 sm:mt-16">
  {/* Header Section */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
    <h1 className="text-xl sm:text-2xl mt-7 font-bold">{courseTitle}</h1>
    {completed && (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-10">
        <h2 className="text-green-500 font-semibold text-sm sm:text-base">
          Course Completed Watch
        </h2>
        <Button 
          onClick={HandleInCompleteCourse}
          className="w-full sm:w-auto"
        >
          Mark As Incomplete
        </Button>
      </div>
    )}
  </div>

  {/* Main Content Section */}
  <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[70vh]">
    {/* Video Player Section */}
    <div className="w-full lg:w-2/3 h-full">
      <div className="dark:shadow-lg dark:shadow-white rounded-lg shadow-lg p-2 sm:p-4 h-full">
        <div className="aspect-video w-full">
          <video
            src={CurrentLecture?.vidioUrl || initialLecture?.vidioUrl}
            className="w-full h-full object-cover rounded-lg"
            controls
            onEnded={() => HandleLectureProgress(CurrentLecture?._id || initialLecture?._id)}
          />
        </div>
        <h3 className="text-lg sm:text-xl ml-2 sm:ml-5 mt-3 sm:mt-5 pb-3 sm:pb-5 font-semibold">
          {`Lecture ${
            CourseDetail.lectures.findIndex(
              (lec) => lec._id === (CurrentLecture?._id || initialLecture?._id)
            ) + 1
          } : ${CurrentLecture?.lectureTitle || initialLecture?.lectureTitle}`}
        </h3>
      </div>
    </div>

    {/* Lecture List Section */}
    <div className="w-full lg:w-1/3 border-t-2 lg:border-t-0 lg:border-l-2 border-gray-200 dark:border-gray-700 lg:pl-5 pt-4 lg:pt-0">
      <h2 className="text-lg sm:text-xl font-semibold">Course Lectures</h2>
      <div className="mt-3 sm:mt-5 overflow-y-auto max-h-[60vh] pr-2">
        {lectures.map((lecture, index) => (
          <Card
            key={index}
            className={`mb-3 hover:cursor-pointer transition ${lecture?._id === CurrentLecture?._id 
              ? "bg-gray-300 dark:bg-gray-700" 
              : "bg-gray-100 dark:bg-gray-800"}`}
            onClick={() => handleSelectLecture(lecture)}
          >
            <CardContent className="flex items-center p-3 sm:p-6">
              <div className="flex items-center">
                {isLectureCompleted(lecture._id) ? (
                  <CheckCircle2 size={20} className="text-green-600" />
                ) : (
                  <CirclePlay size={20} className="text-gray-600" />
                )}
              </div>
              <div className="flex-1 ml-3">
                <CardTitle className="text-sm sm:text-base font-semibold line-clamp-2">
                  {lecture.lectureTitle}
                </CardTitle>
              </div>
              {isLectureCompleted(lecture._id) && (
                <Badge
                  variant={"outline"}
                  className="bg-green-600 hover:bg-green-600 text-white ml-2 text-xs sm:text-sm"
                >
                  Completed
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
</div>
  );
}
