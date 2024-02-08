import React from 'react'

const AddImageForm = () => {
    return (
        <>
            <div className="container mx-auto">
                <h2 className='text-center font-bold text-3xl'>Upload Image</h2> <br />
                <hr />
                {/* upload image start */}
                <div className="sm:col-span-6">
                    <label htmlFor="cover-photo" className="block text-lg font-medium text-gray-700">
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
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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
                </div>
                {/* upload image end */}

                {/* about image start */}
                <div className="sm:col-span-6 w-2/4">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Image Descriptive Information:
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="about"
                            name="about"
                            rows={5}
                            className="block w-full  rounded-md border-gray-200 border-2  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            defaultValue={'Image Description'}

                        />
                    </div>
                </div>
                {/* about image end */}

                {/* Client Id Section start */}
                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Client Id:
                    </label>
                    <div className="mt-1 w-2/4">
                        <input
                            type="text"
                            name="client-id"
                            id="client-id"
                            autoComplete="client-id"
                            placeholder='Client Id'
                            className="block w-3/4 h-10 rounded-md border-2 border-gray-200 shadow-sm focus:border-gray-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                {/* Client Id Section end */}

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
        </>
    )
}

export default AddImageForm