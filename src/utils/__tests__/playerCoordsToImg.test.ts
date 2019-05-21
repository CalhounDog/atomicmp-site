import { playerCoordsToImg } from "../helpers"


describe("Player coordinates to image position converter", () => {
  it("should convert -100000,-100000 to 0,0", () => {
    const data = {
      x_pos: -100000,
      y_pos: -100000
    }

    expect(playerCoordsToImg(data)).toEqual({x: 0, y: 0})

  })
  it("should convert 0,0 to 1024,1024", () => {
    const data = {
      x_pos: 0,
      y_pos: 0
    }

    expect(playerCoordsToImg(data)).toEqual({x: 1024, y: 1024})

  })
  it("should convert 100000,100000 to 2048,2048", () => {
    const data = {
      x_pos: 100000,
      y_pos: 100000
    }

    expect(playerCoordsToImg(data)).toEqual({ x: 2048, y: 2048 })

  })
})