// Problem 1:

function pow(num1){
        return function (num2){
            return Math.pow(num2 , num1);
        }
}
var square = pow(2);
var cube = pow(3);

console.log(square(3));
console.log(cube(3));

// Problem 2:

function pingPongTracker(){
    let time=0;
    return{
        timeSpentPlaying :function(){
            return time;
        } ,
        playOneGame : function(){
            time += 15;
            return "Game played"
        },
        myLevel : function(){
            if(time < 30) return"I need to improve my game"
                else if(time < 100)return"You need to improve your game"
                    else return"Wow, I have wasted a lot of time"
        },
    }
}

var myGame = pingPongTracker();
console.log(myGame.playOneGame());
console.log(myGame.playOneGame());
console.log(myGame.timeSpentPlaying());
console.log(myGame.myLevel());