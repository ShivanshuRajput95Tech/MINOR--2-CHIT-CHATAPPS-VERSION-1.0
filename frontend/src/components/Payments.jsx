import React from "react";

const Payments = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="py-16 px-4 mx-auto max-w-screen-xl">

        {/* Header */}
        <div className="mx-auto max-w-screen-md text-center mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
            Choose the right plan for your team
          </h2>
          <p className="font-light sm:text-xl text-gray-400">
            Swift Chat gives you flexible, scalable, and powerful pricing options built for teams of all sizes.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-12 lg:space-y-0">

          {/* Starter Plan */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center bg-gray-800 rounded-lg border border-gray-700 shadow-md">
            <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
            <p className="font-light sm:text-lg text-gray-400">
              Perfect for personal use & small side projects.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$29</span>
              <span className="text-gray-400">/month</span>
            </div>

            <ul className="mb-8 space-y-4 text-left">
              {[
                "Individual configuration",
                "No setup or hidden fees",
                "Team size: 1 developer",
                "Premium support: 6 months",
                "Free updates included"
              ].map((text, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 
                        010 1.414l-8 8a1 1 0 01-1.414 
                        0l-4-4a1 1 0 011.414-1.414L8 
                        12.586l7.293-7.293a1 1 0 
                        011.414 0z"
                    ></path>
                  </svg>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="text-white bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-lg"
            >
              Get started
            </a>
          </div>

          {/* Company Plan */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center bg-indigo-700/20 rounded-lg border border-indigo-500 shadow-xl scale-105">
            <h3 className="mb-4 text-2xl font-semibold">Company</h3>
            <p className="font-light sm:text-lg text-gray-300">
              Ideal for small to medium teams needing advanced support.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$99</span>
              <span className="text-gray-400">/month</span>
            </div>

            <ul className="mb-8 space-y-4 text-left">
              {[
                "Individual configuration",
                "No setup or hidden fees",
                "Team size: 10 developers",
                "Premium support: 24 months",
                "Free updates included"
              ].map((text, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 
                        010 1.414l-8 8a1 1 0 
                        01-1.414 0l-4-4a1 1 0 
                        011.414-1.414L8 12.586l7.293-7.293a1 1 0 
                        011.414 0z"
                    ></path>
                  </svg>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="text-white bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-lg"
            >
              Get started
            </a>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center bg-gray-800 rounded-lg border border-gray-700 shadow-md">
            <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
            <p className="font-light sm:text-lg text-gray-400">
              Best for large organizations and high-traffic deployments.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$499</span>
              <span className="text-gray-400">/month</span>
            </div>

            <ul className="mb-8 space-y-4 text-left">
              {[
                "Individual configuration",
                "No setup or hidden fees",
                "Team size: 100+ developers",
                "Premium support: 36 months",
                "All pro updates included"
              ].map((text, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 
                        010 1.414l-8 8a1 1 0 
                        01-1.414 0l-4-4a1 1 0 
                        011.414-1.414L8 12.586l7.293-7.293a1 1 0 
                        011.414 0z"
                    ></path>
                  </svg>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="text-white bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-lg"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payments;