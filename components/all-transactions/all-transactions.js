"use client";
import { useState, useEffect } from "react";

const AllTransactions = () => {
  const [clientBlocks, setClientBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientBlocks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/getAllBlockInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
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
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h5 className="text-lg font-bold text-gray-800">All Block Informations</h5>
      {clientBlocks.map((block) => (
        <div key={block.block_id} className="bg-white border border-gray-200 rounded-lg shadow-md my-4 p-6 transition transform">
          <div className="mb-4">
          {/* <h5 className="text-lg font-bold text-gray-800">Block Informations</h5> */}
            <p className="text-sm text-gray-600"><b>Block Id:</b> {block.block_id}</p>
            <p className="text-sm text-gray-600"><b>Block Owner:</b> {block.owner_org}</p>
            <p className="text-sm text-gray-600"><b>Block Hash:</b> {block.hash}</p>
            <p className="text-sm text-gray-600"><b>Previous Hash:</b> {block.previous_hash}</p>
            <p className="text-sm text-gray-600"><b>Timestamp:</b> {new Date(block.timestamp).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTransactions;
