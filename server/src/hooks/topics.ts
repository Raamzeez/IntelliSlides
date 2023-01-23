const parseList = (response: string): string[] => {
  const items = [];
  const rawItemsArray = response.split("\n");
  rawItemsArray.forEach((title) => {
    if (title.length > 0) {
      items.push(title.split(". ")[1]);
    }
  });
  return items;
};

export default parseList;
