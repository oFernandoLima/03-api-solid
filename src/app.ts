import { PrismaClient } from "@prisma/client"
import fastify from "fastify"

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: "Fernando",
    email: "<fernando@example.com>",
  },
})

// docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
