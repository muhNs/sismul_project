import type { Role } from "../../generated/prisma/client";

export interface AppJwtPayload {
  userId: number;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: AppJwtPayload;
    }
  }
}
