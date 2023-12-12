/* eslint-disable @typescript-eslint/no-empty-function */
import { Environment } from "vitest"

export default <Environment>(<unknown>{
  name: "prisma",
  async setup() {
    console.log("Setup!")

    return {
      teardown() {
        console.log("Teardown!")
      },
    }
  },
})
