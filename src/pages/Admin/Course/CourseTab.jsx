import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCourseMutation,
  useEditCourseMutation,
  useFetchEditCourseQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { toast } from "sonner";
function CourseTab() {
  const [input, SetInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
    enrolledStudent: "",
    isPublished:""
  });

  const [previewThumbnail, SetpreviewThumbnail] = useState();
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const {
    data: updateData,
    isLoading: updateLoading,
    isError: updateError,
    isSuccess: upateSuccess,
    refetch,
  } = useFetchEditCourseQuery(courseId);

  const [EditCourse, { data, isLoading, isSuccess, isError }] =
    useEditCourseMutation();

  const [PublishCourse,{data:publishData,isLoading:publishLoading,isError:publishError,isSuccess:publishSuccess}]=usePublishCourseMutation();
  const [DeleteCourse,{data:deleteCourseData,isError:deleteCourseError,isSuccess:deleteCourseSuccess,isLoading:deleteCourseLoading}]=useDeleteCourseMutation();

  useEffect(() => {
    refetch();
  },[refetch]);

  useEffect(()=>{
    if(publishSuccess){
      const getvalue=publishData?.course?.isPublished;
      if(getvalue)
        {
          toast.success( "Course Published successfully")
        }
        else 
        {
          toast.success("Course Unpublished successfully")
        }
    }
    if(publishError){
      toast.error(publishError?.data?.message || "Error in Publishing Course")
    }
  },[publishData,publishSuccess,publishError])
  useEffect(() => {
    if (updateData?.course) {
      const course = updateData?.course;
      SetInput({
        courseTitle: course?.courseTitle,
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
        enrolledStudent: course.enrolledStudent || "",
        courseThumbnail: course?.courseThumbnail || "",
        isPublished:course?.isPublished,
      });
      SetpreviewThumbnail(course?.courseThumbnail || "");
    }

    if (updateError) {
      toast.error(updateError?.data?.message || "Error in Fetch Course");
    }
  }, [updateData, upateSuccess, updateError]);

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message || "Successfully EditCourse");
      navigate('/admin/course')
    }
    if (isError) {
      toast.error(isError.data?.message || "Error in Edit Course");
    }
  }, [isSuccess, data, isError]);

  useEffect(()=>{
    if(deleteCourseData && deleteCourseSuccess){
      toast.success(deleteCourseData.message || "Successfully deleted")
      navigate(`/admin/course`)
    }
    if(deleteCourseError){
      toast.error(deleteCourseError.data?.message || "Error in Delete Course");
    }
    
  },[deleteCourseData,deleteCourseSuccess,deleteCourseData])
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    SetInput({ ...input, [name]: value });
  };

  const SelectGetValue = (value, type) => {
    SetInput({ ...input, [type]: value });
  };

  const SelectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      SetInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        SetpreviewThumbnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    } else {
      // Agar user ne koi file select nahi ki, toh purani thumbnail ko wapas set karo
      SetInput({ ...input, courseThumbnail: input.courseThumbnail });
      SetpreviewThumbnail(input.courseThumbnail); // Set the previous thumbnail preview
    }
  };

  const handleAllInput = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await EditCourse({ inputData: formData, courseId });
  };

  const publishStatusHandler=async()=>{
    const updateStatus=!input.isPublished;
    SetInput({...input,isPublished:updateStatus})
    await PublishCourse({courseId,query:updateStatus})
  }

  const HandleCourseDelete=async()=>{
    // alert(courseId);
    await DeleteCourse({courseId});
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const form = e.target;

    // Check if the description is empty
    if (!input.description || input.description.trim() === '') {
      toast.error("Please enter a description");
      return; // Prevent form submission if required field is empty
    }
    handleAllInput(); 
  }
  if (updateLoading) {
    return <Loader2 size="24" />;
  }
  return (
<div className="p-4 md:mr-9"> {/* Added padding for mobile, adjusted right margin for desktop */}
  <Card>
    <CardHeader>
      {/* Changed to flex-col on mobile, flex-row on sm+ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <CardTitle className="text-xl sm:text-2xl mb-2 sm:mb-0">Basic Course Information</CardTitle> {/* Adjusted font size */}
          <CardDescription className="text-sm sm:text-base"> {/* Adjusted font size */}
            Make Changes to your Courses here . Click Save When you are Done .
          </CardDescription>
        </div>
        {/* Changed to flex-col on mobile, flex-row on sm+ */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0 w-full sm:w-auto"> {/* Added top margin for mobile, full width on mobile */}
          <Button
            disabled={updateData?.course?.lectures.length === 0}
            className="hover:border-2 hover:transition-all hover:duration-300 border-black w-full sm:w-auto" 
            onClick={publishStatusHandler}
            variant="outline"
          >
            {input.isPublished ? "UnPublished" : "Published"}
          </Button>
          <Button onClick={HandleCourseDelete} disabled={deleteCourseLoading} className="w-full sm:w-auto"> {/* Full width on mobile */}
            {
              deleteCourseLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> please wait...
                </>
              ) : (
                "Remove Course"
              )
            }
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Form onSubmit={handleSubmit}>
        <div className="space-y-6 ">
          {/* Title and Subtitle Inputs */}
          <div>
            <label className="font-bold block">Title : </label> 
            <Input
              className="mt-2 w-full md:w-[70%] lg:w-[60%]" 
              name="courseTitle"
              onChange={changeEventHandler}
              value={input.courseTitle}
              type="text"
              placeholder="Enter Course Title"
              required
            />
          </div>
          <div>
            <label className="font-bold block">SubTitle : </label> {/* Added block */}
            <Input
              className="mt-2 w-full md:w-[70%] lg:w-[60%]"
              name="subTitle"
              type="text"
              onChange={changeEventHandler}
              value={input.subTitle}
              placeholder="Enter Course SubTitle"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3">
            <label className="font-bold block">Description : </label> {/* Added block */}
            <RichTextEditor input={input} SetInput={SetInput} />
          </div>

          {/* Category, Course Level, Price - Stack on mobile, row on sm+ */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 md:gap-20"> {/* Adjusted gaps */}
            {/* Category */}
            <div className="flex flex-col gap-3 flex-1"> {/* flex-1 to distribute space */}
              <label className="font-bold block">Category</label> {/* Added block */}
              <Select
                onValueChange={(value) => SelectGetValue(value, "category")}
                value={input?.category || ""}
              >
                <SelectTrigger className="w-full sm:w-[180px]"> {/* Full width on mobile */}
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup required name="category">
                    <SelectLabel>Language</SelectLabel>
                    <SelectItem value="NextJs">Next Js</SelectItem>
                    <SelectItem value="NodeJs">Node Js</SelectItem>
                    <SelectItem value="ReactJs">React Js</SelectItem>
                    <SelectItem value="DataScience">Data Science</SelectItem>
                    <SelectItem value="MarnStack">Marn Stack</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="Html">Html</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Course Level */}
            <div className="flex flex-col gap-3 flex-1"> {/* flex-1 to distribute space */}
              <label className="font-bold block">Course Level</label> {/* Added block */}
              <Select
                onValueChange={(value) =>
                  SelectGetValue(value, "courseLevel")
                }
                value={input?.courseLevel || ""}
              >
                <SelectTrigger className="w-full sm:w-[180px]"> {/* Full width on mobile */}
                  <SelectValue placeholder="Select a Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup required name="category">
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance ">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1 flex-1"> {/* flex-1 to distribute space */}
              <label className="font-bold block">Price</label> {/* Added block */}
              <Input
                className="mt-2 w-full sm:w-auto"
                name="coursePrice"
                type="Number"
                onChange={changeEventHandler}
                value={input.coursePrice}
                placeholder="Enter price in (INR) "
                required
              />
            </div>
          </div>

          {/* Course Thumbnail */}
          <div>
            <div className="flex flex-col gap-2 ">
              <label className="font-bold block">Course Thumbnail</label> {/* Added block */}
              <Input
                className="mt-2 w-full sm:w-[50%] md:w-[30%] hover:border-black hover:border-2 " 
                name="courseThumbnail"
                type="file"
                onChange={SelectThumbnail}
                placeholder="Enter price in (INR) "
                accept="image/*"
              />
            </div>
            <div>
              {previewThumbnail && (
                <img
                  src={previewThumbnail}
                  className="w-full sm:w-[50%] md:w-[30%] h-auto mt-5 object-contain" 
                  alt="Course Thumbnail"
                />
              )}
            </div>
          </div>

          {/* Action Buttons (Back, Save) */}
          <div className="flex flex-col sm:flex-row gap-3"> {/* Stack on mobile, row on sm+ */}
            <Button
              variant="outline"
              onClick={() => {
                navigate("/admin/course");
              }}
              className="border-black border-2 w-full sm:w-auto" 
            >
              Back
            </Button>
            <Button disabled={isLoading} type="submit" className="w-full sm:w-auto"> {/* Full width on mobile */}
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> please wait ..
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </Form>
    </CardContent>
  </Card>
</div>
  );
}

export default CourseTab;
