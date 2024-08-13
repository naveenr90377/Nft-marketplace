import { useGlobalState, setGlobalState, setLoadingMsg, setAlert } from '../store';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const UpdateNFT = () => {
  const [modal] = useGlobalState('updateModal');
  const [price, setPrice] = useState('');
  const [imgBase64, setImgBase64] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!price) return;

    setGlobalState('updateModal', 'scale-0');
    setLoadingMsg('Updating NFT price...');

    try {
      // Example update function
      // await updateNFT({ ...nft, cost: price });
      setAlert('Price updated successfully', 'green');
    } catch (error) {
      console.error('Error updating price: ', error);
      setAlert('Update failed', 'red');
    }
  };

  const closeModal = () => {
    setGlobalState('updateModal', 'scale-0');
    resetForm();
  };

  const resetForm = () => {
    setPrice('');
    setImgBase64(null);
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 ${modal === 'scale-0' ? 'scale-0' : 'scale-100'}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-gray-400"> Candy NFT</p>
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
            <input
              type="file"
              accept="image/*"
              onChange={changeImage}
              className="ml-4"
            />
          </div>

          <label className="mt-4 text-gray-400">Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 p-2 rounded-md border border-gray-600 bg-[#1b2530] text-gray-300"
          />

          <button
            type="submit"
            className="mt-4 p-2 rounded-md bg-[#e32970] text-white"
          >
            Update Price
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNFT;
