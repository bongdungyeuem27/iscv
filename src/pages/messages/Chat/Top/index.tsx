import React, { useState, useEffect, useContext } from "react";
import styles from "./styles.module.scss";
import Name from "../../Components/Name";
import Pin from "../../Components/Pin";

function Chat({ profile, id }: any) {
  const [appointment, setAppointment] = useState<any>([]);

  return (
    <div className={styles.top}>
      <div className={styles.info}>
        <Name avatar={profile.avatar} title={profile?.name} info={""}></Name>
        <div className={styles.tools}>
          <button className={styles.plus}>
            <i className="fa-regular fa-plus"></i>
          </button>
          <button className={styles.search}>
            <i className="fa-regular fa-search"></i>
          </button>
        </div>
      </div>
      <div>
        {appointment?.map((value: any, index: number) => {
          return <Pin key={index} {...value} {...profile}></Pin>;
        })}
      </div>
    </div>
  );
}

export default Chat;
