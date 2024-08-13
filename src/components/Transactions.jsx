import { BiTransfer } from 'react-icons/bi';
import { useGlobalState, truncate } from '../store';

const Transactions = () => {
  return (
    <div className="bg-[#151c25]">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase text-gradient">
          Latest Transactions
        </h4>
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
            {Array(4)
              .fill()
              .map((tx, i) => (
                <Transaction key={i} tx={i + 1} />
              ))}
          </div>
          <div className="text-center my-5">
            <button className="shadow-lg shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Transaction = ({ tx }) => (
  <div className="flex justify-between items-center border border-pink-500 text-gray-400 w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
    <div className="rounded-md shadow-sm shadow-pink-500 p-2">
      <BiTransfer className="text-white text-3xl" />
    </div>
    <div className="flex flex-col ml-2">
      <h4 className="text-sm">#{tx} Fund Transferred</h4>
      <small className="flex justify-start items-center">
        <span className="mr-1">Received by</span>
        <span className="text-gray-500">0x1234...5678</span>
        <span className="ml-2 text-pink-500">0.5 ETH</span>
      </small>
    </div>
  </div>
);

export default Transactions;
