export const getNextArrayItem = <T>(array: Array<T>, currentItem: T): T => {
  const currentItemIndex = array.indexOf(currentItem);
  if (currentItemIndex === array.length - 1) {
    return array[0];
  }
  return array[currentItemIndex + 1];
};

export const getPreviousArrayItem = <T>(array: Array<T>, currentItem: T): T => {
  const currentItemIndex = array.indexOf(currentItem);
  if (currentItemIndex === 0) {
    return array[array.length - 1];
  }
  return array[currentItemIndex - 1];
};
