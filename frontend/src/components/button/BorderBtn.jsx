export default function BorderBtn({ text }) {
  return (
    <div className="text-center ">
      <div className={`border-[#000] bg-[#ffff] rounded-md p-2 inline-block`}>
        {text}
      </div>
    </div>
  );
}
