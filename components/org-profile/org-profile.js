'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";

const OrgProfile = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load_data = async () => {
            const res = await fetch("/api/find_org", {
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
        load_data();
    }, []);

    if (loading) {
        return <div className="text-center text-xl">Loading...</div>;
    }

    return (
        <div className="p-8 bg-white rounded-lg shadow-lg">
            <div className='grid grid-cols-3 gap-4 mb-8'>
                <div className="p-4 flex-shrink-0">
                    <Image
                        className="rounded-full border border-gray-200"
                        src={data.profile_image || "/default-profile.png"}
                        width={180}
                        height={180}
                        alt="Organization Profile"
                    />
                </div>
                <div className='col-span-2 my-auto'>
                    <h1 className="font-bold text-3xl text-blue-800 mb-2">Organization Name: {data.name}</h1>
                    <h3 className="font-medium text-lg text-gray-600">Registration Number: {data.reg_no}</h3>
                    <h3 className="font-medium text-lg text-gray-600">Address: {data.street_address}</h3>
                    <h3 className="font-medium text-lg text-gray-600">Country: {data.country}</h3>
                    <h3 className="font-medium text-lg text-gray-600">Email: {data.email}</h3>
                    {/* <h3 className="font-medium text-lg text-gray-600">Role: {data.role}</h3> */}
                </div>
            </div>
            {/* header section end */}
            <hr className="border-t border-gray-300" />
            {/* bottom section start */}
            <div className='grid grid-cols-3 gap-4 mt-6'>
                <div>
                    <h1 className="font-bold text-2xl text-blue-800 mb-4">Stats</h1>
                    <div className="grid-rows-2 text-start">
                        <div className="mb-2">
                            {/* <h1 className='text-2xl text-blue-700'></h1> */}
                            <h4 className='text-gray-600'>Total Images: {data.total_images}</h4>
                        </div>
                    </div>
                </div>
                <div className='col-span-2'>
                    <h1 className="font-bold text-2xl text-blue-800 mb-4">About</h1>
                    <p className="text-gray-700">{data.description}</p>
                </div>
            </div>
        </div>
    )
}

export default OrgProfile
