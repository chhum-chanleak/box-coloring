"use strict";
class Container {
    // Private constructor prevents direct instantiation from outside the class.
    constructor() {
        console.log("Instance has been created");
        this._className = "";
    }
    // Static method to provide access to the instance.
    static getInstance() {
        if (!Container.instance) {
            // Create instance if there is no instance.
            Container.instance = new Container();
        }
        return Container.instance;
    }
    get className() {
        return this._className;
    }
    set className(value) {
        this._className = value;
    }
    showDetail() {
        console.log("Hello, world!");
    }
}
