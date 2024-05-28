"use client";
import React, { useEffect } from "react";
import { useState } from "react";

const NewClientForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageDetails, setImageDetails] = useState({ name: "", size: "" });
  const [fdata,setFData] = useState({
    name:"",
    address:"",
    email:"",
    password:"",
    age:"",
    role:"",
    phoneNumber:"",
  });
  const inputHandelar = (event) => {
    e.prevent.default();

    setFData({
      ...fdata,
      [event.target.name]: event.target.value,
    })
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      setImageDetails({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      });
    }
  };
  useEffect(() => {
    document.title = "Add New Client";
  }
    , [selectedFile, imageDetails]);
  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-center font-bold text-2xl">Add New Client</h2>{" "}
        <br />
        <hr />
        <div className="container w-2/4 mx-auto">
          {/* client full name start */}
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="given-name"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {/* client full name end */}

          {/* Address Section Start */}
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="address"
                id="address"
                autoComplete="address"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {/* Address Section end */}

          {/* email section start */}
          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {/* email section end */}

          {/* password section start */}
          <div className="sm:col-span-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {/* password section end */}

          {/* Age and Role section start */}
          <div className="grid grid-cols-2 gap-4">
            <div className="...">
              <div className="sm:col-span-3">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age:
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="age"
                    id="age"
                    autoComplete="Age"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="...">
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="Role"
                  name="Role"
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  defaultValue="Patient"
                >
                  <option>Patient</option>
                  <option>Doctor</option>
                </select>
              </div>
            </div>
          </div>
          {/* Age and Role section end */}

          {/* phone Number Section Start */}
          <div className="sm:col-span-3">
            <label
              htmlFor="phnone-number"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="phnoneNumber"
                id="phnoneNumber"
                autoComplete="phnone-number"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {/* phone Number Section end */}

          {/* upload image start */}
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload file</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
          {/* <div className="sm:col-span-6">
            <label
              htmlFor="cover-photo"
              className="block text-lg font-medium text-gray-700"
            >
              Upload Image:
            </label>
            <div className="mt-1 w-1/2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 mx-auto">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div> */}
          {/* upload image end */}

          {/* about image start */}
          <div className="sm:col-span-6 w-2/4 mt-4">
            {selectedFile && (
              <div>
                <h3 className="block text-sm font-medium text-gray-700">
                  Image Details:
                </h3>
                <img
                  src={selectedFile}
                  alt="Uploaded Preview"
                  className="mt-2 rounded-md"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Name: {imageDetails.name}
                </p>
                <p className="text-sm text-gray-600">
                  Size: {imageDetails.size}
                </p>
              </div>
            )}
          </div>
          {/* about image end */}

          {/* Submit section start */}
          <div className="pt-5">
            <div className="flex justify-center">
              <button
                type="button"
                className="rounded-md border border-rose-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
          {/* Submit section end */}
        </div>
      </div>
    </>
  );
};

export default NewClientForm;
