import {
  useGlobalState,
  setGlobalState,
  setLoadingMsg,
  setAlert,
} from '../store';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { create } from 'ipfs-http-client';
import { mintNFT } from '../Blockchain.service';

// IPFS setup using Alchemy
const alchemyKey = '69pyxA3pK-9NF71QrwVIB-TB6PzkJThS';
const client = create({
  host: 'ipfs.alchemyapi.io', // Update the host as per Alchemy's IPFS node
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: 'Bearer ' + alchemyKey,
  },
});

const CreateNFT = () => {
  const [modal] = useGlobalState('modal');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [imgBase64, setImgBase64] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !description || !file) {
      setAlert('All fields are required!', 'red');
      return;
    }

    setGlobalState('modal', 'scale-0');
    setGlobalState('loading', { show: true, msg: 'Uploading IPFS data...' });

    try {
      const created = await client.add(file);
      const metadataURI = `https://ipfs.io/ipfs/${created.path}`;
      const nft = { title, price, description, metadataURI };

      setLoadingMsg('Initializing transaction...');
      await mintNFT(nft);

      resetForm();
      setAlert('Minting completed...', 'green');
      window.location.reload();
    } catch (error) {
      console.log('Error uploading file: ', error);
      setAlert('Minting failed...', 'red');
    }
  };

  const changeImage = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgBase64(file);
      setFile(e.target.files[0]);
    };
  };

  const closeModal = () => {
    setGlobalState('modal', 'scale-0');
    resetForm();
  };

  const resetForm = () => {
    setFile(null);
    setImgBase64(null);
    setTitle('');
    setPrice('');
    setDescription('');
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-gray-400">Add NFT</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>

          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                alt="NFT"
                className="h-full w-full object-cover cursor-pointer"
                src={
                  imgBase64 ||
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'
                }
              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/webp"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#19212c] file:text-gray-400 hover:file:bg-[#1d2631] cursor-pointer focus:ring-0 focus:outline-none"
                onChange={changeImage}
                required
              />
            </label>
          </div>

          <label className="block mt-5">
            <span className="text-gray-300">Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400"
              placeholder="Enter title"
              required
            />
          </label>

          <label className="block mt-5">
            <span className="text-gray-300">Price</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400"
              placeholder="Enter price in ETH"
              required
            />
          </label>

          <label className="block mt-5">
            <span className="text-gray-300">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400"
              placeholder="Enter description"
              rows="4"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full px-4 py-2 mt-5 hover:bg-blue-600 transition"
          >
            Create NFT
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNFT;
