export function filterTypeAnimal(animal: string): string {
  switch (animal) {
    case "Cachorro":
      return "dog";
    case "Gato":
      return "cat";
    case "Pássaro":
      return "bird";
    case "Peixe":
      return "fish";
    case "Roedor":
      return "rodent";
    case "Réptil":
      return "reptile";
    default:
      return ""; 
  }
}