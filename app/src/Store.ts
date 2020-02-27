import { createStore } from "zheleznaya";

interface Article {
  id: string;
  title: string;
  body: string;
}

interface Store {
  user: {
    name: string;
  } | undefined;
  articles: Article[],
  editor: {
    title: string;
    body: string;
  },
  login: {
    id: string;
    password: string;
  }
}

export const store = createStore<Store>({
  user: undefined,
  articles: [],
  editor: {
    title: "",
    body: "",
  },
  login: {
    id: "",
    password: "",
  }
});
