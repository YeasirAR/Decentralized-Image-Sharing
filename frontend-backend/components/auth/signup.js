'use client'
import Link from "next/link";
// import logo from "../../public/images/logo.png";
import Image from "next/image";
import { useState } from "react";

export default function Signup() {
  const [profilePic, setProfilePic] = useState(null);


  const handleSignup = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    if(password !== e.target.confirm_password.value) {
      alert("Password and confirm password does not match");
      return;
    }
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
    const imageUrl = file.secure_url || "";
    const res = await fetch("/api/auth/signup/org", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        country: e.target.country.value,
        street_address: e.target.street_address.value,
        reg_no: e.target.reg_no.value,
        password: e.target.password.value,
        profile_image: imageUrl,
        description: e.target.description.value,
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
  };
    return (
      <>
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create a new account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter the following information to sign up.{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              </a>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-slate-50 py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="#" method="POST" onSubmit={handleSignup}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Organization Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      autoComplete="name"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
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
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Select region
                  </label>
                    <div className="mt-1">
                        <select
                        id="country"
                        name="country"
                        autoComplete="country"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        </select>
                        </div>
                </div>
                <div>
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                    Street address
                  </label>
                  <div className="mt-1">
                    <input
                      id="street_address"
                      name="street_address"
                      type="street-address"
                      autoComplete="street-address"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="reg-no" className="block text-sm font-medium text-gray-700">
                    Govt. Registration No. 
                  </label>
                  <div className="mt-1">
                    <input
                      id="reg_no"
                      name="reg_no"
                      type="reg-no"
                      autoComplete="reg-no"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Profile Image
                  </label>
                  <div className="mt-1">
                    
                  <input
            type="file"
            id="profilePic"
            onChange={(event) => setProfilePic(event.target.files[0])}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          /> 
                  </div>
                </div>
                <div>
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
                <div>
                  <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Organization Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
  
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign up
                  </button>
                </div>
              </form>
  
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-slate-50 px-2 text-gray-500">OR</span>
                  </div>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account? {' '}
              <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign In
              </Link>
            </p>
          </div>

              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  