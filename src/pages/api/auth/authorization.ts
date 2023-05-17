import jwt, { JwtPayload, verify } from "jsonwebtoken";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
const secretKey = process.env.JWT_SECRET;


export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      verify(req.cookies.authpetsmariano!, String(secretKey));
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
    if (req.cookies.authpetsmariano) {
      const decoded = jwt.verify(req.cookies.authpetsmariano, String(secretKey)) as JwtPayload;

      const existingUser = await prisma.user.findUnique({
        where: { email: decoded.emailUser },
      });

      res.json({
        email: existingUser?.email,
        name: existingUser?.name,
        phone: existingUser?.phone,
      });
    }
  } catch (error) {
    res.status(404).json({ message: "Usuário não existe" });
  }
});
