import { useGetCourseDetailsWithStatusQuery } from "@/features/api/purchaseApi";
import  {useParams,Navigate} from "react-router-dom";
const PurchaseProtected=({children})=>{

    const {courseId}=useParams();

    const {data,isLoading}=useGetCourseDetailsWithStatusQuery(courseId);

    if(isLoading){
        return <p>Loading...</p>
    }

    return data?.status ? children : <Navigate to={`/CourseDetail/${courseId}`} />
}


export default PurchaseProtected;