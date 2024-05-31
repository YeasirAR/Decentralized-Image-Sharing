'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
const OrgProfile = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        const handleLogin = async () => {
            const res = await fetch("/api/find_org", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },  
  
            });

            if(res.status === 200) {
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
    
    return (
        <div>
            {/* header section start */}
            <div className='grid grid-cols-3 gap-4'>
            <div className="p-4 flex-shrink-0">
            <Image
                className="rounded-xl"
                src={data.profile_image}
                width={180}
                height={180}
                alt=""
            />
            </div>
                <div className='col-span-2 my-auto'>
                    <h1 className="font-bold text-2xl">Organization Name: {data.name}</h1>
                    <h3 className="font-extralight text-gray-500">Registration Number: {data.reg_no}</h3>
                    <h3 className="font-extralight text-gray-500">Address: {data.street_address}, {data.reg_no}.</h3>
                </div>
            </div> <br />
            {/* header section end */}
            <hr />
            {/* bottom section start */}
            <div className='grid grid-cols-3 gap-4 mt-2'>
                <div>
                    <h1 className="font-bold text-2xl">Stats</h1>
                    <div className="grid-rows-2 text-start">
                        {/* <div>
                            <h1 className='text-5xl'>190</h1>
                            <h4 className=' text-gray-500'>Total Clients</h4>
                        </div> */}
                        <div>
                            <h1 className='text-xl'>Total Images: {data.total_images}</h1>

                        </div>

                    </div>
                </div>
                <div className='col-span-2'>
                    <h1 className="font-bold text-2xl">About</h1>
                    <p>{data.description}</p>
                </div>
            </div>
            {/* bottom section end */}
        </div>
    )
}

export default OrgProfile