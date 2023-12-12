import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeValidadeCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case"

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validadeCheckInUseCase = makeValidadeCheckInUseCase()

  await validadeCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
