import React from 'react'

const AddImageForm = () => {
    return (
        <>
            <div className="container mx-auto">
                <h2 className='text-center font-bold text-3xl'>Upload Image</h2> <br />
                <hr />
                {/* upload image start */}
                

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
                <input className="block w-30 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
 

                {/* upload image end */}

                {/* about image start */}
                {/* <div className="sm:col-span-6 w-2/4">
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
                </div> */}
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