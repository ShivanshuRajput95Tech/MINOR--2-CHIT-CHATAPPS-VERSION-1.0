import React from "react";

const Features = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="py-16 px-4 mx-auto max-w-screen-xl sm:py-24">
        
        {/* Header */}
        <div className="max-w-screen-md mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
            Designed for business teams like yours
          </h2>

          <p className="sm:text-xl text-gray-400">
            At Swift Chat, we enhance communication using modern technology,
            great design, and fast interactions to help your team stay connected,
            productive, and collaborative.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">

          {/* Marketing */}
          <div>
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-lg bg-indigo-600">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 
                    1.293a1 1 0 101.414 1.414L10 15.414l2.293 
                    2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 
                    0 002-2V5a1 1 0 100-2H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>

            <h3 className="mb-2 text-xl font-bold">Marketing</h3>
            <p className="text-gray-400">
              Build campaigns, engage your audience, and streamline teamwork.
              Everything your marketing team needs — all in one place.
            </p>
          </div>

          {/* Legal */}
          <div>
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-lg bg-indigo-600">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 
                  000 1.84l7 3a1 1 0 00.788 0l7-3a1 1 
                  0 000-1.84l-7-3z"></path>
                <path d="M3 10.28V14a1 1 0 00.553.894l7 3a1 
                  1 0 00.894 0l7-3A1 1 0 0019 14v-3.72l-7 
                  3a3 3 0 01-2.106 0l-7-3z"></path>
              </svg>
            </div>

            <h3 className="mb-2 text-xl font-bold">Legal</h3>
            <p className="text-gray-400">
              Secure your organization and manage compliance with intuitive
              workflows and smart permission controls.
            </p>
          </div>

          {/* Business Automation */}
          <div>
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-lg bg-indigo-600">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 
                    0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 
                    2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 
                    0 011 1v1H8V5z"
                  clipRule="evenodd"
                ></path>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 
                  0 002-2v-2.308A12.967 12.967 0 0110 
                  15c-2.906 0-5.588-.927-8-2.308z"></path>
              </svg>
            </div>

            <h3 className="mb-2 text-xl font-bold">Business Automation</h3>
            <p className="text-gray-400">
              Automate tasks, send notifications, and streamline operations 
              using advanced templates built for efficiency.
            </p>
          </div>

          {/* Finance */}
          <div>
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-lg bg-indigo-600">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.26 
                1.202-.383 2.598.36 2.902 1.59a1 1 
                0 01-1.94.485c-.07-.282-.404-.508-.725-.508 
                a1.694 1.694 0 00-.527.11c-.813.259-1.815-.288 
                -2.119-1.51a1 1 0 011.842-.907z"></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 
                    16zm1-13a1 1 0 10-2 0v4a1 1 0 002 
                    0V5zm-1 8a1.5 1.5 0 100-3 1.5 
                    1.5 0 000 3z"
                ></path>
              </svg>
            </div>

            <h3 className="mb-2 text-xl font-bold">Finance</h3>
            <p className="text-gray-400">
              Tools built for accurate financial planning, secure auditing,
              and fast month-end closing.
            </p>
          </div>

          {/* Enterprise Design */}
          <div>
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-lg bg-indigo-600">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 
                  0 100-2H7zM4 7a1 1 0 000 2h12a1 1 
                  0 100-2H4zm3 4a1 1 0 100 2h6a1 1 
                  0 100-2H7z"></path>
              </svg>
            </div>

            <h3 className="mb-2 text-xl font-bold">Enterprise Design</h3>
            <p className="text-gray-400">
              Create beautiful interfaces and collaborative design
              systems that scale across teams and products.
            </p>
          </div>

          {/* Operations */}
          <div>
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-lg bg-indigo-600">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 
                    0a1.532 1.532 0 01-1.5 1.177H5a2 
                    2 0 00-2 2v3a2 2 0 002 2h.01c.748 
                    1.742 2.482 3 4.49 3s3.742-1.258 
                    4.49-3H15a2 2 0 002-2V6a2 2 0 
                    00-2-2h-2.01a1.532 1.532 0 
                    01-1.5-1.177z"
                ></path>
              </svg>
            </div>

            <h3 className="mb-2 text-xl font-bold">Operations</h3>
            <p className="text-gray-400">
              Maintain smooth operational workflows using flexible,
              structured tools built for all modern teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;