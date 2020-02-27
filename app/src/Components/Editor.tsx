import { h, Component } from "zheleznaya";
import { store } from "../Store";
import { sendArticle } from "../Actions";

export const Editor: Component = () => {
  return (
    <div class="editor">
      <div>
        <input
          value={store.editor.title}
          oninput={(e) => store.editor.title = (e.target as HTMLInputElement).value}
        />
      </div>
      <div>
        <textarea
          value={store.editor.body}
          oninput={(e) => store.editor.body = (e.target as HTMLInputElement).value}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onclick={() => sendArticle(store.editor.title, store.editor.body)}
          disabled={!store.editor.title || !store.editor.body}
        >
          Send
        </button>
      </div>
    </div>
  );
}
