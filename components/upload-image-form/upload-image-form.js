'use client';
import React, { useState } from 'react';

const UploadImageForm = (props) => {
    const { user_email, blockchain_backend, ml_backend } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [clientId, setClientId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingSteps, setLoadingSteps] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleClientIdChange = (e) => {
        setClientId(e.target.value);
    };

    const handleSubmit = async (e) => {
        const startTime = new Date();
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select a file.");
            return;
        }

        setIsLoading(true);
        setLoadingSteps("Extracting features from image...\nEncrypting image using AES256...\nUploading encrypted image to IPFS...");

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(`${ml_backend}/get_fm_en_ipfs`, {
                method: 'POST',
                body: formData,
                headers: {}
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(`Time taken by get_fm_en_ipfs: ${new Date() - startTime} ms`);

            try {
                const startTime2 = new Date();
                setLoadingSteps("Uploading feature_map encryption_key and IPFS_hash to blockchain...");

                const res = await fetch(`${blockchain_backend}/api/insertEncrKeyIpfs`, {
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
                console.log(`Time taken by insertEncrKeyIpfs: ${new Date() - startTime2} ms`);

                try {
                    const startTime3 = new Date();
                    const res = await fetch('/api/update/org_count', {
                        method: 'POST',
                        body: JSON.stringify({
                            email: user_email
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const resData = await res.json();
                    console.log(`Time taken by org_count: ${new Date() - startTime3} ms`);

                } catch (error) {
                    console.error('Error:', error);
                    alert('Error: ' + error.message);
                }

            } catch (error) {
                console.error('Error:', error);
                alert('Error: ' + error.message);
            }

            console.log(`Total time taken by handleSubmit: ${new Date() - startTime} ms`);
            alert('Block created successfully');
            setSelectedFile(null);
            setClientId('');
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
                    <div className="flex flex-col items-center mt-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900 mb-2"></div>
                        <div className="text-sm text-gray-600 whitespace-pre-line">{loadingSteps}</div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default UploadImageForm;
