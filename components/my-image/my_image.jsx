"use client";
import { useState, useEffect } from "react";

const MyImage = (props) => {
  const { user_email } = props;
  const [clientBlocks, setClientBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [loadingBlockId, setLoadingBlockId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchClientBlocks = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/getOwnBlock",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client: user_email,
            }),
          }
        );
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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const showImage = async (blockId, ipfs_hash, encryption_key) => {
    setLoadingBlockId(blockId);
    try {
      const res = await fetch(
        "https://e84d-34-168-222-190.ngrok-free.app/get_decrypted_image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ipfs_url: ipfs_hash,
            encryption_key: encryption_key,
          }),
        }
      );

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
      console.error("Error fetching decrypted image:", error);
    } finally {
      setLoadingBlockId(null);
    }
  };

  return (
    <>
      <div>
        {clientBlocks.map((block) => (
          <div key={block.block_id} className="grid grid-cols-2 gap-2">
            <div className="w-[130vh] p-1 mx-auto my-1 text-left bg-white border border-gray-200 shadow-lg shadow-purple-500/50 rounded-lg shadow px-8 py-4">
              {/* <h5 className="mb-2 text-3xl font-bold text-gray-900">Image Name</h5> */}
              <h3 className="mb-1 text-lg font-bold text-gray-900">Block Id : {block.block_id}</h3>
              <p className="mb-1 text-xs text-gray-900">Block hash: {block.hash}</p>
              <p className="mb-5 text-base text-gray-900 ">
                Shared With: <br />
                {block.clients.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="px-2 mr-1 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                  >
                    {c}
                  </button>
                ))}
              </p>
            </div>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => showImage(block.block_id, block.ipfs_hash, block.encryption_key)}
                className="w-full sm:w-auto px-4 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <div className="text-left rtl:text-right">
                  <div className="mb-1 text-xs">View Image</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">Click Here</div>
                </div>
              </button>
              {loadingBlockId === block.block_id && <div>Loading...</div>}
              {showModal && (
                <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-50">
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50"></div>
                  <div className="relative z-10 w-4/5 sm:w-3/5 md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white rounded-lg overflow-hidden">
                    <span
                      className="absolute top-0 right-0 cursor-pointer text-gray-500 hover:text-gray-700 mr-4 mt-2"
                      onClick={() => setShowModal(false)}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </span>
                    <img
                      src={imageSrc}
                      alt="Decrypted"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyImage;
