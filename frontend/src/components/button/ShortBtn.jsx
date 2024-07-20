export default function ShortButton({ text }) {
  return (
    <div className="text-center ">
      <div className="bg-black pl-5 m-2 pr-5 text-[#fff] border-2 border-black rounded-md p-2 inline-block">
        {text}
      </div>
    </div>
  );
}
