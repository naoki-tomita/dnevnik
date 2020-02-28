import { h, render, Component } from "zheleznaya";
import { store } from "./src/Store";
import { Editor } from "./src/Components/Editor";
import { fetchArticles, login, fetchUserInfo, fetchArticle } from "./src/Actions";
import { Articles, ArticlePage } from "./src/Components/Articles";
import { onRouteChange, Link } from "./src/Router";

(globalThis as any).store = store;

const App: Component = () => {
  return (
    <div class="container">
      <div class="title">
        <Link href="/">
          <h1>私のブログ</h1>
        </Link>
        <h6>{store.user?.name || "not logged in"}</h6>
      </div>
      <div>{store.user?.name ? <Editor /> : <div />}</div>
      {!(store.route === "/" || store.route === "")
        ? <ArticlePage />
        : <Articles articles={store.articles} />}
      <button onclick={() => login()}>load</button>
    </div>
  );
}

onRouteChange(async hash => {
  if (hash.match(/\/.+/)) {
    await fetchArticle(hash.replace("/", ""));
  }
  store.route = hash;
});
fetchArticles();
fetchUserInfo();
render(<App />);
