import React from "react";

const ShareImage = () => {
  return (
    <>
      <div className="w-[130vh] p-4 mx-auto my-3 text-left bg-white border border-gray-200 shadow-lg shadow-purple-500/50 rounded-lg shadow sm:p-8 ">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 ">Image Name</h5>
        <h3 className="mb-2 text-3xl font-bold text-gray-900 ">Block Id</h3>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Share With: <br />
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
          >
            abc@xyz.com
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
          >
            abc@xyz.com
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
          >
            abc@xyz.com
          </button>
        </p>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
          <a
            href="#"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <div className="text-left rtl:text-right">
              <div className="mb-1 text-xs">Download Image</div>
              <div className="-mt-1 font-sans text-sm font-semibold">
                Click Here
              </div>
            </div>
          </a>
          
        </div>
      </div>
    </>
  );
};

export default ShareImage;
