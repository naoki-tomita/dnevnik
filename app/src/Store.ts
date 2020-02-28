import { createStore } from "zheleznaya";

export interface Article {
  id: string;
  title: string;
  body: string;
}

export interface Comment {
  id: string;
  name?: string;
  comment: string;
}

interface Store {
  route: string;
  user: {
    name: string;
  } | undefined;
  articles: Article[],
  currentArticle: (Article & { comments: Comment[] }) | undefined;
  commentInput: {
    name: string;
    comment: string;
  },
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
  route: "",
  user: undefined,
  articles: [],
  currentArticle: undefined,
  commentInput: {
    name: "",
    comment: "",
  },
  editor: {
    title: "",
    body: "",
  },
  login: {
    id: "",
    password: "",
  }
});
