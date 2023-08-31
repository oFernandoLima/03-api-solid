import { expect, describe, it, beforeEach } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Estevam",
      email: "estevam@email.com",
      password: "minhasenha",
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Estevam",
      email: "estevam@email.com",
      password: "minhasenha",
    })

    const isPasswordCorrectlyHashed = await compare(
      "minhasenha",
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it("should not be able to register with same email twice", async () => {
    const email = "meuemail@email.com"

    await sut.execute({
      name: "Estevam",
      email,
      password: "minhasenha",
    })

    await expect(async () =>
      sut.execute({
        name: "Estevam",
        email,
        password: "minhasenha",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
