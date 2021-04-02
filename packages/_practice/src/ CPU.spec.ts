export {}

describe("CPU", () => {
  it("can add", () => {
    const cpu = new CPU()
    cpu.mov("EAX", 1)
    expect(cpu.EAX).toEqual(1)
    cpu.add(2)
    expect(cpu.EAX).toEqual(3)
  })
})

class CPU {
  public EAX: number

  constructor() {
    this.EAX = 0
  }

  mov(registerName: string, value: number): void {
    // @ts-ignore
    this[registerName] = value
  }

  add(value: number): void {
    this.EAX += value
  }
}
