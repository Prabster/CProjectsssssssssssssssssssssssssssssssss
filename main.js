leftWristX = 0;
leftWristY = 0;
leftWristScore = 0;

rightWristX = 0;
rightWristY = 0;
rightWristScore = 0;

function preload() {
    sound1 = loadSound("HarryPotter.mp3");
    sound2 = loadSound("TheAvengers.mp3");
}

function setup() {
    canvas = createCanvas(700, 500);
    canvas.position(620, 300);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotResult);
}

function draw() {
    image(video, 0, 0, 700, 500);

    if (leftWristScore > 0.2) {
        stroke("Blue");
        fill("Pink");
        circle(leftWristX + 25, leftWristY + 10, 20);

        leftWristY = Math.floor(leftWristY);

        if (sound2.isPlaying()) {
            sound2.stop();
        }
        if (!(sound1.isPlaying())){
        sound1.play();
        document.getElementById("mesaH3").innerHTML = "Song Playing - Harry Potter";
        }
    }
    if (rightWristScore > 0.2) {
        stroke("Blue");
        fill("Pink");
        circle(rightWristX + 25, rightWristY + 10, 20);

        rightWristY = Math.floor(rightWristY);

        if (sound1.isPlaying()) {
            sound1.stop();
        }

        if (!(sound2.isPlaying())) {
        sound2.play();
        document.getElementById("mesaH3").innerHTML = "Song Playing - The Avengers";
        }
    }
}

function modelLoaded() {
    console.log("Your Model Is Initialized");
}

function gotResult(results) {
    console.log(results);

    if (results.length > 0) {
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        leftWristScore = results[0].pose.keypoints[9].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        rightWristScore = results[0].pose.keypoints[10].score;

        console.log(leftWristX, leftWristY, rightWristX, rightWristY);
    }
}