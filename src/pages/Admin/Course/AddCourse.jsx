import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";
function AddCourse() {
  const navigate=useNavigate();
  // const isLoading=false;
  const [courseTitle,SetCourseTitle]=useState("");
  const [category,SetCategory]=useState("");

  const [CreateCourse,{data,isLoading,isError,isSuccess}]=useCreateCourseMutation();

  const GetValue=(value,type)=>{
        if(type==="course")
        {
          SetCourseTitle(value);
        }
        else
        {
          SetCategory(value);
        }
  }

  const CreateCourseHandler=async()=>{
    const courseData={courseTitle,category};
    try {
      const responce=await CreateCourse(courseData).unwrap();
      console.log("successFullly",responce);
    } catch (error) {
      console.log("error ",error)
    }
  }

  useEffect(()=>{
    if(isSuccess && data){
      toast(data.message || "successFullly Add Course ")
      navigate("/admin/course")
    }
    if(isError){
      toast(isError.data?.message || " UnSuccessfully ")
    }
  },[data,isError,isSuccess])
  return (
   <div className="p-4 md:ml-[250px] mt-10 md:mt-0"> {/* Adjusted padding and margin */}
  <div className="mb-4">
    <h1 className="font-bold text-xl md:text-2xl"> {/* Adjusted font size for larger screens */}
      Let's Add course, add some basic Details For Your new Course{" "}
    </h1>
    <p className="text-sm md:text-base">Course is Created by UnAcdamy University And PysicsWala College</p> {/* Adjusted font size */}
  </div>
  <div className="mt-10">
    <div className="mb-4"> {/* Added margin-bottom for spacing */}
      <Label className="my-3 font-semibold block">Title :</Label> {/* Added block to label */}
      <Input
        className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%]" 
        type="text"
        placeholder="Course Title"
        name="courseTitle"
        value={courseTitle}
        required
        onChange={(e)=>GetValue(e.target.value,"course")}
      />
    </div>
    <div className="mt-3 mb-4"> {/* Added margin-bottom for spacing */}
      <Label className="my-3 font-semibold block">Category :</Label> {/* Added block to label */}
      <Select onValueChange={(value)=>GetValue(value,"category")}>
        <SelectTrigger className="w-full sm:w-[180px]"> {/* Full width on small, fixed on sm+ */}
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent >
          <SelectGroup required name="category">
            <SelectLabel>Language</SelectLabel>
            <SelectItem value="NextJs">Next Js</SelectItem>
            <SelectItem value="NodeJs">Node Js</SelectItem>
            <SelectItem value="ReactJs">React Js</SelectItem>
            <SelectItem value="DataScience">Data Science</SelectItem>
            <SelectItem value="MarnStack">Marn Stack</SelectItem>
            <SelectItem value="JavaAndroid">Java Android</SelectItem> {/* Corrected typo: MarnStack -> JavaAndroid */}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div className="mt-6 flex flex-col sm:flex-row gap-2"> {/* Changed to flex-col on small screens */}
      <Button onClick={()=>navigate('/admin/course')} variant="outline" className="border border-black w-full sm:w-auto"> {/* Full width on small screens */}
        Back
      </Button>
      <Button disabled={isLoading} onClick={CreateCourseHandler} className="mx-0 sm:mx-3 mt-2 sm:mt-0 w-full sm:w-auto">{/* Adjusted margins and width */}
        {
          isLoading ? (
            <>
            <Loader2 className="animate-spin mr-2"/> Please wait
            </>
          ): (
            "Create"
          )
        }
      </Button>
    </div>
  </div>
</div>
  );
}

export default AddCourse;
