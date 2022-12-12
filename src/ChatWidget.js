import { useCallback, useEffect, useRef, useState } from "react";
import { IconButton, Divider, TextField, Button } from "@mui/material";
import {
  Minimize,
  More,
  MoreHoriz,
  PersonOutline,
  Info,
  ArrowDownward,
  KeyboardArrowUpOutlined,
  KeyboardArrowDown,
  EmojiEmotions,
  AttachFile,
  Send,
  EmojiEmotionsOutlined,
} from "@mui/icons-material";
import {
  sendMessage,
  startChat,
  SOCKET_CONNECTER_IO,
  getUserInfo,
} from "./socket";

import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import {
  saveUserInfoToLocalStorage,
  getUserInfoFromLocalStorage,
  getMachineId,
  saveMachineId,
  getChatHistory,
} from "./utils";

function MessageButton() {
  return (
    <div className="max-w-full absolute bottom-0 z-10 flex items-end will-change-auto p-1 right-0 justify-end w-[84px] h-[84px] bg-transparent">
      <div className="flex min-w-0">
        <div
          className="flex w-[60px] h-[60px] rounded-full justify-center ml-auto relative bg-[#2000F0]"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
        >
          <button
            type="button"
            className="text-white bg-transparent  font-medium rounded-lg text-sm text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 "
          >
            <svg
              viewBox="0 0 32 32"
              className=" w-8 h-8"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="twitter"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFFFFF"
                d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"
              ></path>
              <path
                fill="#2000F0"
                d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageWindow({ hideWindow, chatHistory }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef();

  const [userInfo, setUserInfo] = useState({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Rendering hook functions
  useEffect(scrollToBottom, [messages]);
  useEffect(() => {
    // set messsages and userinfo from axios
    if (chatHistory) {
      setMessages(chatHistory.messages);
      setUserInfo({ username: chatHistory.username, email: chatHistory.email });
    }

    setTimeout(() => {
      setUserInfo(getUserInfoFromLocalStorage());
    }, 500);

    (async () => {
      // Socket Receive handler
      SOCKET_CONNECTER_IO().on("clientMessage", (data) => {
        console.log("new message", data);
        addNewMessage(data);
      });

      SOCKET_CONNECTER_IO().on("customerMessage", (data) => {
        console.log("new message", data);

        addNewMessage(data);
      });

      SOCKET_CONNECTER_IO().on("adminMsgRev", (data) => {
        addNewMessage({ msg: data, type: "adminMessage" });
      });

      SOCKET_CONNECTER_IO().on("clientMsgRev", (data) => {
        addNewMessage({ msg: data, type: "clientMessage" });
      });

      SOCKET_CONNECTER_IO().on("startChat", (userInfo) => {
        console.log("startchat request received", userInfo);
        saveUserInfoToLocalStorage(userInfo);
        setUserInfo(userInfo);
      });
    })();

    return function cleanup() {
      SOCKET_CONNECTER_IO().removeAllListeners();
    };
  }, []);

  const addNewMessage = (message) => {
    console.log("messges are", messages, message);
    setMessages((prev) => {
      return [...prev, message];
    });
  };

  return (
    <div className="absolute h-[640px] w-[320px] m-2 bottom-0 right-0">
      <div className="relative flex flex-col min-w-0 h-full w-full  overflow-hidden isolate rounded-lg bg-slate-100 ">
        <div className="justify-between w-full relative h-[56px] shrink-0 overflow-hidden flex-grow-0 flex flex-row items-center ">
          <IconButton aria-label="delete">
            <MoreHoriz />
          </IconButton>
          <h1 className="text-[14px] font-[700] text-[#111111]">
            Welcome to LiveChat
          </h1>
          <IconButton aria-label="delete" onClick={(e) => hideWindow()}>
            <Minimize />
          </IconButton>
        </div>
        <Divider sx={{ margin: "0px 12.8px" }} />
        {/* <div className="flex flex-row flex-grow-0 items-center p-[16px] h-[74px] text-[14px] text-ellipsis text-left">
          <Info />
          <div className="h-full w-full">
          <p className=" truncate overflow-y-hidden break-normal w-full h-full">
            Our agents are not available right now, but you can still send
            messages. We'll notify you at your email address when you get a
            reply.
          </p>
          </div>

          <IconButton aria-label="showmore" className="flex-grow-0">
            <KeyboardArrowDown />
          </IconButton>
        </div> */}
        <div className="bg-[#e5e7eb] w-full h-full p-[0.5em] overflow-auto">
          <UserRegister userInfo={userInfo} />
          {messages && messages.length > 0 && messages.map((item) => {
            return (
              <MessageRow
                Name={item.source}
                sendTime={item.createdAt}
                message={item.msg}
                isSend={item.type !== "adminMessage"}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <MessageInputGroup />
        <Footer />
      </div>
    </div>
  );
}

const UserRegister = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mailRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    console.log("props userinfo", props.userInfo);
    if (props.userInfo.email) {
      setEmail(props.userInfo.email);
      setUsername(props.userInfo.username);
      setIsSubmitted(true);
    }
  }, [props.userInfo]);

  const handleStartChat = useCallback(() => {
    // Todo: parameter validation check
    setEmail(mailRef.current.value);
    setUsername(nameRef.current.value);
    startChat({
      email: mailRef.current.value,
      username: nameRef.current.value,
    });
    mailRef.current.value = "";
    nameRef.current.value = "";
    setIsSubmitted(true);
  }, []);

  return (
    <div className="mt-[21px] rounded-[6px] bg-white p-4 m-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleStartChat();
        }}
      >
        <PersonOutline
          sx={{ width: "42px", height: "42px" }}
          className="mt-[-37px] rounded-full bg-[#1565c0] text-white p-[5px]"
        />
        {isSubmitted ? null : (
          <div className="text-start text-[14px]">
            Welcome to our LiveChat! Please fill in the form below before
            starting the chat.
          </div>
        )}
        <div className="flex flex-col items-start text-[14px] pb-[8px]">
          <div className="mb-[2px]">Name:</div>
          {isSubmitted ? (
            username
          ) : (
            <input
              ref={nameRef}
              className="w-full border-[1px] border-solid outline-none border-[#757575] appearance-none bg-[#f8f8f8] shadow-none rounded-[6px] text-[0.875rem] p-2 mx-[2px] focus:border-[#2000f0] focus:bg-white"
              style={{
                transition:
                  "border-color 100ms linear 0s, background-color 100ms linear 0s",
              }}
            />
          )}
        </div>
        <div className="flex flex-col items-start text-[14px] pb-[20px]">
          <div className="mb-[2x]">Email:</div>
          {isSubmitted ? (
            email
          ) : (
            <input
              ref={mailRef}
              className="w-full border-[1px] border-solid outline-none border-[#757575] appearance-none bg-[#f8f8f8] shadow-none rounded-[6px] text-[0.875rem] p-2 mx-[2px] focus:border-[#2000f0] focus:bg-white"
              style={{
                transition:
                  "border-color 100ms linear 0s, background-color 100ms linear 0s",
              }}
            />
          )}
        </div>
        {isSubmitted ? null : (
          <Button variant="contained" fullWidth type="submit">
            Start Chat
          </Button>
        )}
      </form>
    </div>
  );
};

const MessageRow = (props) => {
  return (
    <div className="m-2">
      <MessageTemplate {...props} />
    </div>
  );
};

const MessageInputGroup = (props) => {
  const messageRef = useRef();
  // const handleKeyPress = (e) => {
  //   if(e.cod)
  // }

  const handleSubmit = () => {
    console.log("sended message");
    sendMessage(messageRef.current.value);
    messageRef.current.value = "";
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="relative flex flex-row items-center ">
          <input
            ref={messageRef}
            className="pl-[1.25em] pr-[7.75em] pt-[1.25em] pb-[1em] text-[14px] focus:outline-none border-t-gray-200 border-solid border-[1px]"
            placeholder="Write a message..."
          />
          <div className="absolute right-[1rem] text-[#111111]">
            <button>
              <EmojiEmotionsOutlined />
            </button>
            <button>
              <AttachFile />
            </button>
            <button type="submit">
              <Send />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="text-[12px] p-1">
      Powered by{" "}
      <a href="#" className="font-bold">
        Mymember.com
      </a>
    </div>
  );
};

const MessageTemplate = (props) => {
  const orientation = props.isSend ? "items-end" : "items-start";
  const messageBack = props.isSend
    ? "bg-[#1565c0] text-white "
    : "bg-white text-black ";
  return (
    <div className={"flex flex-col " + orientation}>
      <div className="text-[0.8em] text-[#707070]">
        {props.Name + props.sendTime}
      </div>
      <div
        className={
          messageBack +
          " rounded-[6px] p-[1em] text-[14px] drop-shadow-sm text-start"
        }
      >
        {props.message}
      </div>
      {props.isSend ? (
        <div className="text-[0.8em] text-[#707070]">Delivered</div>
      ) : null}
    </div>
  );
};

// width: 100%;
// border: 1px solid rgb(117, 117, 117);
// appearance: none;
// background-color: rgb(248, 248, 248);
// color: rgb(17, 17, 17);
// font-family: inherit;
// box-shadow: none;
// transition: border-color 100ms linear 0s, background-color 100ms linear 0s;
// border-radius: 6px;
// font-size: 0.875rem;
// font-weight: normal;
// padding: 8px;
// margin: 2px 0px;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const [visitorId, setVisitorId] = useState("");
  const [chatHistory, setChatHistory] = useState({});
  useEffect(() => {
    FingerprintJS.load({})
      .then((fp) => fp.get())
      .then((result) => {
        setVisitorId(result.visitorId);
        saveMachineId(result.visitorId);
        console.log("result", result);
        console.log("machineId is ", result.visitorId);
      });

    setTimeout(async () => {
      const chathistoryResponse = await getChatHistory();
      setChatHistory(chathistoryResponse);
    }, 500);
  }, []);

  return (
    <div>
      {!open && (
        <div onClick={() => setOpen(true)}>
          <MessageButton />
        </div>
      )}
      {open && (
        <MessageWindow
          chatHistory={chatHistory}
          hideWindow={() => setOpen(false)}
        />
      )}
    </div>
  );
}
