import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 shadow mx-4 rounded-lg">
      <div className="w-full max-w-screen-xl mx-auto p-6 md:py-8">
        
        {/* Top section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <a className="flex items-center mb-4 sm:mb-0 space-x-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Swift Logo"
            />
            <span className="self-center text-2xl font-semibold text-white">
              SwiftChat
            </span>
          </a>

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

        {/* Bottom copyright */}
        <span className="block text-sm text-gray-400 sm:text-center">
          © 2023{" "}
          <a className="hover:underline text-white">
            SwiftChat
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;