import getMixedNumberArray from './helpers';

// TODO: Ett fungerande memory-spel ska skapas som använder sig utav de bilder som finns ibland filerna. Spelet ska ha brickor uppdelade i 4 rader, med 4 brickor på varje rad.
// TODO: Spelaren ska kunna se hur många gånger den försökt hitta par.
// TODO: Spelaren ska kunna se hur många par den har.
// TODO: Spelar ska kunna se under hur många sekunder som han har spelat.
// TODO: När ett par hittas så ska brickorna försvinna.
// TODO: Det ska enkelt gå att ladda in flera spel, genom att anropa en funktion flera gånger.
// TODO: När spelet är slut ska sekunder sluta räknas
// TODO: En enklare dokumentation i README.md som ska vara skriven i markup språket Markdown. Bör innehålla kortare information om vad som ligger i respektive fil samt vilka kommandon som ska köras för att starta utvecklingsserver samt hur man bygger en build.
const timer = score => {
  const timeEL = document.getElementById('time');
  const t = window.setInterval(() => {
    const currentTime = Date.now();
    score.time = Math.round((currentTime - score.startTime) / 1000);
    timeEL.textContent = score.time;
  }, 1000);
  return t;
};

const turnBrick = (bricks, img, score, renderOptions, t) => {
  const pairsEL = document.getElementById('pairs');
  const triesEL = document.getElementById('tries');

  if (
    bricks.first.getAttribute('src') === bricks.second.getAttribute('src') &&
    bricks.first.getAttribute('data-index-number') !==
      bricks.second.getAttribute('data-index-number')
  ) {
    const removeBrick = () => {
      bricks.first.parentElement.classList.add('hidden');
      bricks.second.parentElement.classList.add('hidden');

      score.pairs += 1;
      score.tries += 1;
      pairsEL.textContent = score.pairs;
      triesEL.textContent = score.tries;

      bricks.first = null;
      bricks.second = null;
      if ((renderOptions.rows * renderOptions.columns) / 2 === score.pairs) {
        const msgEL = document.getElementById('win-message');
        msgEL.textContent = `Grattis! Du vann efter ${score.tries} försök och fick ${
          score.pairs
        } par på ${score.time} sekunder`;
      }
    };
    window.setTimeout(removeBrick, 500);
  } else {
    const turnBackBrick = () => {
      const path = 'images/0.png';

      bricks.first.setAttribute('src', path);
      bricks.second.setAttribute('src', path);
      score.tries += 1;
      triesEL.textContent = score.tries;
      bricks.first = null;
      bricks.second = null;
    };
    window.setTimeout(turnBackBrick, 500);
  }
};

const renderMemory = (containerId, bricks, score, renderOptions) => {
  const container = document.getElementById(containerId);

  const template = document.querySelector('#memory template');

  const templateDiv = template.content.querySelector('.memory');
  const headerDiv = template.content.getElementById('header');

  const div = document.importNode(templateDiv, false);
  const header = document.importNode(headerDiv, true);

  div.appendChild(header);
  container.appendChild(div);
  const t = timer(score);

  for (let i = 0; i < bricks.tiles.length; i++) {
    const handleClick = event => {
      let img;
      if (event.target.tagName === 'DIV') {
        img = event.target.firstElementChild;
      } else {
        img = event.target;
      }
      const path = `images/${bricks.tiles[i]}.png`;
      img.setAttribute('src', path);
      if (bricks.second !== null) {
        return;
      }
      if (bricks.first === null) {
        bricks.first = img;
      } else {
        bricks.second = img;
        turnBrick(bricks, img, score, renderOptions, t);
      }
    };
    const brick = document.importNode(templateDiv.firstElementChild, true);
    brick.addEventListener('click', handleClick);
    brick.firstElementChild.setAttribute('data-index-number', i);
    div.appendChild(brick);
  }
};

const memory = () => {
  const renderOptions = {
    rows: 4,
    columns: 4
  };

  const bricks = {
    first: null,
    second: null,
    tiles: getMixedNumberArray((renderOptions.rows * renderOptions.columns) / 2)
  };

  const score = {
    tries: 0,
    pairs: 0,
    time: 0,
    startTime: Date.now()
  };

  const containerId = 'memory';
  renderMemory(containerId, bricks, score, renderOptions);
};

export default memory;
