const getPrompts = (
  type: "topic" | "details" | "image",
  count: number,
  topic: string,
  index: number,
  title?: string
) => {
  if (type == "topic") {
    if (count > 1) {
      return `What are ${count} major chronological events of ${topic}? Please keep each event to less than 10 words.`;
    } else {
      return `What is 1 major event of ${topic}? Please keep it to less than 10 words.`;
    }
  } else if (type == "details") {
    if (count > 1) {
      return `Provide ${count} important details about ${topic}${
        title ? "as it pertains to " + title : "?"
      }`;
    } else {
      return `Provide 1 important detail about ${topic}${
        title ? "as it pertains to " + title : "?"
      }`;
    }
  } else {
    return `${topic} ${title}`;
  }
};

export default getPrompts;
