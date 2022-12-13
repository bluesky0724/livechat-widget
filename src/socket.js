import io from "socket.io-client";
import { getMachineId, getUserInfoFromLocalStorage } from "./utils";

export const socketIo = io("https://mymember.com", {
  transports: ["websocket"],
  secure: true,
});

socketIo.connect();

socketIo.on("connect", () => {
  console.log("connected to socket server");
  setTimeout(() => {
    socketIo.emit("clientRegister", {
      adminId: window.__lc.license,
      machineId: getMachineId(),
    });    
  }, 500);

});

socketIo.on("connect_error", (err) => {
  console.log(`connect_error due to - ${err.message}`);
});

export const SOCKET_CONNECTER_IO = () => {
  // alert("My Name is ajay")
  return socketIo;
};

export const sendMessage = (message) => {
  socketIo.emit("clientMsgSend", {
    machineId: getMachineId(),
    adminId: window.__lc.license,
    userInfo: getUserInfoFromLocalStorage(),
    msg: message,
  });
};

export const startChat = (userInfo) => {
  socketIo.emit("startChat", {
    adminId: window.__lc.license,
    machineId: getMachineId(),
    userInfo: userInfo,
  });
};
