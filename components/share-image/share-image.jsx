"use client";
import { useState, useEffect } from "react";

const ShareImage = ({ user_email }) => {
  const [clientBlocks, setClientBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [loadingBlockId, setLoadingBlockId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchClientBlocks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/getClientsBlocks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ client: user_email }),
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setClientBlocks(data.blocks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientBlocks();
  }, [user_email]);

  const showImage = async (blockId, ipfs_hash, encryption_key, feature_map) => {
    setLoadingBlockId(blockId);
    try {
      const res = await fetch("https://116a-35-221-244-230.ngrok-free.app/get_decrypted_image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ipfs_url: ipfs_hash,
          encryption_key: encryption_key,
        }),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setImageSrc(`data:image/jpeg;base64,${data.decrypted_image}`);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching decrypted image:", error);
    } finally {
      setLoadingBlockId(null);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      {clientBlocks.map((block) => (
        <div key={block.block_id} className="bg-white border border-gray-200 rounded-lg shadow-md my-4 p-6 transition transform">
          <div className="mb-4">
          <h5 className="text-lg font-bold text-gray-800">Block Informations</h5>
            <p className="text-sm text-gray-600"><b>Block Id:</b> {block.block_id}</p>
            <p className="text-sm text-gray-600"><b>Block Owner:</b> {block.owner_org}</p>
            <p className="text-sm text-gray-600"><b>Block Hash:</b> {block.hash}</p>
            <p className="text-sm text-gray-600"><b>Previous Hash:</b> {block.previous_hash}</p>
            <p className="text-sm text-gray-600"><b>Timestamp:</b> {new Date(block.timestamp).toLocaleString()}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Clients:</h4>
            <div className="flex flex-wrap mt-2">
              {block.clients.map((client) => (
                <span
                  key={client}
                  className="px-3 py-1 mr-2 mb-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => showImage(block.block_id, block.ipfs_hash, block.encryption_key, block.feature_map)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              View Image
            </button>
            {loadingBlockId === block.block_id && <div className="text-sm text-gray-600">Loading...</div>}
          </div>
        </div>
      ))}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl">
            <button
              className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={imageSrc} alt="Decrypted" className="w-full h-full object-contain p-6" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareImage;
