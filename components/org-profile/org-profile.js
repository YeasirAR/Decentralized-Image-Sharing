import React from 'react'

const OrgProfile = () => {
    return (
        <div>
            {/* header section start */}
            <div className='grid grid-cols-3 gap-4'>
                <div>
                    <img src="https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=360" alt="Not Found" className='h-48 rounded drop-shadow-2xl' />
                </div>
                <div className='col-span-2'>
                    <h1 className="font-bold text-2xl">Organization Name</h1>
                    <h3 className="font-extralight text-gray-500">Registration Number: 01245256541654115</h3>
                    <h3 className="font-extralight text-gray-500">Address: 588/3 Dhaka, Bangladesh.</h3>
                </div>
            </div> <br />
            {/* header section end */}
            <hr />
            {/* bottom section start */}
            <div className='grid grid-cols-3 gap-4 mt-2'>
                <div>
                    <h1 className="font-bold text-2xl">Stats</h1>
                    <div className="grid-rows-2 text-center">
                        <div>
                            <h1 className='text-5xl'>190</h1>
                            <h4 className=' text-gray-500'>Total Clients</h4>
                        </div>
                        <div>
                            <h1 className='text-5xl'>4805</h1>
                            <h4 className=' text-gray-500'>Total Images</h4>
                        </div>

                    </div>
                </div>
                <div className='col-span-2'>
                    <h1 className="font-bold text-2xl">About</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At animi reiciendis nobis quidem est laudantium cupiditate commodi rem magnam. Nisi impedit ipsum, molestiae aliquid, exercitationem voluptatum pariatur suscipit molestias illum facere rerum. Corporis, tempore? Nobis, suscipit. Hic magni commodi natus fugiat doloribus est repellat inventore facere aliquam magnam, quas modi!</p>
                </div>
            </div>
            {/* bottom section end */}
        </div>
    )
}

export default OrgProfile