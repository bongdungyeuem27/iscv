import Search from "@components/Search";
import React, { useState } from "react";

type Props = {};

const SearchBox = (props: Props) => {
  const [search, setSearch] = useState("");
  return <Search search={search} setSearch={setSearch}></Search>;
};

export default SearchBox;
