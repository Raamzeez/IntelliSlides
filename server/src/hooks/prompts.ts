const getPrompts = (
  type: "topic" | "details" | "image",
  count: number,
  topic: string,
  index: number,
  title?: string
) => {
  if (type == "topic") {
    if (index == 0) {
      return `Suggest ${count} chronological book chapter titles regarding ${topic}`;
    } else {
      return `What are ${count} major chronological events of ${topic}? Please keep each event to less than 10 words.`;
    }
  } else if (type == "details") {
    return `Provide ${count} important details about ${topic}${
      title ? "as it pertains to " + title : "?"
    }`;
  } else {
    return `${topic} ${title}`;
  }
};

export default getPrompts;
