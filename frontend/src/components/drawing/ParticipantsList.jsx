import React from "react";

export default function ParticipantList({
  isRouletteFinished,
  isDrawingPassed,
  showRoulette,
  winners,
  participants,
}) {
  return (
    <div className="w-full pl-8">
      <article className="w-full p-4 overflow-y-auto bg-white border-2 border-gray-400 rounded-lg dark:bg-gray-700 dark:border-gray-600 max-h-40">
        {showRoulette && winners.length > 0 ? null : isRouletteFinished ? (
          <>
            <dt className="mb-2 text-xl font-semibold dark:text-gray-100">
              &lt;당첨자 목록&gt;
            </dt>
            {winners.length > 0 ? (
              winners.map((winner, index) => (
                <dd
                  key={index}
                  className="m-2 font-bold text-gray-700 dark:text-gray-300"
                >
                  {winner.name} ({winner.phone}) ✨
                </dd>
              ))
            ) : (
              <p>당첨자 정보가 없습니다.</p>
            )}
          </>
        ) : (
          !isDrawingPassed && (
            <>
              <dt className="mb-2 text-xl font-semibold dark:text-gray-100">
                &lt;응모자 목록&gt;
              </dt>
              {participants && participants.length > 0 ? (
                participants.map((participant, index) => (
                  <dd
                    key={index}
                    className="m-2 text-gray-700 dark:text-gray-300"
                  >
                    {participant.name} ({participant.phone})
                  </dd>
                ))
              ) : (
                <p>응모자 정보가 없습니다.</p>
              )}
            </>
          )
        )}
      </article>
    </div>
  );
}
