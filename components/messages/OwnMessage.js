const OwnMessage = ({ content, sender }) => {
  return (
    <div className="flex m-5 flex-col  items-end ">
      <div>Me:</div>
      <div className="bg-blue-600 p-4 rounded-lg text-white">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default OwnMessage;
