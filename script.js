
/* ------------------------------- HTML Elements -------------------------------- */

const playerNameElement = document.getElementById('player-name')
const headerElement = document.getElementById('game-header')
const roomImageElement = document.getElementById('room-image')
const roomInfoElement = document.getElementById('room-info')
const nextElement = document.getElementById('next-container')
const navGrid = document.getElementById('nav-grid') 
const roomNameElement = document.getElementById('room-name')
const nameInput = document.getElementById('name-input')

// Add css styling to some text elements 
roomInfoElement.classList.add('info-text')
roomNameElement.classList.add('info-text', 'yellow-text')


/* ------------------------------- FUNCTIONS ----------------------------------- */

/** Initates the game, sets player name by prompt, and creates button to load the first room. */
 function startGame() {
   const button = document.createElement('button')
   button.innerText = 'Start game'
   button.classList.add('button')
   roomInfoElement.appendChild(button)
   button.addEventListener('click', () => loadRoom('bedroom'))
 }

 /**
  * Gets the name of the player from the input field.
  * @returns {string} Name of the player as a string
  */
 function getPlayerName() {
   return nameInput.value
 }

  

 /**
  * Loads the room the user is currently in and display the first info string. 
  * @param {string} roomId The string id of the room to load
  */
function loadRoom(roomId) {
  const gameHeader = getPlayerName()
  headerElement.innerText = gameHeader + "'s Zombie Day"
  const currentRoom = roomList.find(currentRoom => currentRoom.roomId === roomId)
  removeElements()
  roomNameElement.innerText = currentRoom.roomName
  loadRoomInfo(currentRoom, 0) 
}

/** Clears the GUI from all elements */
function removeElements() {
  while (navGrid.firstChild || roomInfoElement.firstChild) {
    navGrid.innerHTML = ''
    roomInfoElement.innerHTML = ''
  }
}

/**
 * Loads the info of the current room based on the index on the infoList array
 * @param {Object} currentRoom Room object where user currently is
 * @param {Number} infoIndex Index of the info text in infoList array
 */
function loadRoomInfo(currentRoom, infoIndex) {
    const roomInfo = currentRoom.infoList[infoIndex].text
    roomInfoElement.innerText = roomInfo
    createNextButton(currentRoom, infoIndex)
}

/**
 * Creates the button for displaying the next info text in the infoList array
 * @param {Object} currentRoom Room object where user currently is
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
 * Loads the next info object in the infoList array. If the index of the array object is less than the length of the array, the option buttons will load. 
 * @param {Object} currentRoom Room object where user currently is
 * @param {Number} infoIndex Index of the info text in infoList array
 */
function showNextInfo(currentRoom, infoIndex) {
  if (infoIndex < currentRoom.infoList.length - 1) {
    infoIndex += 1
    loadRoomInfo(currentRoom, infoIndex)
  }
  else {
    roomInfoElement.innerText = 'What do you want to do next?'
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
    optionButton.addEventListener('click', () => selectOption(nextRoom))
  }
}

function selectOption(nextRoom) {
  if (nextRoom === 'exit') {
    removeElements()
    roomNameElement.innerText = 'Thank you for playing Zombie Day'
    roomInfoElement.innerText = 'You may now close the browser window.'
  }
  else {
    loadRoom(nextRoom)
  }
}



/* -------------------------------- GAME ENVIRONMENT -------------------------------- */

