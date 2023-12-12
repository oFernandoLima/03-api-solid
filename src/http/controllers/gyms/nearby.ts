import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case"
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case"
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-neaby-gyms-use-case"

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body)

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
