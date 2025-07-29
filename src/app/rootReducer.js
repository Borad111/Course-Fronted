import { authApi } from '@/features/api/authApi';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice'
import { courseApi } from '@/features/api/courseApi';
import { purchaseApi } from '@/features/api/purchaseApi';
import { CourseProgressApi } from '@/features/api/CourseProgressApi';


const rootReducer=combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [CourseProgressApi.reducerPath]:CourseProgressApi.reducer,
    auth:authReducer    
})

export default rootReducer;