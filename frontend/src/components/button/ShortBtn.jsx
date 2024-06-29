export default function ShortButton({ text }) {
  return (
    <div className="text-center ">
      <div className={`bg-[#fb5e67] text-[#fff] rounded-md p-2 inline-block`}>
        {text}
      </div>
    </div>
  );
}
