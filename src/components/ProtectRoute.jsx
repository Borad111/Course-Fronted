import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const ProtectedRoute=({children})=>{

    const {user,isAuthenticated}=useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login" />
    }

    return children;
}

export const Authenticateduser=({children})=>{
    const {user,isAuthenticated}=useSelector(store=>store.auth);

    if(isAuthenticated){
        return <Navigate to="/" />
    }

    return children;
}


export const AdminProtected=({children})=>{
    const {user,isAuthenticated}=useSelector(store=>store.auth);
 
    if(!isAuthenticated){
        return <Navigate to="/login" />
    } 

    if(user.role!=="admin"){
        return <Navigate to="/" />
    }

    return children;
 
}