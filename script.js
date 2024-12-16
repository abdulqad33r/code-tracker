const textContainer = document.querySelector("div.text-container"),
  text = "Code is like humor. When you have to explain it, it's bad.",
  // text = "",
  totalCharacters = text.replace(/\s/g, "").length

//| Split the whole text into single characters excluding spaces

const createTextHTML = () => {
  const fragment = document.createDocumentFragment()

  text.split(" ").forEach((word) => {
    const wordDiv = document.createElement("div")
    wordDiv.className = "word"

    word.split("").forEach((char) => {
      const charDiv = document.createElement("div")
      charDiv.className = "character"

      charDiv.innerHTML = `<span class="character-behind">${char.toUpperCase()}</span>
                           <span class="character-top">${char.toUpperCase()}</span>`

      wordDiv.append(charDiv)
    })

    fragment.append(wordDiv)
  })

  textContainer.append(fragment)
}
createTextHTML()

const allSpans = textContainer.querySelectorAll("span.character-top")

// const lerp = (start, end, delta) => start + delta * (end - start)

const setStylesToCharacter = (index, delta) => {
  if (index < allSpans.length) {
    const span = allSpans[index]

    span.style.opacity = delta
    span.style.scale = 2 - delta
  }
}

const scrollableHeight =
  document.documentElement.scrollHeight - window.innerHeight
const scrollHeightOfChar = scrollableHeight / totalCharacters

let lastScroll = window.scrollY

const handleScroll = () => {
  const scrollTop = window.scrollY,
    elementPos = scrollTop / scrollHeightOfChar,
    elementIndex = Math.floor(elementPos),
    delta = elementPos - elementIndex //? From 0 to 1

  const isScrollingDown = scrollTop > lastScroll

  if (isScrollingDown) {
    for (let i = 0; i < elementIndex; i++) setStylesToCharacter(i, 1)
  } else {
    for (let i = totalCharacters - 1; i > elementIndex; i--)
      setStylesToCharacter(i, 0)
  }
  setStylesToCharacter(elementIndex, delta)

  lastScroll = scrollTop
}

//? Throttle scroll is just for performance, you can remove it if you don't really care about performance and just use the handleScroll()
let throttleTimeout = null
const throttleScroll = () => {
  if (!throttleTimeout) {
    throttleTimeout = setTimeout(() => {
      handleScroll()
      throttleTimeout = null
    }, 100)
  }
}

handleScroll()

window.onload = () => {
  document.body.classList.add("transition-enabled")
}

window.onscroll = throttleScroll

// const createBackgroundBoxes = () => {
//   const allBoxes = Array.from({ length: 5 }).map(() => {
//     const box = document.createElement("div")
//     box.classList.add("box")
//     document.body.appendChild(box)

//     return box
//   })

//   allBoxes.forEach((box) => {
//     const generateRandom = (max, min = 0) =>
//       Math.floor(Math.random() * (max - min) + min)

//     box.style.transform = `translateX(${generateRandom(
//       window.innerWidth
//     )}px) translateY(${generateRandom(window.innerHeight)}px)`

//     box.style.width = generateRandom(400) + "px"

//     const first = generateRandom(100, 20),
//       second = 100 - first,
//       third = generateRandom(100, 20),
//       fourth = 100 - third,
//       fifth = generateRandom(100, 20),
//       sixth = generateRandom(100, 20),
//       seventh = 100 - sixth,
//       last = 100 - fifth

//     box.style.borderRadius = `${first}% ${second}% ${third}% ${fourth}% / ${fifth}% ${sixth}% ${seventh}% ${last}%`
//   })
// }

// createBackgroundBoxes()
