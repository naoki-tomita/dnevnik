import { path, root, post, Response, handle, auth, get } from "summer-framework";

@root("/v1/users")
class UserResources {
  @path("/login")
  @post
  login(_params: {}, _query: {}, body: { name: string, password: string }) {
    if (body.name === "user" && body.password === "password") {
      return new Response().status(200).headers({ "set-cookie": "logged-in=user; path=/;" }).body({});
    }
    throw new FailedToLoginException("name or password are not matched.");
  }

  @path("/me")
  @get
  getMe(_a: any, _b: any, _c: any, { authResult: { name } }: { authResult: { loggedIn: boolean, name: string } }) {
    return { name };
  }

  @path("/logout")
  @post
  logout() {
    return new Response().status(200).headers({ "set-cookie": "logged-in=; path=/;" }).body({});
  }

  @auth
  verifyAuth(cookies: any) {
    return { loggedIn: cookies["logged-in"] !== "", name: cookies["logged-in"] };
  }
}

class FailedToLoginException implements Error {
  name: string = "FailedToLoginException";
  message: string;
  stack?: string | undefined;
  constructor(message: string) {
    this.message = message;
    Error.captureStackTrace(this);
  }
}

class FailedToLoginExceptionHandler {
  @handle(FailedToLoginException)
  handle<T extends Error>(_error: T) {
    return { status: 403, body: {} };
  }
}
