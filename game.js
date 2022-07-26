const gamePattern = []
const userClickedPattern = []
const buttonColours = ["red", "blue", "green", "yellow"]
let randomChosenColour
let level = 0
let count = 0
let started = false

// Generate nextSequence
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)
    randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeOut(200).fadeIn(200)
    playSound(randomChosenColour)
    userClickedPattern.length = 0

}

// Animation
function animation(color) {

    $('#' + color).addClass("pressed")

    setTimeout(function () {
        $('#' + color).removeClass("pressed")
    }, 200)
}

// Play Audio
function playSound(sound) {
    var audio = new Audio("/sounds/" + sound + ".mp3")
    audio.play()
}

// Game Over
function gameOver() {
    $("h1").html("Game Over, Press any key to Restart")
    started = false
    level = 0
    gamePattern.length = 0
    userClickedPattern.length = 0
    $("body").addClass("game-over")

    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 400)

    playSound("wrong")
}

function delay(i) {
    if (i < gamePattern.length) {

        setTimeout(function () {
            $("#" + gamePattern[i]).fadeOut(200).fadeIn(200)
            playSound(gamePattern[i])
        }, 1000)

        delay(++i)
    }

}


function checkAnswer(gamePattern, userClickedPattern) {
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] != userClickedPattern[i]) {
            gameOver();
            return false
        }
    }

    return true

}


$(document).on("keypress", function () {

    if (!started) {
        started = true
        $("h1").html("Level " + ++level)
        nextSequence()

    }


})

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animation(userChosenColor)

    if (userClickedPattern.length < gamePattern.length) {
        checkAnswer(gamePattern, userClickedPattern)
    }

    else if (userClickedPattern.length == gamePattern.length) {

        if (checkAnswer(gamePattern, userClickedPattern)) {
            $("h1").html("Level " + ++level)

            // for (let i = 0; i < gamePattern.length; i++) {

            //     delay(0)

            // }

            // delay(0)

            setTimeout(function () {
                nextSequence()
            }, 1000)

            // nextSequence()

        }


    }

    else if (userClickedPattern.length > gamePattern.length) {
        gameOver()
    }



})



