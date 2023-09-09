import { Resource, Spritesheet, Texture } from "pixi.js"

export async function createUniversalSpritesheet(
  prefix: string,
  texture: Texture<Resource>,
) {
  const frames = {
    [`${prefix}_walk_up_0`]: {
      frame: {
        x: 0,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_up_1`]: {
      frame: {
        x: 64,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_up_2`]: {
      frame: {
        x: 128,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_up_3`]: {
      frame: {
        x: 192,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_up_4`]: {
      frame: {
        x: 256,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_up_5`]: {
      frame: {
        x: 320,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_up_6`]: {
      frame: {
        x: 384,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_up_7`]: {
      frame: {
        x: 448,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_up_8`]: {
      frame: {
        x: 512,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },

    [`${prefix}_walk_left_0`]: {
      frame: {
        x: 0,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_left_1`]: {
      frame: {
        x: 64,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_left_2`]: {
      frame: {
        x: 128,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_left_3`]: {
      frame: {
        x: 192,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_left_4`]: {
      frame: {
        x: 256,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_left_5`]: {
      frame: {
        x: 320,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_left_6`]: {
      frame: {
        x: 384,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_left_7`]: {
      frame: {
        x: 448,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_left_8`]: {
      frame: {
        x: 512,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },

    [`${prefix}_walk_down_0`]: {
      frame: {
        x: 0,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_down_1`]: {
      frame: {
        x: 64,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_down_2`]: {
      frame: {
        x: 128,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_down_3`]: {
      frame: {
        x: 192,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_down_4`]: {
      frame: {
        x: 256,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_down_5`]: {
      frame: {
        x: 320,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_down_6`]: {
      frame: {
        x: 384,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_down_7`]: {
      frame: {
        x: 448,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_down_8`]: {
      frame: {
        x: 512,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },

    [`${prefix}_walk_right_0`]: {
      frame: {
        x: 0,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_right_1`]: {
      frame: {
        x: 64,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_right_2`]: {
      frame: {
        x: 128,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_right_3`]: {
      frame: {
        x: 192,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_right_4`]: {
      frame: {
        x: 256,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_right_5`]: {
      frame: {
        x: 320,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_right_6`]: {
      frame: {
        x: 384,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_right_7`]: {
      frame: {
        x: 448,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    [`${prefix}_walk_right_8`]: {
      frame: {
        x: 512,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
  }
  const animations = {
    up: [
      `${prefix}_walk_up_0`,
      `${prefix}_walk_up_1`,
      `${prefix}_walk_up_2`,
      `${prefix}_walk_up_3`,
      `${prefix}_walk_up_4`,
      `${prefix}_walk_up_5`,
      `${prefix}_walk_up_6`,
      `${prefix}_walk_up_7`,
      `${prefix}_walk_up_8`,
    ],
    left: [
      `${prefix}_walk_left_0`,
      `${prefix}_walk_left_1`,
      `${prefix}_walk_left_2`,
      `${prefix}_walk_left_3`,
      `${prefix}_walk_left_4`,
      `${prefix}_walk_left_5`,
      `${prefix}_walk_left_6`,
      `${prefix}_walk_left_7`,
      `${prefix}_walk_left_8`,
    ],
    down: [
      `${prefix}_walk_down_0`,
      `${prefix}_walk_down_1`,
      `${prefix}_walk_down_2`,
      `${prefix}_walk_down_3`,
      `${prefix}_walk_down_4`,
      `${prefix}_walk_down_5`,
      `${prefix}_walk_down_6`,
      `${prefix}_walk_down_7`,
      `${prefix}_walk_down_8`,
    ],
    right: [
      `${prefix}_walk_right_0`,
      `${prefix}_walk_right_1`,
      `${prefix}_walk_right_2`,
      `${prefix}_walk_right_3`,
      `${prefix}_walk_right_4`,
      `${prefix}_walk_right_5`,
      `${prefix}_walk_right_6`,
      `${prefix}_walk_right_7`,
      `${prefix}_walk_right_8`,
    ],
  }

  const data = {
    meta: { scale: "1" },
    frames,
    animations,
  }
  const spritesheet = new Spritesheet(texture, data)
  await spritesheet.parse()
  return spritesheet
}
