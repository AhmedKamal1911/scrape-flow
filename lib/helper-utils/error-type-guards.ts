import { Prisma } from "@prisma/client";

export function isPrismaError(
  error: unknown
): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}
export function isErrorType(error: unknown): error is Error {
  return error instanceof Error;
}