/** List of all room objects. Highest in array hierarchy */
const roomList = [
  {
    roomId: 'bedroom',
    roomName: 'The Bedroom',
    infoList: [
      {
        text: 'You wake up in your bedroom. The birds are chirping and the sun is shining. What a lovely day. You reach for your phone to check for notifications. The first thing you see will give you chills all over your body. You had completely forgot...'
      },
      {
        text: '... ITS FREAKING ZOMBIE DAY! The terrifying but low-key exciting day of the year where everyone except for yourself has turned into zombies, for one day. You completely forgot about this and havent had time to prepare or anything... '
      },
      {
        text: '... You listen carefully to your surroundings. Except for the happy birds outside, you can now hear your zombie room mate is lurking in the living room outside. Oh my, imagine having to kill your roomie.',
        optionList: [
          {
            text: 'Walk out to the living room',
            nextRoom: 'living-room'
          },
          {
            text: 'Sneak out the bedroom window',
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
        text: 'You open the door to the living room and can see your room mate...'
      },
      {
        text: '.. He starts walking rapidly towards you. In panic you walk backwards look around for tools or ways to escape...',
        optionList: [
          {
            text: 'Try to rush by your room mate out into the garden',
            nextRoom: 'garden'
          },
          {
            text: 'Grab the something close to you and try to fight back your room mate',
            nextRoom: 'fight-roomie'
          }
        ]
      }
    ]
  },
  {
    roomId: 'fight-roomie',
    roomName: 'The Living Room',
    infoList: [
      {
        text: 'You grab the TV remote thats next to you while your roomie is rushing towards you...'
      },
      {
        text: '.. But wait, how could anyone, ANYONE, slay a zombie with a TV-remote?!?...'
      },
      {
        text: '... While you look stupid with the cute zombie slaying device, your roomie attacks you with full force. Everything turns black and you get eaten. Game over son...',
        optionList: [
          {
            text: 'Restart game',
            nextRoom: 'bedroom'
          },
          {
            text: 'Exit game',
            nextRoom: 'exit'
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
        text: 'You escaped and are now in the garden outside of your house. You scan your surroundings for any other zombies...'
      },
      {
        text: '... The coast seems clear and you walk slowly out into the streets. A few blocks up the street you know there is a hardware store where you might be able to get some survival supplies. Also, a few blocks down the other way there is a park where you might find a good place to hide.',
        optionList: [
          {
            text: 'Go to the hardware store',
            nextRoom: 'outside-store'
          },
          {
            text: 'Go to the park',
            nextRoom: 'park'
          }
        ]
      }
    ]
  },
  {
    roomId: 'outside-store',
    roomName: 'Outside of the Hardware Store',
    infoList: [
      {
        text: 'You found your way to the hardware store without getting eaten and are now standing outside its windows. '
      },
      {
        text: 'You try to take a look inside the store from the window, but its too dark. If there are already zombies in there, it will be very dangerous to go inside...'
      },
      {
        text: '... but also, without tools you are easy breakfast for the zombies.',
        optionList: [
          {
            text: 'Walk into the store via the front door',
            nextRoom: 'inside-store'
          },
          {
            text: 'Make your way back towards the park',
            nextRoom: 'park'
          }
        ]
      }
    ]
  },
  {
    roomId: 'inside-store',
    roomName: 'Inside of the Hardware Store',
    infoList: [
      {
        text: 'You carefully open the door to the store. Eveything seems quiet in there and you walk in.'
      },
      {
        text: '... You close the door behind you even more carefully and try to adjust your eyes to the darkness.'
      },
      {
        text: '... All of the sudden you hear a terrible gurgling sound behind you and see a massive zombie man walking towards you. F*ck, its zombie Mike, the store owner...'
      },
      {
        text: '... You quickly run the opposite way. On the other side of the store there are some shelves with different gardening tools...'
      },
      {
        text: '... You run towards the shelve to look for something to defend yourself with',
        optionList: [
          {
            text: 'Pick up a sledge hammer',
            nextRoom: 'hammer'
          },
          {
            text: 'Pick up a chainsaw',
            nextRoom: 'chainsaw'
          },
          {
            text: 'Pick up a digging spade',
            nextRoom: 'spade'
          }
        ]
      }
    ]
  },
  {
    roomId: 'hammer',
    roomName: 'Inside the Hardware Store',
    infoList: [
      {
        text: 'You pick up the sledge hammer. Its heavy, but you make a big swing towards Zombie Mikes head...'
      },
      {
        text: '... and the hammer misses, by just a few centimeters. Zombie Mike looks at you with his murky eyes and launches himself towards you...',
      },
      {
        text: '... He grabs your head and then its good night. Game over son...',
        optionList: [
          {
            text: 'Restart game',
            nextRoom: 'bedroom'
          },
          {
            text: 'Exit game',
            nextRoom: 'exit'
          }
        ]
      }
    ]
  },
  {
    roomId: 'chainsaw',
    roomName: 'Inside the Hardware Store',
    infoList: [
      {
        text: 'You pick up the chainsaw and look down on it. Damn it, you just realized you have no idea how these work...'
      },
      {
        text: '... while you try to figure out a way to start it Zombie Mike has already reached you...',
      },
      {
        text: '... Mike grabs your head and everything turns black. Game over son...',
        optionList: [
          {
            text: 'Restart game',
            nextRoom: 'bedroom'
          },
          {
            text: 'Exit game',
            nextRoom: 'exit'
          }
        ]
      }
    ]
  },
  {
    roomId: 'spade',
    roomName: 'Inside the Hardware Store',
    infoList: [
      {
        text: 'You pick up the spade and look at Mike, walking towards you...'
      },
      {
        text: '... and when he is only a few feet away you throw the spade towards Mikes head...',
      },
      {
        text: '... BULLSEYE BICH! The spade perfectly pierce Mikes head right in between the eyes and he slowly fall down on the ground just in front of you. God damn it, sorry Mike. Such a nice guy, normally...',
      }, 
      {
        text: 'You walk out the door of the Hardware Shop again, emotionally disrupted by the killing of Mike and start walking.',
        optionList: [
          {
            text: 'Walk towards the park to try and find a place to hide',
            nextRoom: 'park'
          },
          {
            text: 'Walk the other way, towards the city',
            nextRoom: 'city'
          }
        ]
      }
    ]
  },
  {
    roomId: 'city',
    roomName: 'The City',
    infoList: [
      {
        text: 'After about ten minutes of walking quietly towards the city, you start to hear something...'
      },
      {
        text: '... Out of the bushes next to you four zombie children starts rushing towards you. F*CK! You scream and starts running in the opposite direction...',
      },
      {
        text: '... but its too late. One of the zombie children has leeched onto your leg and bites...',
      }, 
      {
        text: '... F*CK!!! The pain... its too much. You cant run any longer and fall down while other zombie children jumps onto you.',
      },
      {
        text: 'Eveything turns black. Game over son...',
        optionList: [
          {
            text: 'Restart game',
            nextRoom: 'bedroom'
          },
          {
            text: 'Exit game',
            nextRoom: 'exit'
          }
        ]
      }
    ]
  },
  {
    roomId: 'park',
    roomName: 'The Park',
    infoList: [
      {
        text: 'You reach the park and can see some zombies walking in the distance. Luckily the park is quite big, so its easy to look out for approachers...'
      },
      {
        text: '... Anyways, you pick up a thick wooden branch to have somehting to defend yourself with, just in case...',
      },
      {
        text: '... Suddenly, two zombies walk out from the public toilett a few meters next to you. You look around and see a gorve of trees about 50 meters from you.',
        optionList: [
          {
            text: 'Fight back the zombies with your wooden stick',
            nextRoom: 'park-fight'
          },
          {
            text: 'Run towards the trees',
            nextRoom: 'tree-grove'
          }
        ]
      }
    ]
  },
  {
    roomId: 'tree-grove',
    roomName: 'The Park',
    infoList: [
      {
        text: 'You made it to the grove of trees, but the zombies are not far behind...'
      },
      {
        text: '... You run a little further into the grove and try to hide...',
      },
      {
        text: '... but the zombies are getting too close...',
        optionList: [
          {
            text: 'Climb up a tree',
            nextRoom: 'new-day'
          },
          {
            text: 'Fight the zombies with your branch',
            nextRoom: 'park-fight'
          }
        ]
      }
    ]
  },
  {
    roomId: 'park-fight',
    roomName: 'The Park',
    infoList: [
      {
        text: 'You run towards the zombies with the branch in your hands, ready to deliver the first strike...'
      },
      {
        text: '... You hit the first zombie in the head with full force...',
      },
      {
        text: '... Perfect strike in the zombies head. But the branch has split in two pieces and the zombie just look at you as if it was surprised. The branch was rotten. God damn it...'
      },
      {
        text: '... You try to fight back with the small piece of branch thats left, but theres no point. The zombies are to strong. You fall backwards and everything turns black. Game over son...',
        optionList: [
          {
            text: 'Restart game',
            nextRoom: 'bedroom'
          },
          {
            text: 'Exit game',
            nextRoom: 'exit'
          }
        ]
      }
    ]
  },
  {
    roomId: 'new-day',
    roomName: 'YOU SURVIVED!',
    infoList: [
      {
        text: 'HUGE CONGRATS! You made it up a tree and stayed there for the rest of the day. Turns out zombies cant climb trees, lol, and you have officially survived Zombie Day. See you next year!',
        optionList: [
          {
            text: 'Restart game',
            nextRoom: 'bedroom'
          },
          {
            text: 'Exit',
            nextRoom: 'exit'
          }
        ]
      }
    ]
  }
]

startGame()