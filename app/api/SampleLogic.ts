export class SampleLogic {
  private num: number

  constructor() {
    this.num = 0
  }

  public hello(): string {
    return 'Hello World!'
  }

  public add(addNum: number): void {
    this.num += addNum
  }

  public get getNum(): number {
    return this.num
  }
}
