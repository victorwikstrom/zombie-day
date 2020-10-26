
/* ------------------------------- HTML Elements -------------------------------- */

const playerNameElement = document.getElementById('player-name')
const roomImageElement = document.getElementById('room-image')
const roomInfoElement = document.getElementById('room-info')
const buttonElement = document.getElementById('option-buttons') // NOTE! Grid element, not button


/* ------------------------------- FUNCTIONS -------------------------------- */

/**
 * Initates the game, resets the state of the player and loads the first room 
 */
 function initGame() {
  // setPlayer()
  loadRoom(1)
 }

 function setPlayer() {
    const playerName = prompt("Please type your name")
    playerNameElement.innerText = playerName
  }

 /**
 * Loads a new room based on roomList index
 * @param {*} roomIndex
 */
function loadRoom(roomIndex) {

  // Finds the current room in the room list and loads room info into the html element
  const roomInfo = roomList.find(roomInfo => roomInfo.id === roomIndex)
  roomInfoElement.innerText = roomInfo.info

  // Removes all buttons
  while (buttonElement.firstChild) {
    buttonElement.removeChild(buttonElement.firstChild)
  }

  // Loop through the optionList-array and adds the all found items to the button-grid
  for (let option of roomInfo.optionsList) {
    if (showOption(option)) {
      const button = document.createElement('button') // Create the new button element
      button.innerText = option.text // Set the text from the optionList-array  
      button.classList.add('button') // Set css styling to the button
      button.addEventListener('click', () => selectOption(option)) // Set click-event to option 
      buttonElement.appendChild(button) // Add the button to the DOM
    }
  }
}

function showOption(option) {
return true
}

function selectOption(option) {
  const nextRoomId = option.nextRoom 
  loadRoom(nextRoomId) // Load new room info as set in the optionsList array
}

/* -------------------------------- GAME ENVIRONMENT -------------------------------- */

const roomList = [
  {
    id: 1,
    info: 'This is the first room',
    optionsList: [
      { 
        text: 'Go to room 2',
        nextRoom: 2
      },
      { 
        text: 'Go to room 3',
        nextRoom: 3
      }
    ]
  },
  {
    id: 2,
    info: 'This is the second room',
    optionList: [
      {
        text: 'Go back to room 1',
        nextRoom: 1
      },
      {
        text: 'Go to room 3',
        nextRoom: 3
      }
    ]
  }
]

initGame()