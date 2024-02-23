import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { selectIsAuth } from "../../scripts/store/slices/app/selectors";
import { useLocation, useNavigate } from "react-router-dom";

let socket;

export const useSocket = () => {
  const isAuth = useSelector(selectIsAuth);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isAuth) {
      const socketIo = io("http://34.70.151.217:5000", {
        withCredentials: true,
      });

      socketIo.on("connect", () => {
        setIsConnected(true);
        console.log("Socket connected");
      });

      // Listen for disconnect event
      socketIo.on("disconnect", () => {
        setIsConnected(false);
        console.log("Socket disconnected");
      });

      // Update socket state
      setSocket(socketIo);

      // Cleanup on unmount
      return () => {
        socketIo.disconnect();
      };
    }
  }, [isAuth]);

  return { socket, isConnected };
};
