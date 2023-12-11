import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidadeCheckInUseCase } from "../validate-check-in"

export function makeValidadeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const validadeCheckInUseCase = new ValidadeCheckInUseCase(checkInsRepository)

  return validadeCheckInUseCase
}
