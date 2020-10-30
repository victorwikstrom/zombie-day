
/* ------------------------------- HTML Elements -------------------------------- */

const playerNameElement = document.getElementById('player-name')
const roomImageElement = document.getElementById('room-image')
const roomInfoElement = document.getElementById('room-info')
const nextElement = document.getElementById('next-container')
const navGrid = document.getElementById('nav-grid') 
const roomNameElement = document.getElementById('room-name')

// Add css styling to some text elements 
roomInfoElement.classList.add('info-text')
roomNameElement.classList.add('info-text', 'yellow-text')


/* ------------------------------- FUNCTIONS ----------------------------------- */

/** Initates the game loads the room number one. */
 function startGame() {
  loadRoom('bedroom')
 }

 /** Loads the room the user is currently in and display the first info string. */
function loadRoom(roomId) {
  const currentRoom = roomList.find(currentRoom => currentRoom.roomId === roomId)
  roomNameElement.innerText = currentRoom.roomName

  removeElements()
  loadRoomInfo(currentRoom, 0) 
}

/** Removes all elements from navGridElement and roomInfoElement. */
function removeElements() {
  while (navGrid.firstChild || roomInfoElement.firstChild) {
    navGrid.innerHTML = ''
    roomInfoElement.innerHTML = ''
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
  nextButton.addEventListener('click', () => showNextInfo(currentRoom, infoIndex))
  roomInfoElement.appendChild(nextButton)
}

/**
 * Shows the next info text of a room. If the info text is the last of the room, option buttons will load. 
 * @currentRoom {Object} *Represent the users current room 
 * @param {Number} infoIndex 
 */
function showNextInfo(currentRoom, infoIndex) {
  if (infoIndex < currentRoom.infoList.length - 1) {
    infoIndex += 1
    loadRoomInfo(currentRoom, infoIndex)
    console.log(infoIndex)
    console.log(currentRoom.infoList.length - 1)
  }
  else {
    roomInfoElement.innerText = 'What should you do next?'
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
    const nextRoom = option.nextRoom
    optionButton.innerText = option.text
    optionButton.classList.add('button')
    navGrid.appendChild(optionButton)
    optionButton.addEventListener('click', () => loadRoom(nextRoom))
  }
}



/* -------------------------------- GAME ENVIRONMENT -------------------------------- */

const roomList = [
  {
    roomId: 'bedroom',
    roomName: 'The Bedroom',
    infoList: [
      {
        text: 'You wake up in your bedroom. The birds are chirping and the sun is already shining. What a lovely day! You reach for your phone next to your bed and check the notifications. The first thing you see  give you chills all over your body. You had completely forgot...'
      },
      {
        text: 'ITS FREAKING ZOMBIE DAY!!! The terrifying but also low-key exciting day of the year where everyone, except for yourself has turned into zombies for one day. You had completely forgot about this... and havent had any time to prepare or anything... '
      },
      {
        text: 'You listen carefully to your surroundings... Except for the happy birds outside, you can now hear your zombie room mate is lurking in the living room outside. What should you do next?',
        optionList: [
          {
            text: 'Walk out to the living room',
            nextRoom: 'living-room'
          },
          {
            text: 'Sneak out the bedroom window (you dont want to risk having to kill your room mate, as he is (normally) a pretty nice guy)',
            nextRoom: 'garden'
          }
        ]
      }
    ]
  },
  {
    roomId: 'living-room',
    roomName: 'The Living Room',
    infoList: [
      {
        text: 'You open the door to the living room and can see your room mate.'
      },
      {
        text: 'He starts walking rapidly towards you. In panic you walk backwards look around you for tools and espace routes. What should yo do next?',
        optionList: [
          {
            text: 'Try to run past him without getting caught',
            nextRoom: 3
          },
          {
            text: 'Grab hold of the tv remote next to you and try to fight back your room mate',
            nextRoom: 3
          }
        ]
      }
    ]
  },
  {
    roomId: 'garden',
    roomName: 'The Garden',
    infoList: [
      {
        text: 'Room three'
      },
      {
        text: 'ITS FREAKING ZOMBIE DAY!!! The terrifying but also slightly exciting day of the year where everyone, except for yourself has turned into zombies for one day. You had completely forgot about this... and havent had any time to prepare or anything... '
      },
      {
        text: 'You listen carefully to your surroundings... Except for the happy birds outside, you can now hear your zombie room mate is lurking in the living room outside.',
        optionList: [
          {
            text: 'Walk out to the living room',
            nextRoom: 2
          },
          {
            text: 'Sneak out the bedroom window. You dont want to risk having to kill your room mate, as he is (normally) a pretty nice guy',
            nextRoom: 3
          }
        ]
      }
    ]
  },
  {
    roomId: 'death',
    roomName: '',
    infoList: [
      {
        text: 'You are dead. Eaten alive. Fuck zombie day...',
        optionList: [
          {
            text: 'Restart game',
            nextRoom: 1
          }
        ]
      }
    ]
  }
]

startGame()