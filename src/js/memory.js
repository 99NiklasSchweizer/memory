// TODO: Ett fungerande memory-spel ska skapas som använder sig utav de bilder som finns ibland filerna. Spelet ska ha brickor uppdelade i 4 rader, med 4 brickor på varje rad.
// TODO: Spelaren ska kunna se hur många gånger den försökt hitta par.
// TODO: Spelaren ska kunna se hur många par den har.
// TODO: Spelar ska kunna se under hur många sekunder som han har spelat.
// TODO: När ett par hittas så ska brickorna försvinna.
// TODO: Det ska enkelt gå att ladda in flera spel, genom att anropa en funktion flera gånger.
// TODO: När spelet är slut ska sekunder sluta räknas
// TODO: En enklare dokumentation i README.md som ska vara skriven i markup språket Markdown. Bör innehålla kortare information om vad som ligger i respektive fil samt vilka kommandon som ska köras för att starta utvecklingsserver samt hur man bygger en build.
const renderMemory = (containerId, bricks) => {
  const container = document.getElementById(containerId);

  const template = document.querySelector('#memory template');

  const templateDiv = template.content.firstElementChild;

  const div = document.importNode(templateDiv, false);

  container.appendChild(div);

  for (let i = 0; i < bricks.tiles.length; i++) {
    const handleClick = event => {
      let img;
      if (event.target.tagName === 'DIV') {
        img = event.target.firstElementChild;
      } else {
        img = event.target;
      }
      console.log(img);
      const path = `images/${bricks.tiles[i]}.png`;
      img.setAttribute('src', path);
    };
    const brick = document.importNode(templateDiv.firstElementChild, true);
    brick.addEventListener('click', handleClick);
    div.appendChild(brick);
  }
  
}

const memory = () => {
  const renderOptions = {
  rows: 4,
  columns: 4
  }
  const bricks ={ 
    tiles: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  }

  const containerId = 'memory';
  
  renderMemory(containerId, bricks);
};

export default memory;
