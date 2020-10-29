
/* ------------------------------- HTML Elements -------------------------------- */

const playerNameElement = document.getElementById('player-name')
const roomImageElement = document.getElementById('room-image')
const roomInfoElement = document.getElementById('room-info')
const navGrid = document.getElementById('nav-grid') 


/* ------------------------------- FUNCTIONS -------------------------------- */

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

/** Loads the info of the current room based on the index on the infoList array. */
function loadRoomInfo(currentRoom, infoIndex) {
  const roomInfo = currentRoom.infoList[infoIndex].text
  roomInfoElement.innerText = roomInfo

  const nextButton = document.createElement('button')
  nextButton.innerText = '>>'
  nextButton.classList.add('button')
  roomInfoElement.appendChild(nextButton)

  nextButton.addEventListener('click', () => showNextInfo(currentRoom, infoIndex))
}

function showNextInfo(currentRoom, infoIndex) {
  let nextIndex = infoIndex + 1
  loadRoomInfo(currentRoom, nextIndex)
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