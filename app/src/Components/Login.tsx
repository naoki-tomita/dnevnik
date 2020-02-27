import { Component, h } from "zheleznaya";
import { store } from "../Store";

export const Login: Component = () => {
  return (
    <div>
      <div>id: <input value={store.login.id} /></div>
      <div>password: <input value={store.login.password} /></div>
    </div>
  );
}
