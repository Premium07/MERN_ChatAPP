import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showLargeImage, setShowLargeImage] = useState(false);

  const showImage = () => {
    setShowLargeImage(true);
  };

  const hideImage = () => {
    setShowLargeImage(false);
  };

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar" onClick={showImage}>
            <div className="size-10 rounded-full relative cursor-pointer">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>
          {showLargeImage && (
            <div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50"
              onClick={hideImage}
            >
              <div className="relative">
                <img
                  className="rounded-lg max-w-full max-h-full"
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName}
                />
                {/* Close Button */}
                <button
                  className="absolute cursor-pointer top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                  onClick={hideImage}
                >
                  <X/>
                </button>
              </div>
            </div>
          )}

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-xs text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="cursor-pointer"
        >
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
