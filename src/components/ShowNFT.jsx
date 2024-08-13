import { FaTimes } from 'react-icons/fa';
import { setGlobalState, useGlobalState } from '../store';
import Identicon from 'react-identicons';

const imgHero = "https://imgs.search.brave.com/s58zFoiKHZ_pkUcR00gwmrzw33Pbacl3LnDmGFhm658/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzMwMTMx/MTMvc2NyZWVuc2hv/dHMvMTYxMzMxNjgv/bWVkaWEvM2RjZTQ1/ZTQxMmVhMzMyYjIw/YWRmZTIzNmEzNGEx/YjguanBnP3Jlc2l6/ZT00MDB4MzAwJnZl/cnRpY2FsPWNlbnRl/cg";

const ShowNFT = () => {
  const [modal] = useGlobalState('showModal');

  const closeModal = () => {
    setGlobalState('showModal', 'scale-0');
  };

  const onChangePrice = () => {
    setGlobalState('showModal', 'scale-0');
    setGlobalState('updateModal', 'scale-100');
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex justify-between items-center text-gray-400">
          <p className='font-semibold'>Buy NFT</p>
          <button
            type="button"
            onClick={closeModal}
            className="border-0 transparent focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex justify-center items-center rounded-xl mt-5">
          <div className="shrink-0 h-40 w-40 rounded-xl overflow-hidden">
            <img
              className="h-full w-full object-cover cursor-pointer"
              src={imgHero}
              alt="NFT"
            />
          </div>
        </div>
        <div className="flex flex-col justify-start rounded-xl mt-5">
          <h4 className='text-white font-semibold'>Title</h4>
          <p className='text-gray-400 text-xs my-1'> 
            The original monuments of this 11th-century temple were built around a moat.
          </p>
          <div className="flex justify-between items-center mt-3 text-white">
            <div className="flex justify-start items-center">
              <Identicon className="h-10 w-10 object-contain rounded-t-full mr-3" string="ownerAddress" size={50} />
              <div className="flex flex-col justify-center items-start">
                <small className="text-white font-bold">@owner</small>
                <small className="text-pink-800 font-semibold">0x31....031f2</small>
              </div>
            </div>
            <div className='flex flex-col text-white'>
              <small className="text-xs">Current Price </small>
              <p className= 'text-sm font-semibold'>0.34ETH</p>
            </div>
          </div>
        </div>
        <button className="flex justify-center items-center shadow-lg shadow-black text-white p-2 mt-5 w-full bg-[#e32970] hover:bg-[#bd255f] rounded-full">
          Purchase
        </button>
        <button
          className="flex justify-center items-center shadow-lg shadow-black text-white p-2 mt-5 w-full bg-[#e32970] hover:bg-[#bd255f] rounded-full"
          onClick={onChangePrice}
        >
          Change Price
        </button>
      </div>
    </div>
  );
};

export default ShowNFT;
