export function convertStringInSlug(name: string) {
  const newName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  return newName.split(" ").join("-").toLocaleLowerCase();
}
