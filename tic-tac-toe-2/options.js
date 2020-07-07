// SELECT START ELEMENT
const options = document.querySelector(".options");

// SELECT BUTTONS
const computerBtn = document.querySelector(".computer");
const friendBtn = document.querySelector(".friend");
const xBtn = document.querySelector(".x");
const oBtn = document.querySelector(".o");
//----------level--------------
const levBtn = document.querySelector(".level");
const levBtn2 = document.querySelector(".level2");
//--------------------------------
const playBtn = document.querySelector(".play");
const canvas = document.getElementById("canvas");
const c= document.querySelector(".hide")
// GAME OVER ELEMENT
const gameOverElement = document.querySelector(".gameover");

const player = new Object;
let OPPONENT;

//-level var---
let LEVEL=0;
//----------

oBtn.addEventListener("click", function(){
    player.man = "O";
    player.computer = "X";
    player.friend = "X";

    switchActive(xBtn, oBtn);
});

xBtn.addEventListener("click", function(){
    player.man = "X";
    player.computer = "O";
    player.friend = "O";

    switchActive(oBtn, xBtn);
});

computerBtn.addEventListener("click", function(){
    OPPONENT = "computer";
    switchActive(friendBtn, computerBtn);
});

friendBtn.addEventListener("click", function(){
    OPPONENT = "friend";
    switchActive(computerBtn, friendBtn);
});
//------------level----------------
levBtn.addEventListener("click", function() {
    LEVEL=1;
    switchActive(levBtn2,levBtn)
    
})

levBtn2.addEventListener("click", function(){
    LEVEL=2;
    switchActive(levBtn,levBtn2);
    
})

//-----------------------------------

playBtn.addEventListener("click", function(){
    if( !OPPONENT){
        computerBtn.style.backgroundColor = "red";
        friendBtn.style.backgroundColor = "red";
        return;
    }

    if( !player.man ){
        oBtn.style.backgroundColor = "red";
        xBtn.style.backgroundColor = "red";
        return;
    }

    if(LEVEL==0)
    {
        levBtn.style.backgroundColor="red";
        levBtn2.style.backgroundColor="red";
        return;
    }
    
    init(player, OPPONENT, LEVEL);
   

    options.classList.add("hide");
    c.classList.remove("hide");

});

function switchActive(off, on){
    off.classList.remove("active");
    on.classList.add("active");
}