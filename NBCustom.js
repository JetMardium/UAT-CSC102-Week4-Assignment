//This is the script that controls all the functions for my page



//This portion is for the Craps game
//The variable amount of credit to bet, which initially is 100
var Monies = 100;

//This is the action (function) itself, and the link (title) to which my html will src script pull from
function playCraps() {
//This writes a log to the console to tell me whats going on at this point in my function
    console.log("craps started");
/*These are my variables for die 1 and 2, the baseline for future calculations
the math tag enables the function to perform mathematical equations
he variables within it determine between what numbers will randomly generate, as well as whether the round up, or down, or do anything else.
the math.random generates a random number,
*/
    var die1 = Math.ceil(Math.random()*6);
    var die2 = Math.ceil(Math.random()*6);

//This is the sum and how to achieve such
    var sum = die1 + die2

//This pulls the value in the bet box as the reference for the value name in this function
    var name = parseInt(document.getElementById("number").value)

//These are what the code references by id to enable a vale pulled from said reference, in this case to give you a info of the die rolls
    document.getElementById("die1Dis").innerHTML = die1;
    document.getElementById("die2Dis").innerHTML = die2;
    document.getElementById("sumDis").innerHTML = sum;

//This is an if statement, it tells the function that if either of the sum variables set are true then it is to proceed with writing the results to the screen.
    if (sum == 7 || sum == 11) {
        document.getElementById("resultDis").innerHTML = "CRAPS - you lose";
        mySound = new sound("omg.mp3");
        mySound.play();
        alert("Oh dang you lost $" + name + " that sucks, but thanks for your Monies.");
//This causes the earnings pool to decrease upon a loss, by subtracting the value of name, from the value of Monies
        document.getElementById("pool").innerHTML = Monies -= parseInt(name);       
    }

//This is an additional if statement, in this case defining that if the numbers are equal to eachother before proceeding to write the result
    else if (die1 == die2 && die1 % 2 == 1) {
        document.getElementById("resultDis").innerHTML = "DOUBLES - you win";
        mySound = new sound("you-win.mp3");
        mySound.play();
        alert("You Won $" + name*2 + " Congradulations!!!");
//This causes the earnings pool to increase upon a win, by adding the value of name, to the value of Monies
        document.getElementById("pool").innerHTML = Monies += parseInt(name*2);
    }

    //This is the base function that will write when the script is activated, unless either of the If functions comes back as true.
   else {
        document.getElementById("resultDis").innerHTML = "Sorry for your luck, you didn't win. But hey, atleast you didn't lose either."
    //This is causes the money pool to not change upon a draw, which I guess technically I might not need
        document.getElementById("pool").innerHTML = Monies;
   }
}

//This is the function that increases the value of a number
function incrementValue()
{
    //This is the value it pulls to know what variable to adjust, in this case the betting amount, number
     var value = parseInt(document.getElementById("number").value, 10);
    value = isNaN(value) ? 0 : value;
    //This lets it know to add
    value++;
    document.getElementById("number").value = value;
}

//This is the function that decreases the value of a number
function decrementValue()
 {
     var value = parseInt(document.getElementById("number").value, 10);
     value = isNaN(value) ? 0 : value;
     //This lets it know to subtract
     value--;
     document.getElementById("number").value = value;
 }




//This runs the function to start the table alteration, in more advanced coding it could draw from a real time reference.
 function start() {
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;
    document.getElementById("data").rows["seconds"].innerHTML = "Reading Data...";
    document.getElementById("data").rows["longitude"].innerHTML = "Start pushed...";
    mySound = new sound("start.mp3");
    mySound.play();

}

//This runs the function to stop the table alteration above.
function stop() {
    document.getElementById("data").rows["seconds"].innerHTML = "<td>Time Elapsed:</td><td>15 seconds</td>";
    document.getElementById("data").rows["longitude"].innerHTML = "<td>Longitude:</td><td>0</td>";
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    mySound = new sound("stop.mp3");
    mySound.play();
}


//All these following functions pull the required audio files that play when the corresponding buttons are pressed
function playRickIntro() {
    mySound = new sound("ProfRickIntro.mp3");
    mySound.play();
}

function playSilentStarDrive() {
    mySound = new sound("SSD.mp3");
    mySound.play();
}

function playBlastPast() {
    mySound = new sound("BB-WIBN.mp3");
    mySound.play();
}

/*This function works much like the three above, except that it stops those ones from playing.
There is an issue that I didn't address right now as it's not relevant to the assignment and is based off of my extra functions,
but when the user clicks on the Blast from the Past button twice really quickly it plays the song overlapped, and
the stop button only stops one, while the other plays entirely unstoppable in the background.*/
function stopAudio()  {
    mySound.stop();
}

//This function essentially tells the above four how to define and run them.
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}


//This portion is for my login checks
function checkCreds() {
    //My variables for submitting a credential check for login permission
    var Name1 = document.getElementById("firstName").value;
    var Name2 = document.getElementById("lastName").value;
    var badgeNum = document.getElementById("numBadge").value;
    var loginInfo = Name1 + " " + Name2;

    //This condition tells it to check if the login name is of a proper length and run if the condition is true. I split the process into two so that the first and last name both must have a set limit of characters rather than a combined total.
    //More advanced coders than I can make this process specific to individual user names, or even user names in a database that it runs a check against.
    if (Name1.length >20 || Name1.length <4) {
          document.getElementById("loginStatus").innerHTML = "User First Name has invalid number of characters!";
          
    }
        else
        if (Name2.length >20 || Name2.length <4) {
            document.getElementById("loginStatus").innerHTML = "User Last Name has invalid number of characters!";
    }

              //This condition tells it to check for this condition if the first one is false and the second one is as well, and run if this number is true
          //In this case I made it run if the proper numbers are input
        else
        if (badgeNum < 999  && badgeNum > 100) {
            alert("Training Progarm Accesss Granted. Welcome to the UAT Deep Space Exploration Team " + loginInfo + ".");
            location.replace("indexSpaceW4.html");

    }

    //This condition runs if all three of the other conditions are false, and it tells the system to display that the badge number is invalid.
        else {
        document.getElementById("loginStatus").innerHTML = "Badge number is invalid!";
    }
}



    //This is the function to play an audio file upon a window loading, it doesn't want to work everytime, doing some research I beleive it has to do with googles autoplay policy this link contains relevant information https://developer.chrome.com/blog/autoplay/
    window.onload = function() {
        document.getElementById("EJ1").play();
    }

    $(document).ready(function() {
        $("#EJ1").get(0).play();
});
