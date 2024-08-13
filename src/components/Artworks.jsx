import { useEffect, useState } from 'react';
import { setGlobalState, useGlobalState } from '../store';

const Artworks = () => {
  const [nfts]=useGlobalState('nfts')
  return (
    <div className="bg-[#151c25] gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase text-gradient">Latest Artworks</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
          {nfts.map((nft,i) => (
            <Card key ={i} nft={nft}/>
          ))}
          {Array(4).fill().map((nft, i) => (
            <Card key={i} nft={i+1} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ nft }) => {
  const openModal = () => {
    setGlobalState('showModal', 'scale-100'); // Set modal visibility
  };

  return (
    <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
      <img
        className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
        src="https://imgs.search.brave.com/s58zFoiKHZ_pkUcR00gwmrzw33Pbacl3LnDmGFhm658/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzMwMTMx/MTMvc2NyZWVuc2hv/dHMvMTYxMzMxNjgv/bWVkaWEvM2RjZTQ1/ZTQxMmVhMzMyYjIw/YWRmZTIzNmEzNGEx/YjguanBnP3Jlc2l6/ZT00MDB4MzAwJnZl/cnRpY2FsPWNlbnRl/cg"
        alt="NFT"
      />
      <h4 className="text-white font-semibold">NFT#{nft}</h4>
      <p className="text-gray-300 text-sm">
        The original monuments of this 11th-century temple were built around a moat.
        It included gopura, the main temple, its massive tower, inscriptions, frescoes, and sculptures predominantly related to Shaivism, but also of Vaishnavism and Shaktism. The temple was damaged in its history.
      </p>
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <small className="text-gray-400">Current Price</small>
          <p className="text-white font-semibold">0.34 ETH</p>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white rounded-full px-4 py-2 mt-3 hover:bg-blue-600 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Artworks;
