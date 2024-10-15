class Container {
  // A static property to hold a singleton instance.
  private static instance: Container;
  // Public fields
  public _className: string;
  public _numberOfBoxes: number;
  public _currentColor: string;

  // Private constructor prevents direct instantiation from outside the class.
  private constructor() {
    console.log("Instance has been created");

    this._className = "";
    this._numberOfBoxes = 0;
    this._currentColor = "";
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

  get currentColor(): string {
    return this._currentColor;
  }

  set currentColor(color: string) {
    this._currentColor = color;
  }

  public showDetail(): void {
    console.log("Hello, world!");
  }

  // A box for container
  public createBox = ():  Element => {
    const box = document.createElement("div");

    // increase '_numberOfBoxes' by 1.
    this.increaseNumberOfBoxes();

    box.setAttribute("class", `box ${this._numberOfBoxes}`);
    box.style.cssText = `width: 20px; height: 20px; border: 1px solid #000;`;    

    return box;
  }

  // Handle event which changes background color of 'box' when hovering.
  public handleBox(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    target.style.backgroundColor = `${container.currentColor}`;
  }
}

const container = Container.getInstance();
