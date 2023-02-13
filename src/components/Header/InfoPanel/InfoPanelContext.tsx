"use client";

import React, { useRef, useState } from "react";

export type InfoPanelType = {
  panelRef?: React.MutableRefObject<null>;
  showInfoPanel?: {
    show: boolean;
    panel: number;
  };
  setShowInfoPanel?: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      panel: number;
    }>
  >;
};

export const InfoPanelContext = React.createContext<InfoPanelType>({});

type Props = {
  children: React.ReactNode;
};

export const InfoPanelProvider = (props: Props) => {
  const { children } = props;
  const panelRef = useRef(null);
  const [showInfoPanel, setShowInfoPanel] = useState({ show: false, panel: 1 });
  const data = { panelRef, showInfoPanel, setShowInfoPanel };
  return (
    <InfoPanelContext.Provider value={data}>
      {children}
    </InfoPanelContext.Provider>
  );
};
