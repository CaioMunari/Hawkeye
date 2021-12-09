export const generatePassword = (word) => btoa(word) + random10();

function random10() {
  let a = "";
  for (let y = 0; y < 5; y++) {
    a = a + Math.random().toString(36).substring(3, 16);
  }
  return a.slice(0, 10);
}
