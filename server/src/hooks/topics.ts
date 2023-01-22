const topics = (response: string): string[] => {
  const titles = [];
  const rawTitlesArray = response.split("\n");
  rawTitlesArray.forEach((title) => {
    if (title.length > 0) {
      titles.push(title.split(". ")[1]);
    }
  });
  return titles;
};
