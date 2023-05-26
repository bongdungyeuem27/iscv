import { ReactNode, useState } from "react";
import ComponentGroup from "./ComponentGroup";
import LayerGroup from "./LayerGroup";
import styles from "./styles.module.scss";
import SplitPane, { Pane } from "split-pane-react";

function Index() {
  const [sizes, setSizes] = useState([100, "30%", "auto"]);

  const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div className={styles.container}>
      {/* split="vertical" sizes={sizes} onChange={setSizes} */}
      <SplitPane
        sizes={sizes}
        split="horizontal"
        sashRender={function (index: number, active: boolean): ReactNode {
          return <div></div>;
        }}
        onChange={setSizes}
      >
        <Pane minSize={100} maxSize="60%">
          <ComponentGroup style={{ ...layoutCSS }}></ComponentGroup>
        </Pane>

        <LayerGroup style={{ ...layoutCSS }}></LayerGroup>
      </SplitPane>
    </div>
  );
}

export default Index;
