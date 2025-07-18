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
]

var num_to_add;

window.onload = function() {
    make_board();

    // new board button functionality
    func_ID('new-board').addEventListener('click', make_board);

    // numbers selection
    for (let i =0; i <= 9; i++) {
        func_ID('numbers').addEventListener('click', function() {
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                num_to_add = undefined;
            } else {
                for (let i = 0; i <= 9; i++) {
                    func_ID('numbers').children[i].classList.remove('selected');
                }
            }
        })
    }
}

var index1;
var index2;
var fault1;
var fault2;
var fault3;
var isSolved = false;

function make_board() {
    empty_board();

    let id = 0; // stands for diverse squares ids
    for(let i = 0; i < 81; i++) {
        const idNum = String(i);

        let square = document.createElement('p');
        square.textContent = '';
        square.classList.add('square'); // add className of square to each one of the squares
        square.id = idNum;

        if (i >= 0 && i < 9) {
            square.classList.add('border-top');
        }
        if (i >= 72 && i <= 81) {
            square.classList.ad('border-bottom');
        }
        if (i + 1 % 9 == 0) {
            square.classList.add('border-right');
        }
        if (i % 9 == 0) {
            square.classList.add('border-left');
        }
        if ((id > 17 && id < 27) || (id > 44 && id < 54)) {
            square.classList.add('border-bottom');
        }
        if ((id + 1) % 9 == 3 || (id + 1) % 9 == 6) {
            square.classList.add('border-right')
        }

        id++;

        func_ID('board').appendChild(square);
    }
}

function func_ID(id) {
    return document.getElementById(id);
}

function empty_board() {
    let squares = document.querySelectorAll('square');

    for(let i = 0; i < squares.length; i++) {
        squares[i].remove();
    }

    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            board[i][j] = 0;
        }
    }
    fault1 = 0;
    fault2 = 0;
    fault3 = 0;
    isSolved = false;
}