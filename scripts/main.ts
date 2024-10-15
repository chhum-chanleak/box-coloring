class Container {
  // A static property to hold a singleton instance.
  private static instance: Container;
  // Public fields
  public _className: string;
  public _numberOfBoxes: number;

  // Private constructor prevents direct instantiation from outside the class.
  private constructor() {
    console.log("Instance has been created");

    this._className = "";
    this._numberOfBoxes = 0;
  }

  // Static method to provide access to the instance.
  public static getInstance(): Container {

    if (!Container.instance) {
      // Create instance if there is no instance.
      Container.instance = new Container();
    }

    return Container.instance;
  }

  get className(): string {
    return this._className;
  }

  set className(value) {
    this._className = value;
  }

  get numberOfBoxes(): number {
    return this._numberOfBoxes;
  }

  public increaseNumberOfBoxes(): void {
    this._numberOfBoxes += 1;
  }

  public showDetail(): void {
    console.log("Hello, world!");
  }
}
