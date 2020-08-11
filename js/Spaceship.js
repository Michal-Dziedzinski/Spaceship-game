export class Spaceship {
  #modifier = 10;
  #leftArrow = false;
  #rightArrow = false;

  constructor(element) {
    this.element = element;
  }

  init() {
    this.#setPosition();
    this.#eventListeners();
    this.#gameLoop();
  }

  #setPosition() {
    this.element.style.bottom = `0px`;
    this.element.style.left = `${
      window.innerWidth / 2 -
      // this.element.offsetLeft +
      // this.element.offsetWidth / 2
      this.#getPosition()
    }px`;
  }

  #getPosition() {
    return this.element.offsetLeft + this.element.offsetWidth / 2;
  }

  #eventListeners() {
    // window.addEventListener('keydown', ({ keyCode }) => {
    //   switch (keyCode) {
    //     case 37:
    //       this.element.style.left = `${
    //         // parseInt(this.element.style.left, 10) - 10
    //         parseInt(this.element.style.left, 10) - this.#modifier
    //       }px`;
    //       break;
    //     case 39:
    //       this.element.style.left = `${
    //         // parseInt(this.element.style.left, 10) + 10
    //         parseInt(this.element.style.left, 10) + this.#modifier
    //       }px`;
    //       break;
    //   }
    // });
    window.addEventListener('keydown', ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          this.#leftArrow = true;
          break;
        case 39:
          this.#rightArrow = true;
          break;
      }
    });
    window.addEventListener('keyup', ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          this.#leftArrow = false;
          break;
        case 39:
          this.#rightArrow = false;
          break;
        // case 32:
        //   this.#shot();
        //   break;
      }
    });
  }
  #gameLoop = () => {
    this.#whatKey();
    requestAnimationFrame(this.#gameLoop);
  };
  #whatKey() {
    // if (this.#leftArrow) {
    if (
      this.#leftArrow &&
      this.#getPosition() >
        0 /* > 12 szerokość pocisku, jak dodane będzie strzelanie*/
    ) {
      this.element.style.left = `${
        parseInt(this.element.style.left) - this.#modifier
      }px`;
    }
    // if (this.#rightArrow) {
    if (
      this.#rightArrow &&
      this.#getPosition() < window.innerWidth /* + 12  < window.innerWidth */
    ) {
      this.element.style.left = `${
        parseInt(this.element.style.left) + this.#modifier
      }px`;
    }
  }
}
