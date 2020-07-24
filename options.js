
//Various options available
const options = document.querySelector(".options");

//--------------- Button Variables---------------------

//----------------Opponent variables-------------------
const computerBtn = document.querySelector(".computer");
const friendBtn = document.querySelector(".friend");

//---------------Symbol Buttons------------------------
const xBtn = document.querySelector(".x");
const oBtn = document.querySelector(".o");

//--------------Dimension Buttons----------------------
const t3Btn = document.querySelector(".t3"); //tic tic tac toe of dimension 3
const t5Btn = document.querySelector(".t5"); //tic tic tac toe of dimension 5

//--------------Level Buttons--------------------------
const levBtn = document.querySelector(".level");
const levBtn2 = document.querySelector(".level2");
const levBtn3 = document.querySelector(".level3");

//---------------FirstPlayer Buttons---------------------
const youBtn = document.querySelector(".you");
const oppBtn = document.querySelector(".opp");

//---------------Play Button-----------------------------
const playBtn = document.querySelector(".play");

//---------------Canvas Variable--------------------------
const canvas = document.getElementById("canvas");

//-------------Webcamera Variables------------------------
const c= document.querySelector(".Mycam");
const frndcam=document.querySelector(".friendCam");

//---------------Robot variable---------------------------
const Robot=document.querySelector(".Robot");

//---------------Body variable----------------------------
const body=document.querySelector("body");

//---------------Reset Button variable---------------------
const resetBtn= document.querySelector(".reset")

//---------------Score Table variable---------------------
const scoretable= document.querySelector(".scoretable");
scoretable.classList.add("hide");

//----------------GAME OVER ELEMENT-----------------------
const gameOverElement = document.querySelector(".gameover");

//----------------
const player = new Object; //The human user is the player  object. This object has three attributes: man, computer, friend.

//--------Variable to store the currrent opponent-------------------------
let OPPONENT;

//--------Variable to store the first Player---------------------------
let firstPlayer;

//--------Variable to store the currrent game dimension----------------------
let DIMENSION;

//--------Variable to store the currrent level--------------------------
let LEVEL=0;

//---------Event listeners for various buttons------------------------
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

t3Btn.addEventListener("click", function(){
    DIMENSION = "3*3";
    switchActive(t5Btn, t3Btn);
});

t5Btn.addEventListener("click", function(){
    DIMENSION = "5*5";
    switchActive(t3Btn, t5Btn);
});

youBtn.addEventListener("click", function(){
    firstPlayer = "you";
    switchActive(oppBtn, youBtn);
});

oppBtn.addEventListener("click", function(){
    firstPlayer = "opp";
    switchActive(youBtn, oppBtn);
});

levBtn.addEventListener("click", function() {
    LEVEL=1;
    switchActive2(levBtn2,levBtn3,levBtn)
    
})

levBtn2.addEventListener("click", function(){
    LEVEL=2;
    switchActive2(levBtn,levBtn3,levBtn2);
    
})

levBtn3.addEventListener("click", function(){
    LEVEL=3;
    switchActive2(levBtn,levBtn2,levBtn3);
    
})

resetBtn.addEventListener("click",function(){
    reset_storage();
    delete_scores(); 
})

playBtn.addEventListener("click", function(){

    // If the required buttons are not selected by the user before clicking the Play button, background color changes to red.

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
        levBtn3.style.backgroundColor="red";
        return;
    }

    /* If dimension chosen is 3*3, game1 function is called with appropriate parameters, 
    else game2 function is called with appropriate parameters */

    if(DIMENSION == "3*3"){
        game1(player, OPPONENT, LEVEL,firstPlayer);
        options.classList.add("hide");
    }else {
        game2(player, OPPONENT,LEVEL,firstPlayer);
        options.classList.add("hide");
    }
    
    //To add hide to all options on first page and remove hide from the canvas once Play is clicked

    options.classList.add("hide");
    c.classList.remove("hide");

    //If opponent is friend second web camera is enabled else robot picture is displayed

    if(OPPONENT == "friend"){
        frndcam.classList.remove("hide");
        Robot.classList.add("hide");
    }
    else{
        Robot.classList.remove("hide");
        frndcam.classList.add("hide");
    }

});

//Function to switch selection between options with two buttons
function switchActive(off, on){
    off.classList.remove("active");
    on.classList.add("active");
}

//Function to switch selection between options with three buttons
function switchActive2(off1,off2,on){
    off1.classList.remove("active");
    off2.classList.remove("active");
    on.classList.add("active");
}
