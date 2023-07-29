const OtherUserMessage = ({ content, sender }) => {
  return (
    <div className="flex m-4 p-4 flex-col items-start">
      <div>{sender}</div>
      <div className="bg-slate-700  rounded-lg p-4 text-white">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default OtherUserMessage;
