import React, { memo, useRef, useEffect, useContext, useState } from "react";
import { Modal } from "@iscv/modal";
import styles from "./styles.module.scss";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";
import { CustomCVContext } from "../../CustomCVContext";
import useToJson from "../../hooks/useToJson";
import useToObject from "../../hooks/useToObject";

function Index(props: any) {
  const [open, setOpen] = props.state;
  const { autoCreatement, list, setList, setAutoCreatement } =
    useContext(CustomCVContext);
  const [listCV, setListCV] = useState();
  useEffect(() => {
    if (!open) return;
  }, [open]);
  const handleSetList = (index: any) => {
    // let result = useToObject(listCV[index].data)
    // setAutoCreatement(result.autoCreatement)
    // setList(result.list)
    // setOpen(false)
  };
  return (
    <Modal state={[open, setOpen]} title={"download"}>
      <div className={styles.container}>
        {listCV?.map((value, index) => {
          return (
            <div
              onClick={() => handleSetList(index)}
              key={index}
              className={styles.item}
            >
              <i className="fa-light fa-start"></i>
              <a>
                {" "}
                Record at{" "}
                {new Date(parseInt(value.time) * 1000).toLocaleString()}
              </a>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default memo(Index);
