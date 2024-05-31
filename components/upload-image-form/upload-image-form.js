'use client';
import React, { useState } from 'react';
const UploadImageForm = (props) => {
    const { user_email } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [clientId, setClientId] = useState('');

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

        const formData = new FormData();
        formData.append('file', selectedFile);
        // formData.append('client_id', clientId);

        try {
            const response = await fetch('https://519a-35-221-136-122.ngrok-free.app/get_fm_en_ipfs', {
                method: 'POST',
                body: formData,
                headers: {}
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error:', error);
            alert('File upload failed: ' + error.message);
        }

        // todo: call blockchain api to store feature_map, encryption_key, ipfs_hash, client_id
    };
    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-center font-bold text-3xl mb-6 text-gray-800">Upload Image</h2>
            <hr className="mb-6" />
            <form onSubmit={handleSubmit}>
            <div className="mb-6">
            <label
                    htmlFor="client-id"
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
            </form>
        </div>
    );
};

export default UploadImageForm;
