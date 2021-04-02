import { output as expectedOutput } from "./expected/index";
import { format } from "./format";
import { input } from "./input/index";

describe("format", () => {
  it("formats", () => {
    const output = format(input);
    expect(output).toEqual(expectedOutput);
  });
});
