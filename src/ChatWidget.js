import { useCallback, useEffect, useRef, useState } from "react";
import { IconButton, Divider, Button, Modal } from "@mui/material";
import {
  Minimize,
  MoreHoriz,
  PersonOutline,
  AttachFile,
  Send,
  EmojiEmotionsOutlined,
  Close,
} from "@mui/icons-material";
import { sendMessage, startChat, SOCKET_CONNECTER_IO, endChat } from "./socket";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import {
  saveUserInfoToLocalStorage,
  getUserInfoFromLocalStorage,
  getMachineId,
  saveMachineId,
  getChatHistory,
  getLocationInfo,
  getBrowserInfo,
  fetchLocationInfo,
} from "./utils";
import { Box } from "@mui/system";
import { Popconfirm } from "antd";
import { useTheme } from "@emotion/react";

function MessageButton() {
  const theme = useTheme();
  const style = theme.status.minimized;
  const alignTo = theme.status.alignTo;
  const themeColor = theme.status.themeColor;
  const sideSpacing = theme.status.sideSpacing;
  const bottomsSpacing = theme.status.bottomSpacing;
  console.log("bottom spacing is ", bottomsSpacing);
  const alignStyle = alignTo === "right" ? {
    bottom: `${bottomsSpacing}px`,
    right: `${sideSpacing}px`
  }: {
    bottom: `${bottomsSpacing}px`,
    left: `${sideSpacing}px`,
  }
  return (
    <div style={alignStyle} className={`max-w-full absolute bottom-[${bottomsSpacing}px] z-10 flex items-end will-change-auto p-1 ${alignTo}-[${sideSpacing}px] justify-end bg-transparent cursor-pointer`}>
      <div className="flex min-w-0">
        {style === "bubble" ? (
          <div
            className={`flex w-[60px] h-[60px] rounded-full justify-center ml-auto relative bg-[${themeColor}]`}
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
                  fill={themeColor}
                  d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z"
                ></path>
              </svg>
            </button>
          </div>
        ) : (
          <div className={`bg-[${themeColor}] w-[320px] h-[40px] rounded-t-md text-white font-[600] px-[0.9em]`}>
            <div className="flex flex-row justify-between items-center pt-2 ">
              <div className="text-[16px]">Chat with agent</div>
              <div>
                <svg
                  viewBox="0 0 32 32"
                  className=" w-6 h-6"
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
                    fill={themeColor}
                    d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MessageWindow({ hideWindow }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef();
  const [chatHistory, setChatHistory] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Rendering hook functions
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  useEffect(() => {
    // set messsages and userinfo from axios
    (async () => {
      const chathistoryResponse = await getChatHistory();
      setChatHistory(chathistoryResponse);
      if (chathistoryResponse) {
        setMessages(chathistoryResponse.messages);
        setUserInfo({
          username: chathistoryResponse.username,
          email: chathistoryResponse.email,
        });
      }
    })();

    setTimeout(() => {
      setUserInfo(getUserInfoFromLocalStorage());
    }, 500);

    (async () => {
      SOCKET_CONNECTER_IO().on("adminMsgRev", async (data) => {
        const chathistoryResponse = await getChatHistory();
        setChatHistory(chathistoryResponse);
      });

      SOCKET_CONNECTER_IO().on("clientMsgRev", async (data) => {
        const chathistoryResponse = await getChatHistory();
        setChatHistory(chathistoryResponse);
      });

      SOCKET_CONNECTER_IO().on("startChat", async (userInfo) => {
        console.log("startchat request received", userInfo);
        saveUserInfoToLocalStorage(userInfo);
        setUserInfo(userInfo);
        const chathistoryResponse = await getChatHistory();
        setChatHistory(chathistoryResponse);
      });
    })();

    SOCKET_CONNECTER_IO().on("endChat", async (userInfo) => {
      hideWindow();
    });

    return function cleanup() {
      SOCKET_CONNECTER_IO().removeAllListeners();
    };
  }, []);

  // const addNewMessage = (message) => {
  //   console.log("messges are", messages, message);
  //   setMessages((prev) => {
  //     return [...prev, message];
  //   });
  // };
  const modalBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleEndChat = async () => {
    endChat();
    hideWindow();
  };

  const theme = useTheme();
  const darkmode = theme.palette.mode;
  const alignTo = theme.status.alignTo;
  const themeColor = theme.status.themeColor;
  const sideSpacing = theme.status.sideSpacing;
  const bottomSpacing = theme.status.bottomSpacing;

  return (
    <div
      className={
        `absolute h-[640px] w-[320px] m-2 bottom-[${bottomSpacing}px] ${alignTo}-[${sideSpacing}px] ` + darkmode
      }
    >
      <div className={`relative flex flex-col min-w-0 h-full w-full  overflow-hidden isolate rounded-lg bg-[${themeColor}] `}>
        <div className="justify-between w-full relative h-[56px] shrink-0 overflow-hidden flex-grow-0 flex flex-row items-center ">
          <IconButton aria-label="delete">
            <MoreHoriz />
          </IconButton>
          <h1 className="text-[14px] font-[700] text-gray-800 dark:text-gray-100">
            Welcome to LiveChat
          </h1>
          <div className="flex flex-row">
            <IconButton aria-label="delete" onClick={(e) => hideWindow()}>
              <Minimize />
            </IconButton>
            {chatHistory && chatHistory.activated ? (
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => handleEndChat()}
                okText="Close"
                cancelText="No"
                placement="bottomRight"
              >
                <IconButton aria-label="delete">
                  <Close />
                </IconButton>
              </Popconfirm>
            ) : null}
          </div>
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

        <div className="bg-[#e5e7eb] dark:bg-gray-800 dark:text-gray-100 w-full h-full p-[0.5em] overflow-auto">
          {chatHistory &&
            chatHistory.messages &&
            chatHistory.messages.length > 0 &&
            chatHistory.messages.map((item) => {
              if (item.type === "PreChatForm") {
                return <UserRegister userInfo={JSON.parse(item.msg)} />;
              }
              const sendTime = new Date(item.createdAt);
              const dispaySendTime = sendTime.getHours() + ":" + sendTime.getMinutes();
              return (
                <MessageRow
                  Name={item.type === "adminMessage" ? "Agent" : "You"}
                  sendTime={dispaySendTime}
                  message={item.msg}
                  isSend={item.type !== "adminMessage"}
                />
              );
            })}
          <div>
            {chatHistory && !chatHistory.activated && (
              <UserRegister userInfo={{}} />
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
        <MessageInputGroup disabled={!chatHistory.activated} />

        <Footer />
        <Modal
          disablePortal={true}
          open={isCloseModalOpen}
          onClose={(e) => setIsCloseModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalBoxStyle}>
            <div>This is sample modal</div>
          </Box>
        </Modal>
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
    if (props.userInfo.email && props.userInfo.username) {
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
    <div className="mt-[21px] rounded-[6px] bg-white p-4 m-2 dark:bg-gray-700">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleStartChat();
        }}
      >
        <PersonOutline
          sx={{ width: "42px", height: "42px" }}
          className={`mt-[-37px] rounded-full bg-[${useTheme().status.themeColor}] text-white p-[5px]`}
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
        <div className="relative flex flex-row items-center dark:text-gray-100">
          <input
            ref={messageRef}
            className="w-full pl-[1.25em] pr-[7.75em] pt-[1.25em] pb-[1em] text-[14px] focus:outline-none border-t-gray-200 border-solid border-t-[1px] dark:bg-gray-800 dark:border-t-gray-700"
            placeholder="Write a message..."
            disabled={props.disabled}
          />
          <div className="absolute right-[1rem] text-[#111111] dark:text-gray-100">
            <button onClick={(e) => console.log("emoji")}>
              <EmojiEmotionsOutlined />
            </button>
            <button onClick={(e) => console.log("attach")}>
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
    <div className="text-[12px] p-1 dark:text-gray-100">
      Powered by{" "}
      <a href="#" className="font-bold">
        Mymember.com
      </a>
    </div>
  );
};

const MessageTemplate = (props) => {
  const orientation = props.isSend ? "items-end" : "items-start";
  const theme = useTheme();
  const messageBack = props.isSend
    ? `bg-[${theme.status.themeColor}] text-white `
    : "bg-white text-black dark:bg-gray-700 dark:text-gray-100";
  return (
    <div className={"flex flex-col " + orientation}>
      <div className="text-[0.8em] text-[#707070] dark:text-gray-300">
        {props.Name + "  " + props.sendTime}
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
        <div className="text-[0.8em] text-[#707070] dark:text-gray-300">
          Delivered
        </div>
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
      });

    (async () => {
      await fetchLocationInfo();
    })();

    const browserInfo = getBrowserInfo();
    setTimeout(async () => {
      const chathistoryResponse = await getChatHistory();
      setChatHistory(chathistoryResponse);
    }, 500);
  }, []);

  const openWindow = async () => {
    const chathistoryResponse = await getChatHistory();
    setChatHistory(chathistoryResponse);
    setOpen(true);
  };

  return (
    <div>
      {!open && (
        <div onClick={() => openWindow()}>
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
