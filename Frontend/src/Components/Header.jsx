
import React from "react";

const Header = () => {
  const chats = []; // Keep this empty to see the message

  return (
    <div>
      <p className="text-lg mb-6">Hello, how can I help you today?</p>

      {chats && chats.length === 0 && (
        <p className="text-lg mb-6">
          Create a new chat to continue
        </p>
      )}
    </div>
  );
};

export default Header;
