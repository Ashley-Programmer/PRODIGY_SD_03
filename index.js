var board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var num_to_add;
var index1, index2;
var fault1, fault2, fault3;
var isSolved = false;

window.onload = function () {
    make_board();

    // New board button
    func_ID('new-board').addEventListener('click', make_board);

    // Solve button
    func_ID('solver').addEventListener('click', () => {
        isSolved = false;
        solveSudoku(board);
        updateBoardDisplay();
    });

    // Speed solve button
    func_ID('speedup').addEventListener('click', () => {
        isSolved = false;
        solveSudoku(board);
        updateBoardDisplay();
    });

    // Numbers selection
    for (let i = 0; i <= 9; i++) {
        func_ID('numbers').children[i].addEventListener('click', function () {
            for (let j = 0; j <= 9; j++) {
                func_ID('numbers').children[j].classList.remove('selected');
            }
            if (this.innerHTML !== 'C') {
                this.classList.add('selected');
                num_to_add = this.innerHTML;
            } else {
                num_to_add = 'del';
            }
        });
    }
};

function make_board() {
    empty_board();
    let id = 0;

    for (let i = 0; i < 81; i++) {
        let square = document.createElement('p');
        square.textContent = '';
        square.classList.add('square');
        square.id = id;

        // Add borders for 3x3 sub-grids
        if (i < 9) square.classList.add('border-top');
        if (i >= 72) square.classList.add('border-bottom');
        if ((i + 1) % 9 === 0) square.classList.add('border-right');
        if (i % 9 === 0) square.classList.add('border-left');
        if (i >= 18 && i <= 26 || i >= 45 && i <= 53) square.classList.add('border-bottom');
        if ((i + 1) % 9 === 3 || (i + 1) % 9 === 6) square.classList.add('border-right');

        func_ID('board').appendChild(square);

        square.addEventListener('click', function () {
            let idNum = parseInt(this.id);
            index1 = Math.floor(idNum / 9);
            index2 = idNum % 9;

            if (num_to_add === 'del') {
                this.innerHTML = '';
                this.classList.remove('solve-colour');
                board[index1][index2] = 0;
                isSolved = false;
            } else if (num_to_add && checkDuplicates(board, parseInt(num_to_add), [index1, index2])) {
                this.innerHTML = num_to_add;
                this.classList.add('solve-colour');
                board[index1][index2] = parseInt(num_to_add);
                isSolved = false;
            }

            // Show warnings if needed
            showWarnings();
        });

        id++;
    }
}

function func_ID(id) {
    return document.getElementById(id);
}

function empty_board() {
    func_ID('board').innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = 0;
        }
    }
    fault1 = fault2 = fault3 = 0;
    isSolved = false;
    clearWarnings();
}

function checkDuplicates(board, num, empty) {
    fault1 = fault2 = fault3 = 0;

    // Check row
    for (let i = 0; i < 9; i++) {
        if (board[empty[0]][i] === num && i !== empty[1]) {
            fault1 = 1;
            return false;
        }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][empty[1]] === num && i !== empty[0]) {
            fault2 = 1;
            return false;
        }
    }

    // Check 3x3 sub-grid
    let startRow = Math.floor(empty[0] / 3) * 3;
    let startCol = Math.floor(empty[1] / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num && i !== empty[0] && j !== empty[1]) {
                fault3 = 1;
                return false;
            }
        }
    }
    return true;
}

function showWarnings() {
    if (fault1) func_ID('warning-1').classList.add('warn1-anim');
    else func_ID('warning-1').classList.remove('warn1-anim');

    if (fault2) func_ID('warning-2').classList.add('warn2-anim');
    else func_ID('warning-2').classList.remove('warn2-anim');

    if (fault3) func_ID('warning-3').classList.add('warn3-anim');
    else func_ID('warning-3').classList.remove('warn3-anim');
}

function clearWarnings() {
    func_ID('warning-1').classList.remove('warn1-anim');
    func_ID('warning-2').classList.remove('warn2-anim');
    func_ID('warning-3').classList.remove('warn3-anim');
}

function solveSudoku(board) {
    let empty = findEmptyCell(board);
    if (!empty) {
        isSolved = true;
        return true;
    }

    let row = empty[0];
    let col = empty[1];

    for (let num = 1; num <= 9; num++) {
        if (checkDuplicates(board, num, [row, col])) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
        }
    }
    return false;
}

function findEmptyCell(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) return [i, j];
        }
    }
    return null;
}

function updateBoardDisplay() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let square = func_ID('board').children[i * 9 + j];
            if (board[i][j] !== 0) {
                square.innerHTML = board[i][j];
                square.classList.add('solve-colour');
            } else {
                square.innerHTML = '';
                square.classList.remove('solve-colour');
            }
        }
    }
}