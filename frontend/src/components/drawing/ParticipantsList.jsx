import React from "react";

const ParticipantsList = ({ participants }) => (
  <article className="w-full p-4 overflow-y-auto bg-white border-2 border-gray-400 rounded-lg dark:bg-gray-700 dark:border-gray-600 max-h-40">
    <p className="mb-2 text-lg dark:text-gray-100">&lt;응모자 목록&gt;</p>
    {participants && Array.isArray(participants) ? (
      participants.map((participant, index) => (
        <dd key={index} className="m-2 text-gray-700 dark:text-gray-300">
          {participant.name} ({participant.email}) - {participant.phone}
        </dd>
      ))
    ) : (
      <p>응모자 정보가 없습니다.</p>
    )}
  </article>
);

export default ParticipantsList;
