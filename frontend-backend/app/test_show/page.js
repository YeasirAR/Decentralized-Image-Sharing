'use client'
import { useState } from 'react';

const MyImagePage = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShow = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://519a-35-221-136-122.ngrok-free.app/get_decrypted_image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ipfs_url: "https://ipfs.io/ipfs/QmTKg7RaAqrpw1pidBjSh88yeNzU9ekLg4MueCef2zMY7d",
            encryption_key: "0b811ec80b8f2cc5f46aab6f8a0c7024215dbb047be0a7234dea059d27953647"
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setImageSrc(`data:image/jpeg;base64,${data.decrypted_image}`);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching decrypted image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleShow}>Fetch Decrypted Image</button>
      {isLoading && <div>Loading...</div>}
      {showModal && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50"></div>
          <div className="relative z-10 w-4/5 sm:w-3/5 md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white rounded-lg overflow-hidden">
            <span className="absolute top-0 right-0 cursor-pointer text-gray-500 hover:text-gray-700 mr-4 mt-2" onClick={() => setShowModal(false)}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </span>
            <img src={imageSrc} alt="Decrypted" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyImagePage;
