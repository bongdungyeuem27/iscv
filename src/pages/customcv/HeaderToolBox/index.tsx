import React, {
  useContext,
  useState,
  useLayoutEffect,
  useRef,
  lazy,
  Suspense,
  useCallback,
  useEffect,
} from "react";
import styles from "./styles.module.scss";
import Button from "./Button";
import Logo from "./Logo/indext";
import clsx from "clsx";
import ObjectName from "./ObjectName";
import { CustomCVContext } from "../CustomCVContext";
import update from "immutability-helper";
import { useToast } from "@iscv/toast";
const DownloadModal = lazy(() => import("./DownloadModal"));
const PublishModal = lazy(() => import("./PublishModal"));
import { useLoading } from "@components/Loading";
import useToObject from "../hooks/useToObject";
import useToJson from "../hooks/useToJson";
import { postJSON, postObject } from "@apis/common/ipfs";
import { useEmployeeCV } from "@contracts/useEmployeeCV";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

const ImportBlockchain = lazy(() => import("./ImportBlockchain"));

function Index() {
  const {
    selected,
    setSelected,
    setList,
    list,
    copy,
    setCopy,
    autoCreatement,
    getNewAutoCreatement,
    setAutoCreatement,
  } = useContext(CustomCVContext);
  const toast = useToast();
  const [openModalDownload, setOpenModalDownload] = useState(false);
  const [openModalPublish, setOpenModalPublish] = useState(false);
  const [openImportBlockchain, setOpenImportBlockchain] = useState(false);
  const signer = useSelector((state: RootState) => state.auth.signer);
  const employee = useSelector((state: RootState) => state.auth.employee);
  const fileImportRef = useRef<any>();
  const loading = useLoading();
  const handleCopy = () => {
    if (list[selected]) {
      setCopy({ ...list[selected] });
      toast.success("copy", {
        // time: 30000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  const handlePaste = () => {
    if (copy) {
      let newId = getNewAutoCreatement();
      let newName = copy.type.toString();
      newName = newName[0].toUpperCase() + newName.slice(1);
      newName += " " + newId;
      let temp = {
        ...copy,
        top: copy.top + 10,
        left: copy.left + 10,
        name: newName,
      };
      setList(update(list, { $merge: { [newId]: temp } }));
      setSelected(newId);
      toast.success("paste", {
        // time: 30000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const handleDelete = () => {
    if (selected) {
      const { [selected]: _, ...newData } = list;
      setList(newData);
      setSelected(undefined);
      toast.success("delete", {
        // time: 30000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  const handleCut = () => {
    if (list[selected]) {
      setCopy({ ...list[selected] });
      const { [selected]: _, ...newData } = list;
      setList(newData);
      setSelected(undefined);
      toast.success("cut", {
        // time: 30000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  const openUpload = () => {
    fileImportRef.current!.click();
  };
  const handleDeploy = async () => {
    if (employee?.id === undefined) {
      toast.error("not have id");
      return;
    }
    loading.open();
    try {
      const cid = await postObject({
        data: useToJson(autoCreatement, list),
      }).then(async (success) => {
        if (!success.data) {
          toast.error();
          return;
        }
        return success.data;
      });

      if (!cid) {
        toast.error();
        return;
      }
      if (!signer) {
        toast.warning("not have signer");
        return;
      }
      const employeeCVContract = useEmployeeCV(signer);

      await employeeCVContract.addCV(employee?.id, cid).then(async (tx) => {
        await tx.wait();
        toast.success();
      });
    } catch (error) {
      console.log(error);
    } finally {
      loading.close();
    }
  };
  const handleChange = (e: any) => {
    if (e.target.value) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (x: any) => {
        let data = useToObject(x.target.result);
        if (data) {
          setAutoCreatement(data.autoCreatement);
          setList(data.list);
        }
      };
    }
  };

  return (
    <>
      <input
        type="file"
        id="file"
        multiple={false}
        accept="application/JSON"
        onChange={handleChange}
        ref={fileImportRef}
        style={{ display: "none" }}
      />

      <Suspense fallback={<div></div>}>
        <DownloadModal
          state={[openModalDownload, setOpenModalDownload]}
        ></DownloadModal>
        <PublishModal
          state={[openModalPublish, setOpenModalPublish]}
        ></PublishModal>
        <ImportBlockchain
          state={[openImportBlockchain, setOpenImportBlockchain]}
        ></ImportBlockchain>
      </Suspense>

      <div className={styles.container}>
        <div className={styles.left}>
          <Logo></Logo>
          <Button onClick={handlePaste} icon={"fa-thin fa-paste"}></Button>
          <Button onClick={handleCopy} icon={"fa-thin fa-copy"}></Button>

          <Button onClick={handleCut} icon={"fa-thin  fa-scissors"}></Button>
          <Button onClick={handleDelete} icon={"fa-thin fa-trash-can"}></Button>

          <Button icon=""></Button>
          <Button></Button>
          <Button></Button>
        </div>

        <div className={styles.targetContainer}>
          <ObjectName></ObjectName>
        </div>
        <div className={styles.right}>
          <Button
            onClick={() => setOpenImportBlockchain(true)}
            icon="fa-thin fa-cloud-arrow-down"
          ></Button>
          <Button onClick={openUpload} icon="fa-thin fa-file-arrow-up"></Button>
          <Button
            onClick={setOpenModalDownload}
            icon="fa-thin fa-file-arrow-down"
          ></Button>
          <Button
            onClick={() => setOpenModalPublish(true)}
            icon="fa-thin fa-upload"
          ></Button>
          <Button
            onClick={handleDeploy}
            icon="fa-thin fa-cloud-arrow-up"
          ></Button>
        </div>
      </div>
    </>
  );
}
export default Index;
