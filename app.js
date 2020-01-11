
// Draggable item events
$(".knight").on("dragstart", dragStart);
$(".knight").on("dragend", dragEnd);
$(".knight").on("click", highlightDroppables);

function dragStart() {
    $(this).addClass("hold");
    // TakeAway: How to drag the item and disappear it from its original position.
    setTimeout( () => $(this).addClass("invisible"), 0); 

    $(".cell").removeClass("droppable");
    $(this).parent().addClass("currentClicked");

    showDrappables($(this));
}

function dragEnd() {
    $(this).removeClass("hold");
    $(this).removeClass("invisible");

    $(".cell").removeClass("currentClicked");
    $(".cell").removeClass("droppable");
}

// Droppable item events
$(".board").on("dragover", dragOver);
$(".board").on("dragenter", dragEnter);
$(".board").on("dragleave", dragLeave);
$(".board").on("drop", drop);

function dragOver(e) {  
    // TakeAway: IF we don't do this, drop will not work.
    e.preventDefault();
}

function dragEnter(e) {  
    e.preventDefault();
    if ($(e.target).hasClass("droppable")) {
        $(e.target).addClass("hovered");
    }
}

function dragLeave(e) {  
    $(e.target).removeClass("hovered");
}

function drop(e) {  
    if ($(e.target).hasClass("droppable")) {
        $(e.target).removeClass("hovered");
        $(e.target).append($(".knight"));
    }
}

const directions = [ [2, -1], [2, 1], [-2, 1], [-2, -1],
                    [-1, 2], [1, 2], [1, -2], [-1, -2]];

// Heightlight knight's accessible positions
function highlightDroppables() {
    $(this).parent().addClass("currentClicked");
    showDrappables($(this));
}

function showDrappables(knight) {

    const knightColIndex = parseInt(knight.parent().data("col"));
    const knightRowIndex = parseInt(knight.parent().parent().data("row"));

    for (let i = 0; i < directions.length; i++) 
    {
        let currentRow = knightRowIndex + directions[i][0]; 
        let currentCol = knightColIndex + directions[i][1]; 

        if (isValidBoardPos(currentRow, currentCol)) {
            let elementSelector = `[data-row="${currentRow}"] [data-col="${currentCol}"]`;
            $(elementSelector).addClass("droppable");
        }
    }
}

function isValidBoardPos(row, col) {
    if (row >= 0 && row < 8) {
        if (col >= 0 && col < 8) {
            return true; 
        }
    }
    return false;
}