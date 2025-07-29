import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateLectureMutation, useGetLectureQuery } from "@/features/api/courseApi";
import { toast } from "sonner";
import Lecture from "./Lecture";
const CreateLecture = () => {

  const [lectureTitle, SetLectureTitle] = useState("");
  const navigate=useNavigate();
  const {courseId}=useParams();
  // const isLoading = false;

  const [CreateLecture,{data,isError,isSuccess,isLoading}]=useCreateLectureMutation();
  const {data:LectureData,refetch,isError:LectureError,isLoading:LectureLoading,isSuccess:LectureSuccess}=useGetLectureQuery(courseId);



  useEffect(()=>{
    refetch();
  },[refetch])
  
  useEffect(()=>{
    if(data && isSuccess){
      toast.success(data.message || "Lecture Created successfully")
      refetch();
    }
    if(isError){
      toast.error(isError.data?.message || "Error in FrontEnd of Create Lecture ")
    }
  },[data,isSuccess,isError])



  console.log(LectureData)
  const ChangeHandler=(e)=>{
    const {value}=e.target;
    SetLectureTitle(value);
  }


  const CreateLactureHandler=async()=>{
    await CreateLecture({inputData:{lectureTitle},courseId})
  }

  if(LectureLoading){
    return  <div className="spinner ml-[50%] mt-[20%] w-12 h-12 border-t-2 border-black rounded-full  animate-spin"></div>
  }

  return (
   <div className="p-4 md:ml-[250px] mt-10 md:mt-0 flex-1"> {/* Adjusted padding and margin */}
  <div className="mb-4">
    <h1 className="font-bold text-xl md:text-2xl"> {/* Adjusted font size for larger screens */}
      Let's Add Lecture, add some basic Details For Your new Course{" "}
    </h1>
    <p className="text-sm md:text-base">Lecture is Created by UnAcdamy University And PysicsWala College</p> {/* Adjusted font size */}
  </div>

  <div className="mt-10">
    <div className="mb-6"> {/* Added margin-bottom for spacing */}
      <label className="my-3 font-semibold block">Lecture Title :</label> {/* Added block to label */}
      <Input
        className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%]" 
        type="text"
        placeholder="Lecture Title"
        name="LectureTitle"
        value={lectureTitle}
        onChange={ChangeHandler}
        required
      />
    </div>

    <div className="mt-6 flex flex-col sm:flex-row gap-2"> {/* Changed to flex-col on small screens */}
      <Button variant="outline" onClick={()=>navigate(`/admin/course/${courseId}`)} className="border border-black w-full sm:w-auto"> {/* Full width on small screens */}
        Back to Course
      </Button>
      <Button onClick={CreateLactureHandler} className="mx-0 sm:mx-3 mt-2 sm:mt-0 w-full sm:w-auto">{/* Adjusted margins and width */}
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2" /> Please wait
          </>
        ) : (
          "Create Lecture"
        )}
      </Button>
    </div>

    {/* Lecture List Section */}
    <div className="mt-10">
        {
          LectureLoading ? (
            <div className="flex justify-center items-center h-24"> {/* Centered loading spinner */}
              <Loader2 className="animate-spin text-4xl" />
            </div>
          ) : LectureData?.lectures.length === 0 ?
          (
            <h2 className="text-center text-gray-600 dark:text-gray-400">No Lectures added yet.</h2> 
          ) : (
            LectureData?.lectures.map((lecture,index)=>(
              <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index}/>
            ))
          )
        }
    </div>
  </div>
</div>
  );
};

export default CreateLecture;
