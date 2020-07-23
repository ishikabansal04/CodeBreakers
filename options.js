
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
//----------level--------------
const levBtn = document.querySelector(".level");
const levBtn2 = document.querySelector(".level2");
const levBtn3 = document.querySelector(".level3");
//--------------------------------

//----------firstPlayer--------------
const youBtn = document.querySelector(".you");
const oppBtn = document.querySelector(".opp");
//--------------------------------

const playBtn = document.querySelector(".play");
const canvas = document.getElementById("canvas");
const c= document.querySelector(".Mycam");
const frndcam=document.querySelector(".friendCam");
const Robot=document.querySelector(".Robot");
const body=document.querySelector("body"); 
const scoreBtn= document.querySelector(".scores") 
const resetBtn= document.querySelector(".reset")
const scoretable= document.querySelector(".scoretable");
scoretable.classList.add("hide");

//GAME OVER ELEMENT
const gameOverElement = document.querySelector(".gameover");

const player = new Object;
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

//------------level----------------

//----------------firstPlayer--------
youBtn.addEventListener("click", function(){
    firstPlayer = "you";
    switchActive(oppBtn, youBtn);
});

oppBtn.addEventListener("click", function(){
    firstPlayer = "opp";
    switchActive(youBtn, oppBtn);
});

//------------firstPlayer----------------

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

scoreBtn.addEventListener("click", function() {
    scoretable.classList.remove("hide");
    console.log("eventlistener clicked");
    
    //var table = document.getElementsByClassName("scoreboard");
    displayscore();
    console.log(scoretable)
    
})

resetBtn.addEventListener("click",function(){
    reset_storage(); //actually deleting frm memory
    delete_scores(); //showing in the table the scores are deleted-- error!!
})

/*resetBtn.onclick = function () {

    reset_storage();
    delete_scores();

    setTimeout(function () {
        document.getElementsByClassName('scoretable').style.display='none';
    }, 10000);
    return false;
};*/
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
        levBtn3.style.backgroundColor="red";
        return;
    }

    
    
    if(DIMENSION == "3*3"){
        game(player, OPPONENT, LEVEL,firstPlayer);
        //console.log(window.scoresOne.scores);
        //game(player, OPPONENT, LEVEL);
        options.classList.add("hide");
        // c.classList.remove("hide");
        // frndcam.classList.remove("hide");
    }else {
        game2(player, OPPONENT,LEVEL,firstPlayer);
        //game2(player, OPPONENT, LEVEL);
        options.classList.add("hide");
        // c.classList.remove("hide");
        // frndcam.classList.remove("hide");
    }
    // body.style.backgroundColor="red";
    options.classList.add("hide");
    c.classList.remove("hide");
    if(OPPONENT == "friend"){
        frndcam.classList.remove("hide");
        Robot.classList.add("hide");
    }
    else{
        Robot.classList.remove("hide");
        frndcam.classList.add("hide");
    }

    //  changeBg();
    // frndcam.classList.remove("hide");
    // Robot.classList.remove("hide");
});

function switchActive(off, on){
    off.classList.remove("active");
    on.classList.add("active");
}
function switchActive2(off1,off2,on){
    off1.classList.remove("active");
    off2.classList.remove("active");
    on.classList.add("active");
}

// function changeBg(){
//     document.getElementsByTagName('body').style.backgroundImage ="url(img/mars12.jpg)";
// }