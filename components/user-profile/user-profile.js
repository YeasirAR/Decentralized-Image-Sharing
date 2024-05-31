'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";

const UserProfile = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLogin = async () => {
            const res = await fetch("/api/find_user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 200) {
                const data = await res.json();
                console.log(data);
                setData(data.data);
                setLoading(false);
            } else {
                alert(data.message);
            }
        };
        handleLogin();
    }, []);

    if (loading) {
        return <div className="text-center text-xl">Loading...</div>;
    }

    return (
        <div className="p-8 bg-white rounded-lg shadow-lg">
            {/* header section start */}
            <div className='grid grid-cols-3 gap-4 mb-8'>
                <div className="p-4 flex-shrink-0">
                    <Image
                        className="rounded-full border border-gray-200"
                        src={data.profile_image || "/default-profile.png"}
                        width={180}
                        height={180}
                        alt="User Profile"
                    />
                </div>
                <div className='col-span-2 my-auto'>
                    <h1 className="font-bold text-3xl text-blue-800 mb-2">{data.name}</h1>
                    <div className="mb-1">
                        <span className="font-medium text-lg text-gray-600">Role: </span>
                        <span className="text-lg text-gray-700">{data.role}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-medium text-lg text-gray-600">Email: </span>
                        <span className="text-lg text-gray-700">{data.email}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-medium text-lg text-gray-600">Age: </span>
                        <span className="text-lg text-gray-700">{data.age}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-medium text-lg text-gray-600">Phone: </span>
                        <span className="text-lg text-gray-700">{data.phone}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-medium text-lg text-gray-600">Address: </span>
                        <span className="text-lg text-gray-700">{data.address}</span>
                    </div>
                </div>
            </div>
            {/* header section end */}
            <hr className="border-t border-gray-300" />
            {/* about section start */}
            <div className='mt-6'>
                <h1 className="font-bold text-2xl text-blue-800 mb-4">About</h1>
                <p className="text-gray-700">{data.description}</p>
            </div>
            {/* about section end */}
        </div>
    )
}

export default UserProfile
