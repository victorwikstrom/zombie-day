
/* ------------------------------- HTML Elements -------------------------------- */

const playerNameElement = document.getElementById('player-name')
const roomImageElement = document.getElementById('room-image')
const roomInfoElement = document.getElementById('room-info')
const navGrid = document.getElementById('nav-grid') 


/* ------------------------------- FUNCTIONS -------------------------------- */

/**
 * Initates the game, resets the state of the player and loads the first room 
 */
 function initGame() {
  loadRoom(1)
 }

function loadRoom(roomId) {

  let i = 0

  const currentRoom = roomList.find(currentRoom => currentRoom.id === roomId)
  const roomInfo = currentRoom.infoList[1].text
  roomInfoElement.innerText = roomInfo

  const nextButton = document.createElement('button')
  nextButton.innerText = '>'
  nextButton.classList.add('button')
  roomInfoElement.appendChild(nextButton)

  nextButton.addEventListener('click', () => updateIndex() )
    
  }

function updateIndex() {
  console.log('test')
}


while (navGrid.firstChild) {
  navGrid.removeChild(navGrid.firstChild)
}
while (roomInfoElement.firstChild) {
  roomInfoElement.removeChild(roomInfoElement.firstChild)
}




/* -------------------------------- GAME ENVIRONMENT -------------------------------- */

const roomList = [
  {
    id: 1,
    infoList: [
      {
        text: 'This is the first info object in room 1',
        textId: 1,
        nextTextId: 2,
        optionList: [
          { text: 'Go to room 2',
            nextRoom: 2
          },
          { text: 'Go to room 3',
            nextRoom: 3
          }
        ]
      },
      {
        text: 'This is the second info object in room 1',
        textId: 2,
        nextTextId: 3,
        optionList: [
          { text: 'Go to room 2',
            nextRoom: 2
          },
          { text: 'Go to room 3',
            nextRoom: 3
          }
        ]
      },
      {
        text: 'This is the third info object in room 1',
        textId: 3,
        nextTextId: 3,
        optionList: [
          { text: 'Go to room 2',
            nextRoom: 2
          },
          { text: 'Go to room 3',
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