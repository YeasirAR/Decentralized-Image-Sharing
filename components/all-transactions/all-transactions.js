"use client";
import { useState, useEffect } from "react";
const AllTransactions = () => {
  const [clientBlocks, setClientBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientBlocks = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/getAllBlockInfo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data);

        setClientBlocks(data.blocks);
        // alert(clientBlocks);
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
  return (
    <>
      <div className="">
        {clientBlocks &&
          clientBlocks.slice(1).map((block) => (
            <div className="w-[85vh] p-4 mx-auto my-2 text-left bg-white border border-gray-200 shadow-lg shadow-purple-500/50 rounded-lg shadow sm:p-8 flex flex-col justify-between">
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Owner: {block.owner_org}
              </h3>
              <h3 className="mb-2 text-sm font-bold text-gray-900">
                Block Id: {block.block_id}
              </h3>
              <div className="flex flex-col">
                <h6 className="mb-1 text-xs text-gray-500" >
                  timestamp:{block.timestamp}
                </h6>
                <p className="mb-1 text-xs text-gray-700">
                  previous_hash: {block.previous_hash}
                </p>
                <p className="mb-1 text-xs text-gray-700">
                  Block_hash: {block.hash}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AllTransactions;
