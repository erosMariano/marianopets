import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { prisma } from "../../../../lib/prisma";
const secretKey = process.env.JWT_SECRET;

interface LoginUser {
  email: string;
  password: string;
}
export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      verify(req.headers.authorization!, String(secretKey));
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
    const { email }: LoginUser = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    res.json(existingUser);
  } catch (error) {
    res.status(404).json({ message: "Usuário não existe" });
  }
});
