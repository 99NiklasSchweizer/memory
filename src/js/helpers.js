const getMixedNumberArray = arrayLength => {
  const arr = [];
  for (let i = 1; i < arrayLength + 1; i++) {
    arr.push(i);
    arr.push(i);
  }
  arr.forEach(() => {
    arr.sort(() => 0.5 - Math.random());
  });
  return arr;
};

export default getMixedNumberArray;
