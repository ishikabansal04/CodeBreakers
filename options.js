// SELECT START ELEMENT
const options = document.querySelector(".options");

// SELECT BUTTONS
const computerBtn = document.querySelector(".computer");
const friendBtn = document.querySelector(".friend");
const xBtn = document.querySelector(".x");
const oBtn = document.querySelector(".o");
//----------dimension----------
const t3Btn = document.querySelector(".t3");
const t5Btn = document.querySelector(".t5");
//-----------------------------
//----------firstPlayer----------
const youBtn = document.querySelector(".you");
const oppBtn = document.querySelector(".opp");
//-----------------------------
//----------level--------------
const levBtn = document.querySelector(".level");
const levBtn2 = document.querySelector(".level2");
//--------------------------------
const playBtn = document.querySelector(".play");
const canvas = document.getElementById("canvas");
const c= document.querySelector(".hide")
// GAME OVER ELEMENT
const gameOverElement = document.querySelector(".gameover");

const player = new Object; //it has three variables: man, computer, friend
let OPPONENT;
let firstPlayer;

//-dimension var---
let DIMENSION;
//----------

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

//----------------dimension--------
t3Btn.addEventListener("click", function(){
    DIMENSION = "3*3";
    switchActive(t5Btn, t3Btn);
});

t5Btn.addEventListener("click", function(){
    DIMENSION = "5*5";
    switchActive(t3Btn, t5Btn);
});
//-------------dimension------------

//----------------firstPlayer--------
youBtn.addEventListener("click", function(){
    firstPlayer = "YOU";
    switchActive(oppBtn, youBtn);
});

oppBtn.addEventListener("click", function(){
    firstPlayer = "OPPONENT";
    switchActive(youBtn, oppBtn);
});
//-----------------------------------

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

    if( !DIMENSION ){
        t3Btn.style.backgroundColor = "red";
        t5Btn.style.backgroundColor = "red";
        return;
    }

    if( !firstPlayer ){
        youBtn.style.backgroundColor = "red";
        oppBtn.style.backgroundColor = "red";
        return;
    }

    if(LEVEL==0)
    {
        levBtn.style.backgroundColor="red";
        levBtn2.style.backgroundColor="red";
        return;
    }
    
    if(DIMENSION == "3*3"){
        game(player, OPPONENT, LEVEL,firstPlayer);
        options.classList.add("hide");
        c.classList.remove("hide");
    }else {
        game2(player, OPPONENT,LEVEL,firstPlayer);
        options.classList.add("hide");
        c.classList.remove("hide");
    }
    
    options.classList.add("hide");
    c.classList.remove("hide");

});

function switchActive(off, on){
    off.classList.remove("active");
    on.classList.add("active");
}