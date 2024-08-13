import { useGlobalState } from '../store'

const Loading = () => {
  const [loading] = useGlobalState('loading')

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen
      flex items-center justify-center bg-black 
      bg-opacity-50 transform transition-transform
      duration-300 ${loading.show ? 'scale-100' : 'scale-0'}`}
    >
      <div className="flex flex-col justify-center items-center bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl min-w-min py-3 px-10">
        <div className="flex justify-center items-center">
          <div className="lds-dual-ring scale-50"></div>
          <p className="text-lg text-white">Processing...</p>
        </div>
        <small className="text-center text-white">{loading.msg || 'Message...'}</small>
      </div>
    </div>
  )
}

export default Loading
