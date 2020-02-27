import { h } from "zheleznaya";
import { store } from "../Store"

export const Articles = () => {
  return (
    <ul>
      {store.articles.map(it =>
        <li>
          <h3>{it.title}</h3>
          {it.body.split("\n").map(it => <p>{it}</p>)}
        </li>
      )}
    </ul>
  );
}
