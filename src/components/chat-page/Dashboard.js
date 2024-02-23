import React, { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { DataContext } from "../../App";
import { environment } from "../../environment";
import s from "./Chat.module.css";
import LeftSidebar from "./LeftSidebar";
import logo from "../../assets/img/logo.png";
import User from "./User";
import pen from "../../assets/pen.gif";
import red_like from "../../assets/img/red_like.svg";
import RightSidebar from "./RightSidebar";
import { useSelector } from "react-redux";
import {
  selectIsAuth,
  selectTheme,
} from "../../scripts/store/slices/app/selectors";
import { useMeQuery } from "../../scripts/api/auth-api";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../common/progress-bar/ProgressBar";
import { selectMe } from "../../scripts/store/slices/chat/selectors";
import { useSocket } from "../../scripts/hooks/useSocket";
import { useSendMessageMutation } from "../../scripts/api/chat-api";
const Dashboard = () => {
  const BASE_URL = environment.BASE_URL;
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sendMessage] = useSendMessageMutation();
  const theme = useSelector(selectTheme);
  const me = useSelector(selectMe);
  const { socket, isConnected } = useSocket();

  const ref = useRef();
  const { data, setData } = useContext(DataContext);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am AIO assistant bot. How can I help you?",
      sender: "ChatGPT",
    },
  ]);

  const handleMessage = (data) => {
    console.log("Received a message", data);
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        message: data.query,
        sender: "user",
      },
      {
        message: data.response,
        sender: "ChatGPT",
      },
    ]);
  };

  useEffect(() => {
    if (isConnected) {
      socket.on("new chatbot message", handleMessage);
    }
  }, [isConnected]);
  const handleSend = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      return; // Ignore empty messages
    }
    scrollToBottom();
    setMessages([
      ...messages,
      {
        message: question,
        sender: "user",
      },
    ]);
    setQuestion("");
    await processMessageToChatGPT(question);
  };
  async function processMessageToChatGPT(message) {
    const query = new FormData();
    console.log(message);
    query.append("query", message);
    try {
      setIsLoading(true);
      console.log(query);
      const axiosResponse = await sendMessage(query);
      setIsLoading(false);
      const responseData = axiosResponse.data;
      console.log(responseData);
      setData(responseData);
      if (responseData.content != null) {
        setMessages([
          ...messages,
          {
            message: question,
            sender: "user",
          },
          {
            message: responseData.content,
            sender: "ChatGPT",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const scrollToBottom = () => {
    try {
      ref.current.scrollIntoView({ behavior: "smooth" });
    } catch (e) {
      console.log("sw");
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <LeftSidebar />

      <div className={`${s.container} ${s[`container_${theme}`]}`}>
        <p className={`${s.text}  ${s.bold_text}   ${s[`text_${theme}`]}`}>
          AIOChat Bot 1.0
        </p>

        <div className="flex flex-col-reverse p-0 items-start w-[80%] h-full overflow-y-auto chat-section">
          <div className="flex flex-col gap-3 w-full">
            {messages.map((message, index) =>
              message.sender === "ChatGPT" ? (
                <div>
                  <div className={`${s.message}`} key={index}>
                    <p className={` ${s[`message_${theme}`]}`}>
                      {message.message}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "40px" }}>
                    <div className={s.logo_container}>
                      <img src={logo} className={s.logo_avatar} />
                      <p className={`${s[`name_${theme}`]}`}>
                        {" "}
                        AIOBot to Joe Doe
                      </p>
                    </div>

                    {/*<img src={red_like} className={s.like}/>*/}
                  </div>
                </div>
              ) : (
                <div className={s.message_container}>
                  <div>
                    <div
                      className={`${s.my_message}`}
                      style={{ marginBottom: "15px" }}
                      key={index}
                    >
                      <p className={`${s[`message_${theme}`]}`}>
                        {message.message}
                      </p>
                    </div>
                    <User user={me} />
                  </div>
                </div>
              )
            )}
            <div ref={ref} className="-mt-3" />
          </div>
        </div>

        {isLoading && (
          <div className={s.type_container}>
            <img src={pen} />
            <span>AIOBot is typing....</span>
          </div>
        )}
        <div
          className=" w-full items-center justify-center flex"
          style={{ bottom: 0 }}
        >
          <div className={s.border}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className={`${s.input} ${s[`input_${theme}`]}`}
              placeholder="Ask me anything"
              style={{ borderRadius: "12px" }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSend(event);
                }
              }}
            />
          </div>
        </div>
        <p className={`${s.text} ${s[`text_${theme}`]}`}>
          We are constantly training our AI to provide you with the best
          results. Please be patient.
        </p>
      </div>
      <RightSidebar />
    </div>
  );
};
export default Dashboard;
