let gameController = (function () {

  return {
    getComputerChoice: function () {
      const options = ['rock', 'paper', 'scissors'];
      return options[Math.floor(Math.random() * 3)];
    },
  }

})();

let UIcontroller = (function () {
  const elements = {
    gameScore: document.querySelector('.scoreboard__score'),
    standardTypeButton: document.getElementById('standardButton'),
    gameType: document.querySelector('.select-game'),
    userChoice: document.querySelector('.user-select'),
    computerChoice: document.querySelector('.house-select'),
    gameResult: document.querySelector('.result'),
    rules: document.querySelector('.rules')
  }

  let renderUserChoice = function (choice) {
    const html = `
      <div class="house-select__user">
        <h2 class="house-select__header">You Picked</h2>
        <div class="dot dot--${choice}">
          <img src="images/icon-${choice}.svg" alt="${choice}" class="house-select__img">
        </div>
      </div>

      <div class="house-select__house">
        <h2 class="house-select__header">The House Picked</h2>
        <div class="dot dot--loading"></div>
      </div>
    `
    elements.computerChoice.insertAdjacentHTML('beforeend', html);
  }

  let renderGameResult = function (userChoice, computerChoice) {
    setTimeout(() => {
      const html = `
        <div class="result__user">
        <h2 class="result__header">You Picked</h2>
        <div class="dot dot--${userChoice}">
          <img src="images/icon-${userChoice}.svg" alt="${userChoice}" class="result__img">
        </div>
      </div>

      <div class="result__text-box">
        <h1 class="result__text">You Win</h1>
        <button class="btn btn--play-again">Play Again</button>
      </div>

      <div class="result__house">
        <h2 class="result__header">The House Picked</h2>
        <div class="dot dot--${computerChoice}">
          <img src="images/icon-${computerChoice}.svg" alt="${computerChoice}" class="result__img">
        </div>
      </div>
      `
      elements.gameResult.insertAdjacentHTML('beforeend', html);
    }, 3000);
  }

  return {
    DOMelements: function () {
      return elements;
    },
    addClassName: function (element, className) {
      element.classList.add(className);
    },
    removeClassName: function (element, className) {
      element.classList.remove(className);
    },
    renderUserChoice: function (choice) {
      return renderUserChoice(choice);
    },
    renderGameResult: function (userChoice, computerChoice) {
      return renderGameResult(userChoice, computerChoice);
    }
  }

})();

let controller = (function (gameCtrl, UIctrl) {
  const DOMelements = UIctrl.DOMelements();

  DOMelements.standardTypeButton.addEventListener('click', () => {
    UIctrl.removeClassName(DOMelements.gameType, 'select-game--active');
    UIctrl.addClassName(DOMelements.userChoice, 'user-select--active');
  });

  DOMelements.userChoice.querySelectorAll('.btn--game').forEach(button => {
    button.addEventListener('click', (e) => {
      const isRock = e.target.closest('.btn--rock');
      const isPaper = e.target.closest('.btn--paper');
      const isScissors = e.target.closest('.btn--scissors');

      if (isRock) {
        UIctrl.renderUserChoice('rock');
        UIctrl.renderGameResult('rock', gameCtrl.getComputerChoice());
      }
      if (isPaper) {
        UIctrl.renderUserChoice('paper');
        UIctrl.renderGameResult('paper', gameCtrl.getComputerChoice());
      }
      if (isScissors) {
        UIctrl.renderUserChoice('scissors');
        UIctrl.renderGameResult('scissors', gameCtrl.getComputerChoice());
      }

      UIctrl.removeClassName(DOMelements.userChoice, 'user-select--active');
      UIctrl.addClassName(DOMelements.computerChoice, 'house-select--active');
      setTimeout(() => {
        UIctrl.removeClassName(DOMelements.computerChoice, 'house-select--active');
        UIctrl.addClassName(DOMelements.gameResult, 'result--active');
      }, 3000)
    })
  });

  return {
    init: function () {
      UIctrl.addClassName(DOMelements.gameType, 'select-game--active');
    }
  }

})(gameController, UIcontroller);
controller.init();