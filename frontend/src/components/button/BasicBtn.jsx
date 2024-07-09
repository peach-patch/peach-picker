export default function BorderBtn({ text, bgColor, textColor }) {
  return (
    <div className="text-center ">
      <div
        className={`py-3 border-[${bgColor}]  bg-[${bgColor}] text-[${textColor}] w-full h-full font-bold rounded-md p-2 inline-block`}
      >
        {text}
      </div>
    </div>
  );
}