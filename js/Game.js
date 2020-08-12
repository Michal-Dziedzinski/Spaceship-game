import { Spaceship } from './Spaceship.js';

class Game {
  #domElements = {
    container: document.querySelector('[data-container]'),
    spaceship: document.querySelector('[data-spaceship]'),
  };
  #ship = new Spaceship(
    this.#domElements.spaceship,
    this.#domElements.container
  );
  #checkPositionsInterval = null;

  init() {
    this.#ship.init();
    this.#newGame();
  }
  #newGame() {
    this.#checkPositionsInterval = setInterval(() => this.#checkPositions(), 1);
  }
  #checkPositions() {
    this.#ship.missiles.forEach((missile, missileIndex, missileArr) => {
      const missilePosition = {
        top: missile.element.offsetTop,
        right: missile.element.offsetLeft + missile.element.offsetWidth,
        bottom: missile.element.offsetTop + missile.element.offsetHeight,
        left: missile.element.offsetLeft,
      };
      if (missilePosition.bottom < 0) {
        missile.remove();
        missileArr.splice(missileIndex, 1);
      }
    });
  }
}

window.onload = function () {
  const game = new Game();

  game.init();
};
