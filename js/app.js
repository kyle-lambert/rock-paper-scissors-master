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
    mainContainer: document.querySelector('.main'),
    gameScore: document.querySelector('.scoreboard__score'),
    standardTypeButton: document.getElementById('standardButton'),
    gameType: document.querySelector('.select-game'),
    userChoice: document.querySelector('.user-select'),
    computerChoice: document.querySelector('.house-select'),
    gameResult: document.querySelector('.result'),
    rules: document.querySelector('.rules')
  }

  let clearContainer = function () {
    elements.mainContainer.innerHTML = '';
  }

  let selectStandardGame = function () {
    // Prepare UI for standard game type
    clearContainer();
    // Render standard game type
    renderStandardGame();
  }

  let selectSpockGame = function () {
    alert('Gametype: Lizard Spock')
  }

  let userSelect = function (choice) {
    // Prepare UI for user choice display
    clearContainer();
    // Display user choice
    renderUserChoice(choice);
  }

  let renderHomeScreen = function () {
    const html = `
      <section class="select-game">
        <h1 class="select-game__header">Select Game Type</h1>
        <button class="btn" id="standardButton">Standard</button>
        <button class="btn" id="spockButton">Lizard Spock</button>
      </section>
    `
    elements.mainContainer.insertAdjacentHTML('beforeend', html);
  }

  let renderStandardGame = function () {
    const html = `
      <section class="user-select">
      <div class="buttons-wrap">
        <button class="btn--game btn--rock">
          <img src="images/icon-rock.svg" alt="Rock" class="buttons-wrap__img">
        </button>

        <button class="btn--game btn--paper">
          <img src="images/icon-paper.svg" alt="Paper" class="buttons-wrap__img">
        </button>

        <button class="btn--game btn--scissors">
          <img src="images/icon-scissors.svg" alt="Scissors" class="buttons-wrap__img">
        </button>
      </div>
    </section>
    `
    elements.mainContainer.insertAdjacentHTML('beforeend', html);
  }

  let renderUserChoice = function (choice) {
    const html = `
      <section class="house-select">
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
      </section>
    `
    elements.mainContainer.insertAdjacentHTML('beforeend', html);
  }

  let renderGameSection = function (userChoice, computerChoice) {
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
    clearContainer: function () {
      return clearContainer();
    },
    renderHomeScreen: function () {
      return renderHomeScreen();
    },
    selectStandardGame: function () {
      return selectStandardGame();
    },
    selectSpockGame: function () {
      return selectSpockGame();
    },
    userSelect: function (choice) {
      return userSelect(choice);
    }
  }

})();

let controller = (function (gameCtrl, UIctrl) {
  const DOMelements = UIctrl.DOMelements();

  DOMelements.mainContainer.addEventListener('click', (e) => {
    // User select game type
    if (e.target.closest('#standardButton')) {
      UIctrl.selectStandardGame();
    }
    if (e.target.closest('#spockButton')) {
      UIctrl.selectSpockGame();
    }

    if (e.target.closest('.btn--rock')) {
      UIctrl.userSelect('rock');
    };
    if (e.target.closest('.btn--paper')) {
      UIctrl.userSelect('paper');
    };
    if (e.target.closest('.btn--scissors')) {
      UIctrl.userSelect('scissors');
    };
  });

  let init = function () {
    // Prepare UI for home screen
    UIctrl.clearContainer();
    // Display home screen
    UIctrl.renderHomeScreen();
  }

  return {
    init: function () {
      return init();
    }
  }

})(gameController, UIcontroller);
controller.init();