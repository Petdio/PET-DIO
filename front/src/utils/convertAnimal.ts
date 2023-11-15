export default function convertAnimal(animalKO: string) {
  let animalEN = "";
  switch (animalKO) {
    case "개":
      animalEN = "dog";
      break;
    case "고양이":
      animalEN = "cat";
      break;
  }
  return animalEN;
}
