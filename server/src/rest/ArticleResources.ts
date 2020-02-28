import { path, root, post, Response, handle, get, auth } from "summer-framework";

const articles: Array<{
  id: string;
  title: string;
  body: string;
}> = [];

const comments: Array<{
  id: string;
  articleId: string;
  name?: string;
  comment: string;
}> = [];

@root("/v1/articles")
class ArticleResources {
  @get
  @path("")
  getList() {
    return articles;
  }

  @post
  @path("")
  post(_param: any, _query: any, body: { title: string, body: string }, { authResult }: { authResult: { loggedIn: boolean } }) {
    if (authResult.loggedIn) {
      return articles.push({ ...body, id: this.generateId() }), {};
    } else {
      throw new NotLoggedInException("Failed to post new article, because not logged in.");
    }
  }

  @get
  @path("/:id")
  getOne({ id }: { id: string }) {
    const article = articles.find(it => it.id === id);
    if (article) {
      return { ...article, comments: comments.filter(it => it.articleId === id) };
    }
    throw new NotFoundException(`Id: ${id} articles are not found.`);
  }

  @post
  @path("/:articleId/comments")
  postComment({ articleId }: { articleId: string }, _: any, body: { name?: string, comment: string }) {
    comments.push({ id: this.generateId(), articleId, ...body });
  }

  generateId() {
    return Math.random().toString(32).substring(2);
  }
}

class NotFoundException implements Error {
  name: string = "NotFoundException";
  message: string;
  stack?: string | undefined;
  constructor(message: string) {
    this.message = message;
    Error.captureStackTrace(this);
  }
}

class NotLoggedInException implements Error {
  name: string = "NotLoggedInException";
  message: string;
  stack?: string | undefined;
  constructor(message: string) {
    this.message = message;
    Error.captureStackTrace(this);
  }
}

class NotLoggedInExceptionHandler {
  @handle(NotLoggedInException)
  notLoggedIn() {
    return { status: 403, body: {} };
  }

  @handle(NotFoundException)
  notFound() {
    return { status: 404, body: {} };
  }
}
