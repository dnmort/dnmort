const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
const startButton = document.getElementById('starter');
let currentlyPlaying = true;
let counter = 0;
let currentStreak = 0;
let bestStreak = 0;
const cStreak = document.getElementById('current-streak');
const bStreak = document.getElementById('best-streak');

const isBot = (door) => {
  if(door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

const isClicked = (door) => {
  if(door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
};

const playDoor = (door) => {
  numClosedDoors -= 1;
  if(numClosedDoors === 0) {
    gameOver('win');
  } else if(isBot(door)) {
    gameOver();
  }
};

const randomChoreDoorGenerator = () => {
  let selector1 = Math.floor(Math.random() * numClosedDoors);
  let selector1Position = [botDoorPath, beachDoorPath, spaceDoorPath];
  let otherPositions = selector1Position.map(x => x);
  otherPositions.splice(selector1,1);
  let selector2 = Math.floor(Math.random() * (numClosedDoors - 1));
  let selector3 = ((selector2 === 0) ? 1 : 0);
  openDoor1 = selector1Position[selector1];
  openDoor2 = otherPositions[selector2];
  openDoor3 = otherPositions[selector3];
};

doorImage1.onclick = () => {
  if(currentlyPlaying === true && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};
doorImage2.onclick = () => {
  if(currentlyPlaying === true && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};
doorImage3.onclick = () => {
  if(currentlyPlaying === true && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

startButton.onclick = () => {
  if(!currentlyPlaying) {
     startRound();
  };
};

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good luck!';
  currentlyPlaying = true;
  randomChoreDoorGenerator();
};

const gameOver = (status) => {
  if(status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
    currentStreak++;
    if(currentStreak > bestStreak) {
      bestStreak = currentStreak;
    };
  } else {
    startButton.innerHTML = 'Game over! Play again?';
    currentStreak = 0;
  };
  currentlyPlaying = false;
  cStreak.innerHTML = currentStreak;
  bStreak.innerHTML = bestStreak;
};

startRound();