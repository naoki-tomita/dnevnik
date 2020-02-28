import { h, Component } from "zheleznaya";
import { store, Article as ArticleEntity, Comment as CommentEntity } from "../Store"
import { Link } from "../Router";
import { sendComment } from "../Actions";

export const Articles: Component = ({ articles }: { articles: ArticleEntity[] }) => {
  return (
    <ul class="articles">
      {articles.map(it => <li><Article {...it} /></li>)}
    </ul>
  );
}

export const Article: Component = (item: ArticleEntity) => {
  return (
    <div class="article-item">
      <Link href={`/${item.id}`}>
        <h3>{item.title}</h3>
      </Link>
      {item.body.split("\n").map(it => <p>{it}</p>)}
    </div>
  );
}

export const ArticlePage: Component = () => {
  if (!store.currentArticle) {
    return <div />
  }
  const { body, id, title, comments } = store.currentArticle;
  return (
    <div>
      <Article body={body} id={id} title={title} />
      <Comments items={comments} />
    </div>
  );
}

export const Comments = ({ items }: { items: CommentEntity[] }) => {
  return (
    <div class="comment-list">
      <span class="comment-title">コメント</span>
      <ul>
        {items.map(it => <li><Comment item={it} /></li>)}
      </ul>
      <CommentInput />
    </div>
  );
}

const CommentInput: Component = () => {
  return (
    <div class="editor">
      <div>
        <input
          value={store.commentInput.name}
          oninput={(e) => store.commentInput.name = (e.target as HTMLInputElement).value}
        />
      </div>
      <div>
        <textarea
          value={store.commentInput.comment}
          oninput={(e) => store.commentInput.comment = (e.target as HTMLInputElement).value}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onclick={() => sendComment(store.route.replace("/", ""), store.commentInput.name, store.commentInput.comment)}
          disabled={!store.commentInput.comment}
        >
          Send
        </button>
      </div>
    </div>
  );
}

const Comment: Component = ({ item }: { item: CommentEntity }) => {
  return (
    <div style={{ marginBottom: "8px" }}>
      {`${item.name || "名無し"}さん`}
      <div class="comment">{item.comment}</div>
    </div>
  );
}
