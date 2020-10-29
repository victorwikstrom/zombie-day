
/* ------------------------------- HTML Elements -------------------------------- */

const playerNameElement = document.getElementById('player-name')
const roomImageElement = document.getElementById('room-image')
const roomInfoElement = document.getElementById('room-info')
const navGrid = document.getElementById('nav-grid') 

roomInfoElement.classList.add('info-text')


/* ------------------------------- FUNCTIONS ----------------------------------- */

/** Initates the game loads the room number one. */
 function startGame() {
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
    const nextRoom = option.nextRoom
    console.log(nextRoom)

    optionButton.addEventListener('click', function loadNextRoom(option) {
      loadRoom(nextRoom)
    })
  }
}



/* -------------------------------- GAME ENVIRONMENT -------------------------------- */

const roomList = [
  {
    id: 1,
    infoList: [
      {
        text: 'You wake up in your bedroom. The birds are chirping and the sun is already shining. What a lovely day! You reach for your phone next to your bed and check the notifications. And oooo my god. The first thing you see  give you chills all over your body. You had completely forgot...'
      },
      {
        text: 'ITS FREAKING ZOMBIE DAY!!! The terrifying but also slightly exciting day of the year where everyone, except for yourself has turned into zombies for one day. You had completely forgot about this... and havent had any time to prepare or anything... '
      },
      {
        text: 'You listen carefully to your surroundings... Except for the happy birds outside, you can now hear your zombie room mate is lurking in the living room outside. What should you do next?',
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
    id: 2,
    infoList: [
      {
        text: 'Room two'
      },
      {
        text: 'ITS FREAKING ZOMBIE DAY!!! The terrifying but also slightly exciting day of the year where everyone, except for yourself has turned into zombies for one day. You had completely forgot about this... and havent had any time to prepare or anything... '
      },
      {
        text: 'You listen carefully to your surroundings... Except for the happy birds outside, you can now hear your zombie room mate is lurking in the living room outside. What should you do next?',
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
    id: 3,
    infoList: [
      {
        text: 'Room three'
      },
      {
        text: 'ITS FREAKING ZOMBIE DAY!!! The terrifying but also slightly exciting day of the year where everyone, except for yourself has turned into zombies for one day. You had completely forgot about this... and havent had any time to prepare or anything... '
      },
      {
        text: 'You listen carefully to your surroundings... Except for the happy birds outside, you can now hear your zombie room mate is lurking in the living room outside. What should you do next?',
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
    id: 0,
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