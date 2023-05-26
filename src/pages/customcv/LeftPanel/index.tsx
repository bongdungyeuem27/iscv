import clsx from "clsx";
import {
  ResizeContent,
  ResizeHandleRight,
  ResizePanel,
} from "react-hook-resize-panel";
import "split-pane-react/esm/themes/default.css";
import Main from "./Main";
import Tab from "./Tab";
import TabContextProvider from "./TabContext";
import { tabs } from "./config";
import styles from "./styles.module.scss";

const width = "300px";
type Props = {};

function Left(props: Props) {
  // const [dimension, setDimension] = useState()

  return (
    <TabContextProvider>
      <div
        style={{}}
        className="fixed top-[48px] z-10 h-[calc(100vh-48px)] flex"
      >
        <ResizePanel initialWidth={400} minWidth={200} maxWidth={700}>
          <ResizeContent style={{}} className="h-full">
            <div id="leftPanel" className={clsx(styles.container, "h-full")}>
              <div className={styles.tabs}>
                {Object.keys(tabs).map((key) => {
                  return (
                    <Tab
                      key={key}
                      tabKey={key}
                      name={Object(tabs)[key].name}
                      icon={Object(tabs)[key].icon}
                    ></Tab>
                  );
                })}
              </div>

              <Main></Main>
            </div>
          </ResizeContent>
          <ResizeHandleRight
            className={clsx(" cursor-col-resize", styles.boderRight)}
          >
            <div
              style={{
                cursor: "col-resize",
                width: 5,
                backgroundColor: "black",
              }}
            />
          </ResizeHandleRight>
        </ResizePanel>
      </div>
    </TabContextProvider>
  );
}

export default Left;
