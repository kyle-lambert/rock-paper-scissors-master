let gameController = (function () {
  let userScore = 0;

  const getComputerChoice = function () {
    const options = ['rock', 'paper', 'scissors'];
    return options[Math.floor(Math.random() * 3)];
  }

  return {
    getComputerChoice: function () {
      return getComputerChoice();
    },
    userScore: userScore
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
    footer: document.querySelector('.footer'),
    rulesButton: document.querySelector('.btn--rules'),
    rulesExit: document.querySelector('.btn--exit'),
    rules: document.querySelector('.rules')
  }

  let clearContainer = function () {
    elements.mainContainer.innerHTML = '';
  }

  let updateUserScore = function (score) {
    elements.gameScore.innerHTML = score;
  }

  let selectStandardGame = function () {
    clearContainer();
    renderStandardGame();
  }

  let userSelect = function (choice) {
    clearContainer();
    renderUserChoice(choice);
  }

  // let renderHomeScreen = function () {
  //   const html = `
  //     <section class="select-game">
  //       <h1 class="select-game__header">Select Game Type</h1>
  //       <button class="btn" id="standardButton">Standard</button>
  //       <button class="btn" id="spockButton">Lizard Spock</button>
  //     </section>
  //   `
  //   elements.mainContainer.insertAdjacentHTML('beforeend', html);
  // }

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

  let renderResult = function (user, computer, result) {
    let gameResult;
    if (result === 'win') {
      gameResult = 'You Win';
    } else if (result === 'lose') {
      gameResult = 'You Lose';
    } else {
      gameResult = 'It\'s a draw';
    }

    const html = `
      <section class="result">
        <div class="result__user">
          <h2 class="result__header">You Picked</h2>
          <div class="dot dot--${user}" id="userDot">
            <img src="images/icon-${user}.svg" alt="${user}" class="result__img">
          </div>
        </div>

        <div class="result__text-box">
          <h1 class="result__text">${gameResult}</h1>
          <button class="btn btn--play-again" id="playAgainButton">Play Again</button>
        </div>

        <div class="result__house">
          <h2 class="result__header">The House Picked</h2>
          <div class="dot dot--${computer}" id="computerDot">
            <img src="images/icon-${computer}.svg" alt="${computer}" class="result__img">
          </div>
        </div>
      </section>
    `
    elements.mainContainer.insertAdjacentHTML('beforeend', html);
  }

  return {
    DOMelements: function () {
      return elements;
    },
    clearContainer: function () {
      return clearContainer();
    },
    renderResult: function (user, computer, result) {
      return renderResult(user, computer, result);
    },
    selectStandardGame: function () {
      return selectStandardGame();
    },
    userSelect: function (choice) {
      return userSelect(choice);
    },
    updateUserScore: function (score) {
      return updateUserScore(score)
    }
  }

})();

let controller = (function (gameCtrl, UIctrl) {
  const DOMelements = UIctrl.DOMelements();

  let compareResult = function (user, comp) {
    const compare = user + comp;
    UIctrl.clearContainer();

    let addWinnerClass = function (result) {
      UIctrl.renderResult(user, comp, result);

      let userDot = document.getElementById('userDot');
      let computerDot = document.getElementById('computerDot');

      if (result === 'win') {
        userDot.classList.add('dot--win');
      } else if (result === 'lose') {
        computerDot.classList.add('dot--win');
      } else {
        userDot.classList.remove('dot--win');
        computerDot.classList.remove('dot--win');
      }
    }

    let subtractUserScore = function () {
      gameCtrl.userScore--;
      UIctrl.updateUserScore(gameCtrl.userScore);
    }

    let addUserScore = function () {
      gameCtrl.userScore++;
      UIctrl.updateUserScore(gameCtrl.userScore);
    }

    switch (compare) {
      case 'rockrock':
        addWinnerClass('draw');
        break;
      case 'rockpaper':
        addWinnerClass('lose');
        subtractUserScore();
        break;
      case 'rockscissors':
        addWinnerClass('win');
        addUserScore();
        break;
      case 'paperrock':
        addWinnerClass('win');
        addUserScore();
        break;
      case 'paperpaper':
        addWinnerClass('draw');
        break;
      case 'paperscissors':
        addWinnerClass('lose');
        subtractUserScore();
        break;
      case 'scissorsrock':
        addWinnerClass('lose');
        subtractUserScore();
        break;
      case 'scissorspaper':
        addWinnerClass('win');
        addUserScore();
        break;
      case 'scissorsscissors':
        addWinnerClass('draw');
        break;

      default:
        break;
    }
  }

  let startGame = function (user) {
    UIctrl.userSelect(user);

    setTimeout(function () {
      const compChoice = gameCtrl.getComputerChoice();
      const userChoice = user;
      compareResult(userChoice, compChoice);
    }, 3000)
  }

  DOMelements.mainContainer.addEventListener('click', (e) => {
    if (e.target.closest('#standardButton')) {
      UIctrl.selectStandardGame();
    }
    if (e.target.closest('.btn--rock')) {
      startGame('rock');
    };
    if (e.target.closest('.btn--paper')) {
      startGame('paper');
    };
    if (e.target.closest('.btn--scissors')) {
      startGame('scissors');
    };
    if (e.target.closest('.btn--play-again')) {
      playAgain();
    }
  });

  DOMelements.footer.addEventListener('click', function (e) {
    if (e.target.closest('.btn--rules')) {
      DOMelements.rules.classList.add('rules--active');
    }
    if (e.target.closest('.btn--exit')) {
      DOMelements.rules.classList.remove('rules--active');
    }
  })

  let init = function () {
    gameCtrl.userScore = 0;
    UIctrl.selectStandardGame();
  }

  let playAgain = function () {
    UIctrl.selectStandardGame();
  }

  return {
    init: function () {
      return init();
    }
  }

})(gameController, UIcontroller);
controller.init();