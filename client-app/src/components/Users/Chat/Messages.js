import React, { useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { getMessages, newMessages, getSingleDoctor } from '../../../Helpers/userHelper';
import SelectedUser from './SelectedUser';
import Welcome from './Welcome';
import { format } from 'timeago.js'
import CloudinaryWidget from '../../Doctors/Chat/CloudinaryWidget';

const Messages = ({ chat, currentUserId, setSendMessage, recieveMessage, sendMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessages] = useState({ type: '', data: '' });
  const [selectedImage, setSelectedImage] = useState(null);

  const scroll = useRef();
  const chatArea = useRef();

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.conversationId === chat._id) {
      setMessages([...messages, recieveMessage])
    }
  }, [recieveMessage])

  // fetch data;
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const user = await getSingleDoctor(userId)
        setUserData(user?.data);
      } catch (error) {
        return error;
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(chat?._id);
        setMessages(data?.data?.messages);
      } catch (error) {
        return error;
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat, sendMessage]);

  const handleChange = (e) => {
    setNewMessages({ type: 'text', data: e.target.value });
  }

  const handleSend = async (e) => {
    e.preventDefault();

    // Trim the message data and check if it is empty
    const trimmedMessageData = newMessage?.data?.trim();
    if (!trimmedMessageData) {
      return; // Exit the function if the message is empty
    }

    const message = {
      sender: currentUserId,
      text: { type: newMessage.type, data: trimmedMessageData },
      conversationId: chat?._id
    }

    try {
      const { data } = await newMessages(message);
      setNewMessages({ type: '', data: '' });
      setMessages((prevMessages) => [...prevMessages, data?.messages]);
    } catch (error) {
      return error;
    }

    const recieverId = chat.members.find((id) => id !== currentUserId);
    setSendMessage({ ...message, recieverId });
  }

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);

  return (
    <>
      {userData ? (
        <>
          <SelectedUser userData={userData} />
          <div className="basis-4/6 mb-20 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }} ref={chatArea}>
            <div className="">
              <div className="message-area mt-4 px-4">
                {messages.map((message, index) => {
                  return (
                    <div key={index} ref={index === messages.length - 1 ? scroll : null}>
                      {message?.sender === currentUserId ? (
                        <div className="send-chat flex justify-end">
                          <div className="px-5 mb-2 bg-gray-200 text-slate-500 py-2 text-sm max-w-[80%] rounded font-light">
                            {message?.text?.type === 'image' ? (
                              <img
                                className="h-36 cursor-pointer"
                                src={message?.text.data}
                                alt="userSendMessage"
                                onClick={() => setSelectedImage(message?.text.data)}
                              />
                            ) : (
                              <p>{message?.text?.data}</p>
                            )}
                            <span className="text-xs text-gray-400">{format(message?.createdAt)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="receive-chat flex justify-start">
                          <div className="px-5 mb-2 bg-violet-400 text-white py-2 text-sm max-w-[80%] rounded font-light">
                            <i className="fa fa-caret-up text-violet-400 -top-2 absolute"></i>
                            {message.text.type === 'image' ? (
                              <img
                                className="h-36 cursor-pointer"
                                src={message?.text?.data}
                                alt="userSendMessage"
                                onClick={() => setSelectedImage(message?.text?.data)}
                              />
                            ) : (
                              <p>{message?.text?.data}</p>
                            )}
                            <span className="text-xs text-white-400">{format(message?.createdAt)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* input */}
              <div className="bg-gray-100 fixed bottom-0 w-2/3 pl-4 mb-2 flex flex-row justify-between items-center">
                <input
                  className="w-full bg-gray-100 pt-3 mb-3 focus:outline-none font-light"
                  placeholder="Write a message"
                  onChange={handleChange}
                  value={newMessage?.data}
                />
                <div className='text-white font-bold py-2 px-4 rounded h-full mr-3'>
                  <CloudinaryWidget currentUserId={currentUserId} chat={chat} newMessages={newMessages} setSendMessage={setSendMessage} setMessages={setMessages} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-full mr-3" onClick={handleSend}>
                  <FiSend size={24} color="white" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Welcome />
      )}

      {selectedImage && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-75 z-50">
          <img className="max-h-screen max-w-full" src={selectedImage} alt="fullWidthImage" />
          <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setSelectedImage(null)}>
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default Messages;
