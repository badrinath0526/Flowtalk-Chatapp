import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      //console.log("Fetching messages for conversation:", selectedConversation?._id); // Log conversation ID

      try {
        const res = await fetch(`/api/message/${selectedConversation._id}`);
        //console.log("API response:", res); // Log entire response object

        const data = await res.json();
        //console.log("Fetched data:", data); // Log parsed JSON data

        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        //console.error("Error fetching messages:", error.message); // Log error message
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return {  loading,messages };
};

export default useGetMessages;
