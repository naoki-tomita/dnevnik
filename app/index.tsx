import { h, render, Component } from "zheleznaya";
import { store } from "./src/Store";
import { Editor } from "./src/Components/Editor";
import { fetchArticles, login, fetchUserInfo } from "./src/Actions";
import { Articles } from "./src/Components/Articles";

(globalThis as any).store = store;

const App: Component = () => {
  return (
    <div class="container">
      <div class="title">
        <h1>私のブログ</h1>
        <h6>{store.user?.name || "not logged in"}</h6>
      </div>
      <div>{store.user?.name ? <Editor /> : <div />}</div>
      <Articles />
      <button onclick={() => login()}>load</button>
    </div>
  );
}

fetchArticles();
fetchUserInfo();
render(<App />);
