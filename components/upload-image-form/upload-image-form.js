'use client';
import React, { useState } from 'react';

const UploadImageForm = (props) => {
    const { user_email } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [clientId, setClientId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleClientIdChange = (e) => {
        setClientId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select a file.");
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('https://e84d-34-168-222-190.ngrok-free.app/get_fm_en_ipfs', {
                method: 'POST',
                body: formData,
                headers: {}
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            console.log(JSON.stringify(data.feature_map));
            console.log(data.encryption_key);
            console.log(data.ipfs_hash);
            console.log(clientId);
            console.log(user_email);

            try {
                const res = await fetch('http://127.0.0.1:5000/api/insertEncrKeyIpfs', {
                    method: 'POST',
                    body: JSON.stringify({
                        owner: user_email,
                        encryption_key: data.encryption_key,
                        feature_map: JSON.stringify(data.feature_map),
                        ipfs_hash: data.ipfs_hash,
                        clients: clientId,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const resData = await res.json();
                console.log('Success:', resData);
                alert('Block created successfully');
                try {
                    const response = await fetch(
                      "/api/update/org_count",
                      {
                        method: "POST",
                        body: {
                            "email":user_email,
                            
                        },
                        headers: {},
                      }
                    );
            
                    if (!response.ok) {
                      throw new Error("Network response was not ok");
                    }
            
                    const data = await response.json();
                    console.log("Success:", data);
                    alert("File uploaded successfully");
                  } catch (error) {
                    console.error("Error:", error);

                  }
            
            } catch (error) {
                console.error('Error:', error);
                alert('Error: ' + error.message);
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-center font-bold text-3xl mb-6 text-gray-800">Upload Image</h2>
            <hr className="mb-6" />
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="user_avatar"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Upload Image
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="client-id"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Client Id
                    </label>
                    <input
                        type="text"
                        name="client-id"
                        id="client-id"
                        autoComplete="client-id"
                        placeholder="Client Id"
                        value={clientId}
                        onChange={handleClientIdChange}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        onClick={() => { setSelectedFile(null); setClientId(''); }}
                        className="rounded-md border border-rose-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Save
                    </button>
                </div>
                {isLoading && (
                    <div className="flex justify-center mt-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900"></div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default UploadImageForm;
