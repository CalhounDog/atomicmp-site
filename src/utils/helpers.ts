// 100,000 -> 2048
// -100,000 -> 0

interface IPlayerCoords {
  x_pos: number;
  y_pos: number;
}

function playerCoordsToImg({ x_pos, y_pos }: IPlayerCoords): {x: number, y: number} {
  const ratio = (200000/ 2048)
  const x = (x_pos + 100000) / ratio;
  const y = (y_pos + 100000) / ratio;
  return {
    x, y
  }
}

export {
  playerCoordsToImg
}