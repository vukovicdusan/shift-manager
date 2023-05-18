"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface Props {
  children: ReactNode;
}

const ProviderComponent = (props: Props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default ProviderComponent;
