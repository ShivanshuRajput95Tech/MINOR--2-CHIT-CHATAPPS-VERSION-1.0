import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import { useAuth } from "../context/authContext";

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="bg-gray-900 text-white">
      <div className="grid max-w-screen-xl px-4 py-16 mx-auto lg:gap-8 lg:py-24 lg:grid-cols-12">
        
        {/* Left Text Section */}
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl xl:text-6xl">
            Swift Chat: Instant Connections, Effortless Conversations
          </h1>

          <p className="max-w-2xl mb-6 font-light text-gray-300 lg:mb-8 md:text-lg">
            Connect Seamlessly, Chat Effortlessly: Elevate Your Social Experience 
            with Our Intuitive Chat Application!
          </p>

          {/* If NOT authenticated → show Login + Register */}
          {!isAuthenticated && (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                Login
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0L17.707 9.293a1 1 0 010 1.414l-6 6a1 1 0 
                      01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0
                      010-1.414z"
                  ></path>
                </svg>
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* If AUTHENTICATED → show Chat Home */}
          {isAuthenticated && (
            <Link
              to="/chathome"
              className="inline-flex items-center justify-center px-6 py-3 mt-4 text-base font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
            >
              Chat Home
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0L17.707 9.293a1 1 0 010 
                    1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 
                    0 110-2h11.586l-4.293-4.293a1 1 
                    0 010-1.414z"
                ></path>
              </svg>
            </Link>
          )}
        </div>

        {/* Right Hero Image */}
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={hero} alt="Chat App Mockup" className="mix-blend-lighten" />
        </div>
      </div>
    </section>
  );
};

export default Hero;