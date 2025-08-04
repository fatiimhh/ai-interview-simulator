export default function InputBar() {
  return (
    <div className="w-full max-w-md flex">
      <input
        className="flex-1 p-2 border border-gray-300 rounded-l"
        placeholder="Type your response..."
      />
      <button className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-r">
        Send
      </button>
    </div>
  );
}
