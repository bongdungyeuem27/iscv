import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { Modal } from "@iscv/modal";
import Question from "./Question";
import Webcam from "react-webcam";
import io from "socket.io-client";
import { API_ENDPOINT_NODEJS, IPFS_GATEWAY } from "@constants/index";
import { useToast } from "@iscv/toast";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import Timer from "./Timer";

type Props = {};

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const socket = io(API_ENDPOINT_NODEJS);

const Interview = (props: Props) => {
  const [expandVolume, setExpandVolume] = useState(false);
  const [micro, setMicro] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [running, setRunning] = useState(0);
  const toast = useToast();
  const employee = useSelector((state: RootState) => state.auth.employee);
  useEffect(() => {
    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoRef.current!.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=h264,opus",
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
      });
      mediaRecorder.ondataavailable = (event) => {
        socket.emit("chunk-interview", event.data);
      };
      mediaRecorder.onstop = () => {};

      mediaRecorderRef.current = mediaRecorder;
    }

    setupCamera();
  }, []);

  const handleRunning = () => {
    if (!mediaRecorderRef.current) {
      toast.warning("Camera chưa sẵn sàng");
      return;
    }
    if (running === 0) {
      mediaRecorderRef.current.start(500);
      socket.emit("start-interview");
      setRunning(1);
      return;
    }
    if (running === 1) {
      mediaRecorderRef.current.stop();
      socket.emit("stop-interview");
      (videoRef.current?.srcObject as any)
        ?.getTracks()
        .forEach((track: { stop: () => void }) => {
          track.stop();
        });
      setRunning(2);
      return;
    }
  };
  return (
    <main className={styles.container}>
      <div className={styles.left}>
        <div className={styles.header}>
          <h3>Lorem ipsum dolor sit amet</h3>
        </div>

        <div className={styles.invite}>
          <div className={styles.inviteLeft}>
            <div className={styles.inviteItem}>
              <i className="fa-regular fa-user-group"></i>
              <a>Invited to the call:</a>
              <div
                className={clsx(
                  styles.inviteItemIndicator,
                  styles.greenPositive
                )}
              >
                <div>6</div>
              </div>
            </div>
          </div>
          <div className={styles.inviteRight}>
            <button className={styles.inviteItem}>
              <div
                className={clsx(
                  styles.inviteItemIndicator,
                  styles.greenNegative
                )}
              >
                <i className="fa-regular fa-plus"></i>
              </div>
              <a className={styles.textGreen}>Add user to the call</a>
            </button>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.user}>
            <img src={`${IPFS_GATEWAY}${employee?.sourceImage}`} alt="user" />
            <div className={styles.userInfo}>
              <div className={styles.userInfoProfessional}>
                {employee?.professional}
              </div>
              <div className={styles.userInfoName}>{employee?.name}</div>
            </div>
          </div>
          <Timer initialMinute={15}></Timer>

          <div
            className={clsx(
              styles.volume,
              expandVolume ? styles.volumeAdjust : styles.volumeExpand
            )}
          >
            <input type="range" name="volume"></input>
            <i
              className="fa-solid fa-volume"
              onClick={() => setExpandVolume(!expandVolume)}
            ></i>
          </div>

          <div className={styles.toolBar}>
            <button className={styles.toolItem}>
              <i className="fa-solid fa-expand"></i>
            </button>
            <button
              className={styles.toolItem}
              onClick={() => setMicro(!micro)}
            >
              <i
                className={clsx(
                  "fa-solid",
                  micro ? "fa-microphone" : "fa-microphone-slash"
                )}
              ></i>
            </button>
            <button className={styles.finish}>
              {running === 0 && (
                <i className="fa-solid fa-play" onClick={handleRunning}></i>
              )}
              {running === 1 && (
                <i className="fa-solid fa-stop" onClick={handleRunning}></i>
              )}
              {running === 2 && <i className="fa-solid fa-minus"></i>}
            </button>
            <button className={styles.toolItem}>
              <i className="fa-solid fa-screencast"></i>
            </button>
            <button className={styles.toolItem}>
              <i className="fa-solid fa-gear"></i>
            </button>
          </div>

          <video className={styles.video} ref={videoRef} autoPlay></video>
        </div>
      </div>
      <div className={styles.right}>
        <Question></Question>
      </div>
    </main>
  );
};

export default Interview;
