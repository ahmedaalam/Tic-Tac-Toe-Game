const cells = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('board');
    const statusText = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');

    let currentPlayer = 'X';
    let gameActive = true;

    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    function startGame() {
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', handleClick, { once: true });
      });
      currentPlayer = 'X';
      gameActive = true;
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    function handleClick(e) {
      const cell = e.target;
      if (!gameActive) return;

      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer.toLowerCase());

      if (checkWin(currentPlayer)) {
        statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }

      if (isDraw()) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWin(player) {
      return winningCombos.some(combo => {
        return combo.every(index => {
          return cells[index].textContent === player;
        });
      });
    }

    function isDraw() {
      return [...cells].every(cell => cell.textContent !== '');
    }

    resetBtn.addEventListener('click', startGame);

    startGame();