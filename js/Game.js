import { Spaceship } from './Spaceship.js';

class Game {
  #domElements = {
    spaceship: document.querySelector('[data-spaceship]'),
  };
  #ship = new Spaceship(this.#domElements.spaceship);
  init() {
    this.#ship.init();
  }
}

window.onload = function () {
  const game = new Game();

  game.init();
};
