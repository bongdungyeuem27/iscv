import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Search from "../Search";
import Item from "./Item";

function Index() {
  const [search, setSearch] = useState("");
  const [listTemplate, setListTemplate] = useState<any[]>([]);
  const onSearchKeyDown = () => {
    // console.log(e.code)
  };
  useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Search
          onChange={(e: any) => setSearch(e.target.value)}
          value={search}
          onKeyDown={onSearchKeyDown}
        ></Search>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.scrollBox}>
          {listTemplate?.map((value, index) => {
            return (
              <Item
                key={index}
                tokenId={value["tokenId"]}
                price={value["price"]}
                hashId={value["hashId"]}
                owner={value["owner"]}
              ></Item>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Index;
