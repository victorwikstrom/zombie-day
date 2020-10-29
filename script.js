
/* ------------------------------- HTML Elements -------------------------------- */

const playerNameElement = document.getElementById('player-name')
const roomImageElement = document.getElementById('room-image')
const roomInfoElement = document.getElementById('room-info')
const navGrid = document.getElementById('nav-grid') 


sh/* ------------------------------- FUNCTIONS ----------------------------------- */

/** Initates the game loads the room number one. */
 function initGame() {
  loadRoom(1)
 }

 /** Loads the room the user is currently in and display the first info string. */
function loadRoom(roomId) {
  const currentRoom = roomList.find(currentRoom => currentRoom.id === roomId)
  removeElements()
  loadRoomInfo(currentRoom, 0) 
}

/** Removes all elements from navGridElement and roomInfoElement. */
function removeElements() {
  while (navGrid.firstChild) {
    navGrid.removeChild(navGrid.firstChild)
  }
  while (roomInfoElement.firstChild) {
    roomInfoElement.removeChild(roomInfoElement.firstChild)
  }
}

/**
 * Loads the info of the current room based on the index on the infoList array
 * @param {Object} currentRoom 
 * @param {Number} infoIndex 
 */
function loadRoomInfo(currentRoom, infoIndex) {

    const roomInfo = currentRoom.infoList[infoIndex].text
    roomInfoElement.innerText = roomInfo
    createNextButton(currentRoom, infoIndex)
    console.log('length= ' + currentRoom.infoList.length)
    console.log('i= ' + infoIndex)
}

/**
 * Creates the button for displaying the next info text in the infoList array
 * @param {Object} currentRoom 
 * @param {Number} infoIndex 
 */
function createNextButton(currentRoom, infoIndex) {

  const nextButton = document.createElement('button')
  nextButton.innerText = '>>'
  nextButton.classList.add('button')
  roomInfoElement.appendChild(nextButton)
  nextButton.addEventListener('click', () => showNextInfo(currentRoom, infoIndex))
}

function removeNextButton() {
  roomInfoElement.removeChild(roomInfoElement.firstChild)
}

/**
 * Shows the next info text. If the info text is the last of the room, the option buttons will load. 
 * @param {Object} currentRoom 
 * @param {Number} infoIndex 
 */
function showNextInfo(currentRoom, infoIndex) {

  if (infoIndex < currentRoom.infoList.length - 1) {
    nextIndex = infoIndex + 1
    loadRoomInfo(currentRoom, nextIndex)
  }
  else {
    const roomInfo = currentRoom.infoList[infoIndex].text
    roomInfoElement.innerText = roomInfo
    loadOptionButtons(currentRoom, infoIndex)
  }
}

/**
 * Loads all option buttons when the user has reached the last info text of the room
 * @param {Object} currentRoom 
 * @param {Number} infoIndex 
 */
function loadOptionButtons(currentRoom, infoIndex) {
  options = currentRoom.infoList[infoIndex].optionList
  for (const option of options) {
    const optionButton = document.createElement('button')
    optionButton.innerText = option.text
    optionButton.classList.add('button')
    navGrid.appendChild(optionButton)
  }
}



/* -------------------------------- GAME ENVIRONMENT -------------------------------- */

const roomList = [
  {
    id: 1,
    infoList: [
      {
        text: 'This is the first info object in room 1'
      },
      {
        text: 'This is the second info object in room 1'
      },
      {
        text: 'This is the third info object in room 1',
        optionList: [
          {
            text: 'Go back to room 1',
            nextRoom: 1
          },
          {
            text: 'Go to room 3',
            nextRoom: 3
          },
          {
            text: 'Go to room 2',
            nextRoom: 2
          }
        ]
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