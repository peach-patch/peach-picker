import React, { useState } from "react";
import Image from "next/image";
import profile1 from "../../images/choi.png";
import profile2 from "../../images/kim.png";
import profile3 from "../../images/doggy.jpg";
import { FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    id: 1,
    name: "최형우",
    role: "Backend",
    image: profile1,
    github: "https://github.com/maewakka",
    description: `
     서버의 신
    `,
  },
  {
    id: 2,
    name: "김지홍",
    role: "Backend",
    image: profile2,
    github: "https://github.com/kjh95044",
    description: `
      운동하는 건강한 개발자
    `,
  },
  {
    id: 3,
    name: "박소윤",
    role: "Frontend",
    image: profile3,
    github: "https://github.com/soyoon26",
    description: `
      사용자 경험과 UI/UX 개선을 위한 웹 및 모바일 애플리케이션의 인터페이스를 설계하고 개발합니다.
      사용자 친화적인 인터페이스와 인터랙티브 요소를 구현하여 최고의 사용자 경험을 제공하고자 합니다.
    `,
  },
];

const Index = () => {
  const [selectedMember, setSelectedMember] = useState(teamMembers[0]);

  return (
    <div className="p-10 bg-gradient-to-b from-rose-100 to-rose-200 min-h-screen flex flex-col items-center">
      <div className="font-bold text-3xl m-4">기업 정보</div>
      <div className="font-bold text-sm  mb-10">팀원</div>
      <div className="flex justify-center space-x-10 mb-10">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className={`flex flex-col items-center cursor-pointer ${
              selectedMember.id === member.id
                ? "text-rose-400"
                : "text-gray-700"
            }`}
            onClick={() => setSelectedMember(member)}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 transition-all duration-300">
              <Image
                src={member.image}
                alt={member.name}
                width={96}
                height={96}
                className={`object-cover rounded-full w-full h-full ${
                  selectedMember.id === member.id
                    ? "border-rose-400"
                    : "border-gray-300"
                }`}
              />
            </div>
            <div className="mt-2 text-center">
              <div className="font-bold">{member.name}</div>
              <div className="text-sm">{member.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center text-center space-y-4 bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <Image
          src={selectedMember.image}
          alt={selectedMember.name}
          width={150}
          height={150}
          className="rounded-full object-cover"
        />
        <div className="text-2xl font-bold">{selectedMember.name}</div>
        <div className="text-lg text-rose-400">{selectedMember.role}</div>
        <p className="max-w-md text-gray-700">{selectedMember.description}</p>

        <a
          href={selectedMember.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-grya-500 hover:text-gray-500 flex items-center space-x-2"
        >
          <FaGithub size={24} />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default Index;
