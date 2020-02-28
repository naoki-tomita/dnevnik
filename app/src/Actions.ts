import { store } from "./Store";

export async function fetchArticles() {
  const result = await fetch("/v1/articles");
  if (result.ok) {
    store.articles = await result.json();
  }
}

export async function sendArticle(title: string, body: string) {
  const result = await fetch("/v1/articles", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ body, title })
  });
  if (result.ok) {
    store.editor.title = "";
    store.editor.body = "";
    fetchArticles();
  }
}

export async function fetchUserInfo() {
  const result = await fetch("/v1/users/me");
  if (result.ok) {
    store.user = await result.json();
  }
}

export async function login() {
  const result = await fetch("/v1/users/login", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "user", password: "password" })
  });
  if (result.ok) {
    store.user = { name: "user" };
  }
}

export async function fetchArticle(id: string) {
  const result = await fetch(`/v1/articles/${id}`);
  if (result.ok) {
    console.log("set start");
    store.currentArticle = await result.json();
    console.log(store.currentArticle);
  }
}
