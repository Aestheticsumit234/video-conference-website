import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { io } from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";

const server_Url = import.meta.env.VITE_SERVER_URL;
let connections = {};

const peerConfigConnection = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const VideoMeet = () => {
  const SocketRef = useRef();
  const SocketIdRef = useRef();
  const localVideoRef = useRef();

  const [videoAvailable, setVideoAvailable] = useState(true);
  const [audioAvailable, setAudioAvailable] = useState(true);

  const [video, setVideo] = useState();
  const [audio, setAudio] = useState();

  const [screenAvailable, setScreenAvailable] = useState(true);

  const [askForUsername, setAskForUsername] = useState(true);
  const [username, setUsername] = useState("");

  const videoRef = useRef([]);
  const [videos, setVideos] = useState([]);

  const getPermissions = async () => {
    try {
      const videoPerm = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setVideoAvailable(!!videoPerm);

      const audioPerm = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setAudioAvailable(!!audioPerm);

      setScreenAvailable(!!navigator.mediaDevices.getDisplayMedia);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (stream && localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Permission error:", error);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const getUserMediaSuccess = (stream) => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
  };

  const getUserMediaStream = async () => {
    try {
      if ((video && videoAvailable) || (audio && audioAvailable)) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: video,
          audio: audio,
        });
        getUserMediaSuccess(stream);
      } else {
        const tracks = localVideoRef.current?.srcObject?.getTracks() || [];
        tracks.forEach((track) => track.stop());
      }
    } catch (err) {
      console.error("UserMedia error:", err);
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMediaStream();
    }
  }, [video, audio]);

  const getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
  };

  // TODO
  let gotMessageFromServer = (formId, message) => {
    console.log("Hello");
    
  };

  // TODO
  let addMessages = (message) => {};

  const connectToSocketServer = () => {
    SocketRef.current = io.connect(server_Url, { secure: true });
    SocketRef.connect.on("signal", gotMessageFromServer);

    SocketRef.current.on("connect", () => {
      SocketRef.current.emit("join_room", window.location.href);
      SocketIdRef.current = SocketRef.current.id;

      SocketRef.current.on("chat-message", addMessages);

      SocketRef.current.on('user-left',(id)=>{
        // TODO
      })
    });
  };
  const connect = () => {
    // if (!username.trim()) return alert("Please enter username");
    setAskForUsername(false);
    getMedia();

    // TODO: once UI done, connect socket here
    connectToSocketServer();
  };

  return (
    <div>
      {askForUsername ? (
        <div>
          <h2>Enter into Lobby</h2>

          <TextField
            id="outlined-multiline-flexible"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            multiline
            maxRows={4}
          />

          <Button variant="outlined" onClick={connect}>
            Connect
          </Button>

          <div>
            <video
              ref={localVideoRef}
              autoPlay
              muted
              style={{ width: "300px" }}
            ></video>
          </div>
        </div>
      ) : (
        <>
          <h1>waiting…</h1>
        </>
      )}
    </div>
  );
};

export default VideoMeet;
