import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";

const Navbar = ({ userName, roomId }) => {
  return (
    <nav className="flex justify-between fixed top-0 w-full mx-auto bg-slate-900 py-8 h-24">
      <h1 className="text-white font-mono font-extrabold text-3xl ml-4">
        LiveChat
      </h1>
      <div className="flex justify-end flex-col text-white mr-4">
        <div className="flex flex-row justify-center">
          <h1 className="inline text-gray-400 px-1">User:</h1>
          <h1 className="inline px-1">{userName}</h1>
        </div>
        <div className="flex flex-row justify-center">
          <h1 className="inline text-gray-400 px-1">Room:</h1>
          <h1 className="inline px-1">{roomId}</h1>
          {/* <CopyToClipboard
            text={
              typeof window !== "undefined"
                ? `${window.location.origin}/room/${roomId}`
                : ""
            }
          >
            <FaRegCopy className="mt-1" />
          </CopyToClipboard> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
