import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET;

export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      verify(req.cookies.auth!, String(secretKey));
      return await fn(req, res);
    } catch (err) {
      res.status(500).json({ message: "Usuário não autorizado" });
    }
  };

export default authenticated(async function getPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.json("Dentro");
  } catch (error) {
    res.status(404).json({ message: "Usuário não existe" });
  }
});
