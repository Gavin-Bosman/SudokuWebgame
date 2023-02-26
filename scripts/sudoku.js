/*
    Future Additions:
    - Winning the game; display message, auto transition to high-score page
    - displaying and storing user-high scores on the high-score page
    - Add name, and rank to the high score page
    - Add styling, display top 5, have a gap and then whatever place the current user lies
*/


// global var that will be constantly rechanged to hold current input pressed
let active_input = null;
// will hold the innerHTML of previous gameBoard states to switch back to
const prevBoardState = [];

// initial board setup
const board = [
    "-1-----9-",
    "--4---2--",
    "--8--5---",
    "-------3-",
    "2---4-1--",
    "---------",
    "--18--6--",
    "-3-----8-",
    "--6------"
];

// solution to the sudoku game
const solution = [
    "312468597",
    "564379218",
    "798125346",
    "147256893",
    "289743165",
    "653981724",
    "471892653",
    "935617482",
    "826534971"
];

// dynamically generating the game board
function buildBoard() {
    for (let i = 0; i < 9; i++) { // for loop generating the rows of the board
        let row = document.createElement("tr");
        row.setAttribute("id", "row" + i)
        rowStr = board[i]

        for (let j = 0; j < rowStr.length; j++) { // for loop generating the cells of each row
            let cell = document.createElement("td");

            if (rowStr[j] !== "-") { 
                cell.setAttribute("id", "cell" + i + j);
                cell.setAttribute("class", "user-input");
                cell.classList.add("permanent");
                cell.innerHTML = rowStr[j];
            }

            else {
                cell.setAttribute("id", "cell" + i + j);
                cell.setAttribute("class", "user-input");
            }

            row.appendChild(cell);  // adding the table data to the row
        }

        document.getElementById("gameBoard").appendChild(row);
    }
}

function checkRowErr(cell_id) {
    let value = document.getElementById(cell_id).innerHTML;

    let x = cell_id.substring(4,5);
    let y = cell_id.substring(5,6);

    // row error check
    for (let i = 0; i < 9; i++) {
        cur_val = document.getElementById("cell" + x + i).innerHTML;

        if (cur_val === value && i !== parseInt(y)) {
            displayRowErr(x);
            break;
        }
    }
}

function displayRowErr(x) { 

    for (let i = 0; i < 9; i++) {
        cur_cell = document.getElementById("cell" + x + i);
        cur_cell.classList.remove("user-input");
        cur_cell.classList.add("error");
    }
}

function checkColErr(cell_id) {
    let value = document.getElementById(cell_id).innerHTML;

    let x = cell_id.substring(4,5);
    let y = cell_id.substring(5,6);

    // col error checking 
    for (let i = 0; i < 9; i++) {
        let cur_val = document.getElementById("cell" + i + y).innerHTML; 

        if (cur_val === value && i !== parseInt(x)) {
            displayColErr(y);
            return;
        }
    }
}

function displayColErr(y) {
    for (let i = 0; i < 9; i++) {
        cur_cell = document.getElementById("cell" + i + y);
        cur_cell.classList.remove("user-input");
        cur_cell.classList.add("error");
    }
}

function checkBlockErr(cell_id) {
    let value = document.getElementById(cell_id).innerHTML;

    let x = parseInt(cell_id.substring(4,5));
    let y = parseInt(cell_id.substring(5,6));

    let firstRow = Math.floor(x / 3) * 3;
    let firstCol = Math.floor(y / 3) * 3;

    for (let i = firstRow; i < firstRow + 3; i++) {
        for (let j = firstCol; j < firstCol + 3; j++) {
            cur_id = "cell" + i + j;
            cur_val = document.getElementById(cur_id).innerHTML;

            if (value === cur_val && cur_id !== cell_id) {
                console.log("found err at " + i + ", " + j);
                displayBlockErr(firstRow, firstCol);
                return;
            }
        }
    }
}

function displayBlockErr(x,y) {
    for (let i = x; i < x + 3; i++) {
        for (let j = y; j < y + 3; j++) {
            cur_cell = document.getElementById("cell" + i + j);
            cur_cell.classList.remove("user-input");
            cur_cell.classList.add("error");
        }
    }
}

window.onload = () => { // main window loading function containing our event handling
    buildBoard();

    // event listener for the board cells
    const board_cells = document.querySelector("#gameBoard");
    board_cells.addEventListener("click", e => {
        let cell_class = document.getElementById(e.target.id).classList

        if (active_input && cell_class.length === 1) { 
            prevBoardState.push(document.getElementById("gameBoard").innerHTML);

            document.getElementById(e.target.id).innerHTML = document.getElementById(active_input).innerHTML;
            document.getElementById(active_input).style.backgroundColor = "#f2f2f2";
            active_input = null;

            checkRowErr(e.target.id);
            checkColErr(e.target.id);
            checkBlockErr(e.target.id);
        }
    });

    // event listener for the input buttons
    const input_cells = document.querySelector("#inputButtons");
    input_cells.addEventListener("click", e => {    // set content of board cell according to input button pressed
        if (active_input === e.target.id) {   // set cell clear if clicked when highlighted
            document.getElementById(e.target.id).style.backgroundColor = "#f2f2f2";
            active_input = null;
        }
        else if (active_input !== null) {     // clear highlighted cell when new cell is clicked + highlight new cell
            document.getElementById(active_input).style.backgroundColor = "#f2f2f2";
            document.getElementById(e.target.id).style.backgroundColor = "#f5dd90";
            active_input = e.target.id;
        }
        else {
            document.getElementById(e.target.id).style.backgroundColor = "#f5dd90";
            active_input = e.target.id;
        }
    });

    const undo_button = document.querySelector("#undoButton");
    undo_button.addEventListener("click", e => {
        if (prevBoardState.length !== 0) {
            document.getElementById("gameBoard").innerHTML = prevBoardState.pop();
        }
    });
}