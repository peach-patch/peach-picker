export default function ShortButton({ text }) {
  return (
    <div className="text-center ">
      <div className="inline-block p-2 pl-5 pr-5 m-2 text-black bg-white border-2 border-black rounded-md">
        {text}
      </div>
    </div>
  );
}
