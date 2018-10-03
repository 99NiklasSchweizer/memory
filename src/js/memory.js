// TODO: Ett fungerande memory-spel ska skapas som använder sig utav de bilder som finns ibland filerna. Spelet ska ha brickor uppdelade i 4 rader, med 4 brickor på varje rad.
// TODO: Spelaren ska kunna se hur många gånger den försökt hitta par.
// TODO: Spelaren ska kunna se hur många par den har.
// TODO: Spelar ska kunna se under hur många sekunder som han har spelat.
// TODO: När ett par hittas så ska brickorna försvinna.
// TODO: Det ska enkelt gå att ladda in flera spel, genom att anropa en funktion flera gånger.
// TODO: När spelet är slut ska sekunder sluta räknas
// TODO: En enklare dokumentation i README.md som ska vara skriven i markup språket Markdown. Bör innehålla kortare information om vad som ligger i respektive fil samt vilka kommandon som ska köras för att starta utvecklingsserver samt hur man bygger en build.
const memory = () => {
  const rows = 4;
  const columns = 4;

  const containerId = 'memory';

  const container = document.getElementById(containerId);

  const template = document.querySelector('#memory template');

  const templateDiv = template.content.firstElementChild;

  const div = document.importNode(templateDiv, false);

  container.appendChild(div);

  for (let i = 0; i < rows * columns; i++) {
    const brick = document.importNode(templateDiv.firstElementChild, true);
    div.appendChild(brick);
  }
};

export default memory;
