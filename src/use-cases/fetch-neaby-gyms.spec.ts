import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsUseCase } from "./fetch-neaby-gyms"

let gysmRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gysmRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gysmRepository)
  })
  it("should be able to fetch nearby gyms", async () => {
    await gysmRepository.create({
      title: "Near Gym",
      description: "",
      phone: "",
      latitude: -9.4047788,
      longitude: -38.2037446,
    })
    await gysmRepository.create({
      title: "Far Gym",
      description: "",
      phone: "",
      latitude: -9.7362715,
      longitude: -38.1386857,
    })

    const { gyms } = await sut.execute({
      userLatitude: -9.4047788,
      userLongitude: -38.2037446,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })])
  })
})
