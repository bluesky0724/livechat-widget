import io from "socket.io-client";
import { getBrowserInfo, getMachineId, getUserInfoFromLocalStorage } from "./utils";

export const socketIo = io("http://localhost:3001", {
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
    locationInfo: localStorage.getItem("locationInfo"),
    browserInfo: JSON.stringify(getBrowserInfo()),
  });
};

export const endChat = () => {
  socketIo.emit("endChat", {
    adminId: window.__lc.license,
    machineId: getMachineId(),
  });
}


// window.jscd = {
//   screen: screenSize,
//   browser: browser,
//   browserVersion: version,
//   browserMajorVersion: majorVersion,
//   mobile: mobile,
//   os: os,
//   osVersion: osVersion,
//   cookies: cookieEnabled,
//   flashVersion: flashVersion
// };
// }