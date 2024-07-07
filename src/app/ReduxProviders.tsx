"use client";
import { Provider } from "react-redux";
import { persistor, store } from "../config/store";
import { PersistGate } from 'redux-persist/integration/react'

export function ReduxProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      {children}
      </PersistGate>
    </Provider>
  );
}
