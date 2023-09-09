import { Resource, Spritesheet, Texture } from "pixi.js"

export async function createUniversalSpritesheet(texture: Texture<Resource>) {
  const frames = {
    walk_up_0: {
      frame: {
        x: 0,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_up_1: {
      frame: {
        x: 64,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_up_2: {
      frame: {
        x: 128,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_up_3: {
      frame: {
        x: 192,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_up_4: {
      frame: {
        x: 256,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_up_5: {
      frame: {
        x: 320,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_up_6: {
      frame: {
        x: 384,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_up_7: {
      frame: {
        x: 448,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_up_8: {
      frame: {
        x: 512,
        y: 8 * 64,
        w: 64,
        h: 64,
      },
    },

    walk_left_0: {
      frame: {
        x: 0,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_left_1: {
      frame: {
        x: 64,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_left_2: {
      frame: {
        x: 128,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_left_3: {
      frame: {
        x: 192,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_left_4: {
      frame: {
        x: 256,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_left_5: {
      frame: {
        x: 320,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_left_6: {
      frame: {
        x: 384,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_left_7: {
      frame: {
        x: 448,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_left_8: {
      frame: {
        x: 512,
        y: 9 * 64,
        w: 64,
        h: 64,
      },
    },

    walk_down_0: {
      frame: {
        x: 0,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_down_1: {
      frame: {
        x: 64,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_down_2: {
      frame: {
        x: 128,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_down_3: {
      frame: {
        x: 192,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_down_4: {
      frame: {
        x: 256,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_down_5: {
      frame: {
        x: 320,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_down_6: {
      frame: {
        x: 384,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_down_7: {
      frame: {
        x: 448,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_down_8: {
      frame: {
        x: 512,
        y: 10 * 64,
        w: 64,
        h: 64,
      },
    },

    walk_right_0: {
      frame: {
        x: 0,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_right_1: {
      frame: {
        x: 64,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_right_2: {
      frame: {
        x: 128,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_right_3: {
      frame: {
        x: 192,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_right_4: {
      frame: {
        x: 256,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_right_5: {
      frame: {
        x: 320,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_right_6: {
      frame: {
        x: 384,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_right_7: {
      frame: {
        x: 448,
        y: 11 * 64,
        w: 64,
        h: 64,
      },
    },
    walk_right_8: {
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
      "walk_up_0",
      "walk_up_1",
      "walk_up_2",
      "walk_up_3",
      "walk_up_4",
      "walk_up_5",
      "walk_up_6",
      "walk_up_7",
      "walk_up_8",
    ],
    left: [
      "walk_left_0",
      "walk_left_1",
      "walk_left_2",
      "walk_left_3",
      "walk_left_4",
      "walk_left_5",
      "walk_left_6",
      "walk_left_7",
      "walk_left_8",
    ],
    down: [
      "walk_down_0",
      "walk_down_1",
      "walk_down_2",
      "walk_down_3",
      "walk_down_4",
      "walk_down_5",
      "walk_down_6",
      "walk_down_7",
      "walk_down_8",
    ],
    right: [
      "walk_right_0",
      "walk_right_1",
      "walk_right_2",
      "walk_right_3",
      "walk_right_4",
      "walk_right_5",
      "walk_right_6",
      "walk_right_7",
      "walk_right_8",
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
