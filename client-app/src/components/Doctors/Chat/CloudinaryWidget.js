import React, { useEffect } from "react";

const CloudinaryWidget = ({currentUserId,chat, newMessages, setSendMessage, setMessages}) => {
  useEffect(() => {
    const cloudName = "dpswips7e"; // replace with your own cloud name
    const uploadPreset = "webDoc"; // replace with your own upload preset


    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          const message = {
            sender: currentUserId,
            text: {type:"image", data: result.info.secure_url},
            conversationId: chat?._id,
          };
        
          try {
            const { data } = await newMessages(message);
            setMessages((prevMessages) => [...prevMessages, data?.messages]);
          } catch (error) {
            return error;
          }
        
          const recieverId = chat.members.find((id) => id !== currentUserId);
          setSendMessage({ ...message, recieverId });
        }
      }
    );

    const handleClick = () => {
      myWidget.open();
    };

    document.getElementById("upload_widget").addEventListener(
      "click",
      handleClick,
      false
    );

    // Cleanup function
    return () => {
      document.getElementById("upload_widget").removeEventListener(
        "click",
        handleClick,
        false
      );
    };
  }, []);

  return (
    <button id="upload_widget" className="cloudinary-button">
      Photos
    </button>
  );
};

export default CloudinaryWidget;
