import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  useDeleteLectureMutation,
  useGetLectureDataFormParticularCourseQuery,
  useUpdateLectureMutation,
} from "@/features/api/courseApi";
import { useNavigate, useParams } from "react-router-dom";

// const MEDIA_API = "https://backendc-1-qq4i.onrender.com/api/v1/media";
const MEDIA_API = "http://localhost:3000/api/v1/media"; // For local development
function LectureTab() {
  const { courseId, lectureId } = useParams();

  const [lectureTitle, SetLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState("");
  const [isPreviewFree, SetIsPreviewFree] = useState(false);
  const [mediaProgress, SetMediaProgress] = useState(false);
  const [uploadProgress, SetUploadProgress] = useState(0);
  const [btnDisabled, SetBtnDisabled] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const [message, SetMessage] = useState(false);

  const navigate=useNavigate();

  const {
    data,
    isError,
    isLoading: LectureIsLoading,
    isSuccess,
    refetch,
  } = useGetLectureDataFormParticularCourseQuery(lectureId);

  const [
    UpdateLecture,
    {
      data: UpdateData,
      isSuccess: UpdateSuccess,
      isError: UpdateError,
      isLoading: UpdateLoading,
    },
  ] = useUpdateLectureMutation();

  const [DeleteLecture,{data:DeleteData,isError:DeleteError,isSuccess:DeleteSuccess,isLoading:DeleteIsLoading}]=useDeleteLectureMutation();
  useEffect(() => {
    refetch();
  }, [refetch]);
  useEffect(() => {
    if (isSuccess && data) {
      SetLectureTitle(data.lecture?.lectureTitle);
      SetIsPreviewFree(data.lecture?.isPreviewFree);
  
      // Agar videoUrl aur publicId available hai
      if (data.lecture?.vidioUrl) {
        SetMessage(true);
        console.log("Video URL exists, message set to true.");
      } else {
        SetMessage(false);
        console.log("Video URL does not exist, message set to false.");
      }
      // console.log("fetched Lecture Title", data.lecture?.lectureTitle);
    }
  
    if (isError) {
      toast.error(isError.data?.message || "Error");
    }
  }, [data, isSuccess, isError]);
  
  useEffect(()=>{
    if(DeleteData && DeleteSuccess){
      toast.success(DeleteData.message || "Successfully deleted")
      navigate(`/admin/course/${courseId}/lecture`)
    }
    if(DeleteError){
      toast.error(DeleteError.data?.message || "Error");
    }
  },[DeleteData,DeleteError,DeleteSuccess])
  useEffect(() => {
    if (UpdateData && UpdateSuccess) {
      toast.success(UpdateData.message || "Successfully updated");
      navigate(`/admin/course/${courseId}/lecture`)
    }
    if (UpdateError) {
      toast.error(UpdateError.data?.message || "Error updating");
    }
  }, [UpdateError, UpdateData, UpdateSuccess]);
  const FileChangeHandler = async (e) => {
    const file = e.target.files[0];
    console.log(uploadVideoInfo);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("lectureId", lectureId);

      SetUploadProgress(0);
      SetMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-media`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          SetUploadProgress(progress);  
            SetIsLoading(true);
            SetBtnDisabled(true);
          },
        });
        if (res.data.success) {
          console.log(res.data.data);
          toast.success(res.data.message || "Video uploaded successfully");
          SetMediaProgress(true);
          SetMessage(true);
          SetIsLoading(false);
          SetBtnDisabled(false);

          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Error in Uploading Video");
      } finally {
        SetMediaProgress(false);
      }
    } else {
      // No file selected, retain previous video info
      console.log("No file selected, retaining previous video.");
    }
  };

  const EditLectureHandler = async () => {
    const inputData = { lectureTitle, uploadVideoInfo, isPreviewFree };
    console.log(inputData);
    await UpdateLecture({ inputData, courseId, lectureId });
  };

  const DeleteLectureHandler=async()=>{
    await DeleteLecture(lectureId);
  }
  if (LectureIsLoading) {
    return (
      <div className="spinner ml-[40%] mt-[20%] w-12 h-12 border-t-2 border-black rounded-full  animate-spin"></div>
    );
  }
  return (
    <div className="p-4mt-10 md:mt-0"> {/* Adjusted padding and margin */}
  <Card className="dark:shadow-md dark:shadow-white">
    <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center"> {/* Flex direction change */}
      <div>
        <CardTitle className="font-bold text-xl sm:text-2xl mb-2 sm:mb-0">Edit Lecture</CardTitle> {/* Font size adjust */}
        <CardDescription className="text-sm sm:text-base">
          Make Changes And Click Save When Done
        </CardDescription>
      </div>
      <div className="mt-4 sm:mt-0 w-full sm:w-auto"> {/* Margin and width adjust */}
        <Button disabled={DeleteIsLoading} onClick={DeleteLectureHandler} className="bg-red-600 text-white hover:bg-red-500 w-full sm:w-auto"> {/* Full width on mobile */}
          {
            DeleteIsLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Please Wait
              </>
            ) : (
              "Remove Lecture"
            )
          }
        </Button>
      </div>
    </CardHeader>
    <CardContent className="flex flex-col gap-6">
      {/* Lecture Title Input */}
      <div className="flex flex-col gap-3">
        <Label className="font-bold block">Title :</Label> {/* Added block to label */}
        <Input
          type="text"
          placeholder="Enter Title"
          className="w-full sm:w-[70%] md:w-[50%] border-black" 
          value={lectureTitle || ""}
          onChange={(e) => SetLectureTitle(e.target.value)}
        />
      </div>

      {/* Video Input */}
      <div className="flex flex-col gap-3">
        <Label className="font-bold block"> {/* Added block to label */}
          Video <span className="text-red-700">*</span>{" "}
        </Label>
        <Input
          type="file"
          accept="video/*"
          className="w-full sm:w-[70%] md:w-[50%] border-black" 
          onChange={FileChangeHandler}
        />
      </div>

      {/* Video Upload Status Messages */}
      {message ? (
        <p className="mt-4 text-sm text-green-600 text-center sm:text-left"> {/* Removed ml-[40%], added text-center/left */}
          Video has already been uploaded.
        </p>
      ) : (
        <p className="mt-4 text-sm text-red-600 text-center sm:text-left"> {/* Removed ml-[40%], added text-center/left */}
          No Any Video has been uploaded.
        </p>
      )}

      {/* Progress Bar and Spinner */}
      <div className="flex flex-col sm:flex-row items-center gap-3"> {/* Changed to column on mobile */}
        {mediaProgress && (
          <div className="w-full sm:w-[60%]"> {/* Full width on mobile */}
            <Progress value={uploadProgress} className="w-full" />
            <h2 className="mt-6 text-center sm:text-left">{uploadProgress} % uploaded</h2> {/* Centered on mobile */}
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center sm:justify-start"> {/* Centered on mobile */}
            <div className="spinner border-t-2 border-black rounded-full w-6 h-6 animate-spin"></div>
          </div>
        )}
      </div>

      {/* Update Lecture Button */}
      <div>
        <Button className="dark:hover:bg-[#050715de] dark:hover:text-white dark:hover:shadow-sm dark:hover:shadow-white w-full sm:w-auto" onClick={EditLectureHandler} disabled={btnDisabled || UpdateLoading}> {/* Full width on mobile */}
          {isLoading || UpdateLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Please Wait
            </>
          ) : (
            "Update Lecture"
          )}
        </Button>
      </div>
    </CardContent>
  </Card>
</div>
  );
}

export default LectureTab;
