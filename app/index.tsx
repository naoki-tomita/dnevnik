import { h, render, Component } from "zheleznaya";
import { store } from "./src/Store";
import { Editor } from "./src/Components/Editor";
import { fetchArticles, login, fetchUserInfo, fetchArticle } from "./src/Actions";
import { Articles, ArticlePage } from "./src/Components/Articles";
import { onRouteChange } from "./src/Router";

(globalThis as any).store = store;

const App: Component = () => {
  return (
    <div class="container">
      <div class="title">
        <h1>私のブログ</h1>
        <h6>{store.user?.name || "not logged in"}</h6>
      </div>
      <div>{store.user?.name ? <Editor /> : <div />}</div>
      {
        !(store.route === "/" || store.route === "")
          ? <ArticlePage />
          : <Articles articles={store.articles} />
      }
      <button onclick={() => login()}>load</button>
    </div>
  );
}

onRouteChange(async hash => {
  console.log(hash);
  if (hash.match(/\/.+/)) {
    await fetchArticle(hash.replace("/", ""));
  }
  console.log("change hash");
  store.route = hash;
});
fetchArticles();
fetchUserInfo();
render(<App />);
