import { path, root, post, Response, Request, handle, auth, get } from "summer-framework";

@root("/v1/users")
class UserResources {
  @path("/login")
  @post
  login({ body }: Request<{}, {}, { name: string, password: string }>) {
    if (body.name === "user" && body.password === "password") {
      return new Response().status(200).headers({ "set-cookie": "logged-in=user; path=/;" }).body({});
    }
    throw new FailedToLoginException("name or password are not matched.");
  }

  @path("/me")
  @get
  getMe({ authResult: { name } }: Request<{}, {}, {}, { loggedIn: boolean, name: string }>) {
    return new Response().status(200).body({ name });
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
    Error.captureStackTrace(this, FailedToLoginException);
  }
}

class FailedToLoginExceptionHandler {
  @handle(FailedToLoginException)
  handle<T extends Error>(_error: T) {
    return { status: 403, body: {} };
  }
}
