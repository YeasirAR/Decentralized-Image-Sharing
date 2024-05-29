'use client'
import React, { useState } from "react";

const NewClientForm = () => {
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from submitting
    console.log("submitting");
    const data_img = new FormData();
    data_img.append("file", profilePic);
    data_img.append("upload_preset", "ac0fxlck");
    data_img.append("cloud_name", "duhwlswgx");
    const res_img = await fetch(
      "https://api.cloudinary.com/v1_1/duhwlswgx/image/upload",
      {
        method: "POST",
        body: data_img,
      }
    );
    const file = await res_img.json();
    console.log(file.secure_url);
    // alert("Image uploaded successfully" + file.secure_url);
    const res = await fetch("/api/auth/signup/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
        address: event.target.address.value,
        age: event.target.age.value,
        role: event.target.Role.value,
        phone_number: event.target.phnoneNumber.value,
        description: event.target.description.value,
        profile_image: file.secure_url || "",
      }),
    });
    const data = await res.json();
    console.log(data);
    if(res.status === 200) {
      alert("Account created successfully");
      window.location.href = "/home";
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-center font-bold text-2xl">Add New Client</h2>
      <br />
      <hr />
      <form onSubmit={handleSubmit}> 
        <div className="container w-2/4 mx-auto">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              Full name
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
          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
          <div className="sm:col-span-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
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
          <div className="grid grid-cols-2 gap-4">
            <div className="...">
              <div className="sm:col-span-3">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
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
          <div className="sm:col-span-3">
            <label htmlFor="phnone-number" className="block text-sm font-medium text-gray-700">
              Phone Number
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
          <div className="sm:col-span-3">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows="3"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="user_avatar">
            Upload profile image
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            id="profilePic"
            onChange={(event) => setProfilePic(event.target.files[0])}
          />
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
        </div>
      </form>
    </div>
  );
};

export default NewClientForm;
