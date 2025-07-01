// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// export const ssprisma = globalThis.prisma ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = prisma;
// }
export {};
