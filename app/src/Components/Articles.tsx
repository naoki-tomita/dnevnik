import { h, Component } from "zheleznaya";
import { store, Article as ArticleEntity, Comment as CommentEntity } from "../Store"
import { Link } from "../Router";

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
    <ul>
      {items.map(it => <li><Comment item={it} /></li>)}
    </ul>
  );
}

const Comment = ({ item }: { item: CommentEntity }) => {
  return (
    <div>
      {`${item.name || "名無し"}さん`}
      <div class="comment">{item.comment}</div>
    </div>
  );
}
