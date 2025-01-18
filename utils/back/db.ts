import { PrismaClient } from "@prisma/client";

const prismaClientPropertyName = `__prevent-name-collision__prisma`;

type GlobalThisWithPrismaClient = typeof globalThis & {
  [prismaClientPropertyName]: PrismaClient;
};

const getPrismaClient = () => {
  const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
  if (!newGlobalThis[prismaClientPropertyName]) {
    newGlobalThis[prismaClientPropertyName] = new PrismaClient();
  }
  return newGlobalThis[prismaClientPropertyName];
};

export const db = getPrismaClient();
