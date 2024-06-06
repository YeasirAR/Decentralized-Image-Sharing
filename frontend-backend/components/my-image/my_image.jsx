"use client";
import { useState, useEffect } from "react";

const MyImage = ({ user_email, blockchain_backend, ml_backend }) => {
  const [clientBlocks, setClientBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [loadingBlockId, setLoadingBlockId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState("");

  useEffect(() => {
    const fetchClientBlocks = async () => {
      try {
        const response = await fetch(`${blockchain_backend}/api/getOwnBlock`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ client: user_email }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
    const startTime = new Date();
    setLoadingBlockId(blockId);
    setLoadingSteps("Fetching Encrypted image from IPFS...");
    try {
      const res = await fetch(`${ml_backend}/get_decrypted_image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ipfs_url: ipfs_hash,
          encryption_key: encryption_key,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setLoadingSteps("Decrypting image using AES256...");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setLoadingSteps("Verifying image integrity using feature map...");
      console.log(`Time taken by get_decrypted_image: ${new Date() - startTime} ms`);
      setImageSrc(`data:image/jpeg;base64,${data.decrypted_image}`);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching decrypted image:", error);
      setLoadingSteps("Error fetching decrypted image");
    } finally {
      setLoadingBlockId(null);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      {clientBlocks.map((block) => (
        <div key={block.block_id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 my-4 transition transform">
          <div className="mb-4">
            <h5 className="text-lg font-bold text-gray-800">Block Information</h5>
            <p className="text-sm text-gray-600"><b>Block Id:</b> {block.block_id}</p>
            <p className="text-sm text-gray-600"><b>Block Owner:</b> {block.owner_org}</p>
            <p className="text-sm text-gray-600"><b>Block Hash:</b> {block.hash}</p>
            <p className="text-sm text-gray-600"><b>Previous Hash:</b> {block.previous_hash}</p>
            <p className="text-sm text-gray-600"><b>Timestamp:</b> {new Date(block.timestamp).toLocaleString()}</p>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800">Shared With:</h4>
            <div className="flex flex-wrap mt-2">
              {block.clients.map((client) => (
                <span key={client} className="px-3 py-1 mr-2 mb-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full">
                  {client}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => showImage(block.block_id, block.ipfs_hash, block.encryption_key, block.feature_map)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              View Image
            </button>
            {loadingBlockId === block.block_id && (
              <div className="flex items-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 mr-2"></div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{loadingSteps}</div>
              </div>
            )}
          </div>
        </div>
      ))}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto p-4">
            <button
              className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={imageSrc} alt="Decrypted" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyImage;
