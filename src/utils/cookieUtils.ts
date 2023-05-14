import { IncomingMessage } from "http";

export function checkCookies(req: IncomingMessage ) {
  const cookies = req.headers.cookie;
  let authMarianoPets = "";

  if (cookies) {
    authMarianoPets = cookies
      .split(";")
      .filter((el) => el.includes("authpetsmariano"))[0];
  }
  return authMarianoPets ? true : false;
}
