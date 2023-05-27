import { memo, useContext, useLayoutEffect } from "react";
import { defaultStyle, defaultInTextStyle } from "../../config";
import styles from "../styles.module.scss";
import { CustomCVContext } from "../../CustomCVContext";
import update from "immutability-helper";

function TextItem({ id, data, selected }: any) {
  const { list, setList } = useContext(CustomCVContext);
  useLayoutEffect(() => {
    if (!selected) return;
    if (selected != id)
      setList(update(list, { [id]: { $merge: { typing: false } } }));
  }, [selected]);
  return (
    <div className={styles.componentText} style={defaultStyle(data)}>
      {data.typing ? (
        <input
          value={data?.content}
          type="text"
          onChange={(e) => {
            if (!selected) return;
            setList(
              update(list, { [id]: { $merge: { content: e.target.value } } })
            );
          }}
          className={styles.text}
          style={defaultInTextStyle(data)}
        ></input>
      ) : (
        <p style={defaultInTextStyle(data)} className={styles.text}>
          {data?.content || "Typing here..."}
        </p>
      )}
    </div>
  );
}

export default memo(TextItem);
