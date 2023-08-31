import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { AuthenticateUseCase } from "./authenticate"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Estevam",
      email: "estevam@email.com",
      password_hash: await hash("minhasenha", 6),
    })

    const { user } = await sut.execute({
      email: "estevam@email.com",
      password: "minhasenha",
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should not be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      name: "Estevam",
      email: "estevam@email.com",
      password_hash: await hash("minhasenha", 6),
    })

    await expect(() =>
      sut.execute({
        email: "estevam@email.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should not be able to authenticate with wrong password", async () => {
    await expect(() =>
      sut.execute({
        email: "estevam@email.com",
        password: "minhasenha",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
