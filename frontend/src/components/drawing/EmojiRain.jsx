import React, { useEffect, useState } from "react";

export default function EmojiRain() {
  const [emojis, setEmojis] = useState(["💰"]);
  const [emojiElements, setEmojiElements] = useState([]);

  useEffect(() => {
    const newEmojiElements = Array.from({ length: 20 }).map((_, index) => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const className = `emoji emoji-${(index % 4) + 1}`;

      return (
        <div key={index} className={className}>
          {emoji}
        </div>
      );
    });

    setEmojiElements(newEmojiElements);
  }, [emojis]);

  return <>{emojiElements}</>;
}
