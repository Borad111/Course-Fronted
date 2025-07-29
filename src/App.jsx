  import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import HeroSection from "./pages/Student/HeroSection";
import MainLayout from "./layout/MainLayout";
import { Navigate, RouterProvider } from "react-router";
import Courses from "./pages/Student/Courses";
import MyLearing from "./pages/Student/MyLearing";
import Profile from "./pages/Student/Profile";
import LoadingSpinner from "./components/LoadingSpinner";
// import { Sidebar } from 'lucide-react'
import Sidebar from "./pages/Admin/Sidebar";
import DashBoard from "./pages/Admin/DashBoard";
import CourseTable from "./pages/Admin/Course/CourseTable";
import AddCourse from "./pages/Admin/Course/AddCourse";
import EditCourse from "./pages/Admin/Course/EditCourse";
import CreateLecture from "./pages/Admin/Lecture/CreateLecture";
import EditLecture from "./pages/Admin/Lecture/EditLecture";
import CourseDetail from "./pages/Student/CourseDetail";
import CourseProgress from "./pages/Student/CourseProgress";
import SearchPage from "./pages/Student/SearchPage";
import {
  AdminProtected,
  Authenticateduser,
  ProtectedRoute,
} from "./components/ProtectRoute";
import PurchaseProtected from "./components/PurchaseProtected";
import { ThemeProvider } from "./components/ThemeProvider";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <Authenticateduser>
            <Login />
          </Authenticateduser>
        ),
      },
      {
        path: "/MyLearing",
        element: (
          <ProtectedRoute>
            <MyLearing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <>
            {/* <HeroSection/> */}
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          </>
        ),
      },
      {
        path: "/CourseDetail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseProtected>
              <CourseProgress />
            </PurchaseProtected>
          </ProtectedRoute>
        ),
      },
      // Admin Routes
      {
        path: "/admin",
        element: (
          <AdminProtected>
            <Sidebar />
          </AdminProtected>
        ),
        children: [
          {
            index: true, // This makes it the default route for /admin
            element: <Navigate to="/admin/dashboard" replace />,
          },
          {
            path: "dashboard",
            element:<>
             <DashBoard />
             </>,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/addcourse",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },

          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <main>
    <ThemeProvider>
      <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
