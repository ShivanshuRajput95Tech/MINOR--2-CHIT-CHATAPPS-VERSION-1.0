import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect away
  useEffect(() => {
    checkAuth();
    if (isAuthenticated) navigate("/");
  }, []);

  // Email verification request
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/user/${id}/verify/${token}`);

        toast.success(response.data.message);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  return (
    <div className="bg-gray-900 min-h-screen text-white flex justify-center items-center flex-col p-6">
      {loading && (
        <div className="mb-10 flex flex-col items-center" role="status">
          <svg
            aria-hidden="true"
            className="w-20 h-20 animate-spin fill-indigo-500 text-gray-600"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 
                 100.591 50 100.591C22.3858 100.591 
                 0 78.2051 0 50.5908C0 22.9766 
                 22.3858 0.59082 50 0.59082C77.6142 
                 0.59082 100 22.9766 100 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 
                 97.8624 35.9116 97.0079 33.5539C95.2932 
                 28.8227 92.871 24.3692 89.8167 20.348C85.8452 
                 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 
                 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
                 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 
                 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 
                 9.04874 41.5694 10.4718 44.0505 10.1071C47.8511 
                 9.55231 51.7191 9.52689 55.5402 10.0491C60.8642 
                 10.7739 66.0407 12.6031 70.7084 15.429C75.3761 
                 18.2549 79.427 22.0215 82.5878 26.532C84.9171 
                 29.8831 86.7997 33.596 88.1811 37.5631C89.083 
                 40.1381 91.5423 41.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>

          <span className="my-4 text-lg">Loading...</span>
        </div>
      )}

      {!loading && (
        <span className="my-4 text-xl font-medium">
          Verification Completed 🎉
        </span>
      )}

      {!loading && !isAuthenticated && (
        <Link
          to={"/login"}
          className="inline-flex items-center justify-center px-6 py-2 mt-6 font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Login
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 
                 0l6 6a1 1 0 010 1.414l-6 6a1 1 
                 0 01-1.414-1.414L14.586 11H3a1 
                 1 0 110-2h11.586l-4.293-4.293a1 
                 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      )}
    </div>
  );
};

export default VerifyEmail;