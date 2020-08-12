import { Spaceship } from './Spaceship.js';
import { Enemy } from './Enemy.js';

class Game {
  #domElements = {
    button: document.querySelector('[data-button]'),
    score: document.querySelector('[data-score]'),
    lives: document.querySelector('[data-lives]'),
    modal: document.querySelector('[data-modal]'),
    scoreInfo: document.querySelector('[data-score-info]'),
    container: document.querySelector('[data-container]'),
    spaceship: document.querySelector('[data-spaceship]'),
  };
  #ship = new Spaceship(
    this.#domElements.spaceship,
    this.#domElements.container
  );
  #enemies = [];
  #lives = null;
  #score = null;
  #enemiesInterval = null;
  #checkPositionsInterval = null;
  #createEnemyInterval = null;

  init() {
    this.#ship.init();
    this.#newGame();
    this.#domElements.button.addEventListener('click', () => this.#newGame());
  }
  #newGame() {
    this.#domElements.modal.classList.add('hide');
    this.#enemiesInterval = 30;
    this.#lives = 3;
    this.#score = 0;
    this.#updateLivesText();
    this.#updateScoreText();
    this.#ship.element.style.left = '0px';
    this.#ship.setPosition();
    this.#createEnemyInterval = setInterval(() => this.#randomNewEnemy(), 1000);
    this.#checkPositionsInterval = setInterval(() => this.#checkPositions(), 1);
  }
  #endGame() {
    this.#domElements.modal.classList.remove('hide');
    this.#domElements.scoreInfo.textContent = `You loose! Your score is: ${
      this.#score
    }`;
    this.#enemies.forEach((enemy) => enemy.explode());
    this.#enemies.length = 0;
    clearInterval(this.#createEnemyInterval);
    clearInterval(this.#checkPositionsInterval);
  }
  #randomNewEnemy() {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    randomNumber % 5
      ? this.#createNewEnemy(
          this.#domElements.container,
          this.#enemiesInterval,
          'enemy',
          'explosion'
        )
      : this.#createNewEnemy(
          this.#domElements.container,
          this.#enemiesInterval * 2,
          'enemy--big',
          'explosion--big',
          3
        );
  }
  #createNewEnemy(...params) {
    const enemy = new Enemy(...params);
    enemy.init();
    this.#enemies.push(enemy);
  }
  #checkPositions() {
    this.#enemies.forEach((enemy, enemyIndex, enemiesArr) => {
      const enemyPosition = {
        top: enemy.element.offsetTop,
        right: enemy.element.offsetLeft + enemy.element.offsetWidth,
        bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
        left: enemy.element.offsetLeft,
      };
      if (enemyPosition.top > window.innerHeight) {
        enemy.explode();
        enemiesArr.splice(enemyIndex, 1);
        this.#updateLives();
      }
      this.#ship.missiles.forEach((missile, missileIndex, missileArr) => {
        const missilePosition = {
          top: missile.element.offsetTop,
          right: missile.element.offsetLeft + missile.element.offsetWidth,
          bottom: missile.element.offsetTop + missile.element.offsetHeight,
          left: missile.element.offsetLeft,
        };
        if (
          missilePosition.bottom >= enemyPosition.top &&
          missilePosition.top <= enemyPosition.bottom &&
          missilePosition.right >= enemyPosition.left &&
          missilePosition.left <= enemyPosition.right
        ) {
          enemy.hit();
          if (!enemy.lives) {
            enemiesArr.splice(enemyIndex, 1);
          }
          missile.remove();
          missileArr.splice(missileIndex, 1);
          this.#updateScore();
        }
        if (missilePosition.bottom < 0) {
          missile.remove();
          missileArr.splice(missileIndex, 1);
        }
      });
    });
  }
  #updateScore() {
    this.#score++;
    if (!(this.#score % 5)) {
      this.#enemiesInterval--;
    }
    this.#updateScoreText();
  }
  #updateLives() {
    this.#lives--;
    this.#updateLivesText();
    this.#domElements.container.classList.add('hit');
    setTimeout(() => this.#domElements.container.classList.remove('hit'), 100);
    if (!this.#lives) {
      this.#endGame();
    }
  }
  #updateScoreText() {
    this.#domElements.score.textContent = `Score: ${this.#score}`;
  }
  #updateLivesText() {
    this.#domElements.lives.textContent = `Lives: ${this.#lives}`;
  }
}

window.onload = function () {
  const game = new Game();

  game.init();
};
