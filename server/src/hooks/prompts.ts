const getPrompts = (
  type: "topic" | "details" | "image",
  count: number,
  heading: string,
  index: number,
  title?: string
) => {
  if (type == "topic") {
    if (index == 0) {
      return `Suggest ${count} chronological book chapter titles regarding ${heading}`;
    } else {
      return `What are ${count} major chronological events of ${heading}? Please keep each event to less than 10 words.`;
    }
  } else if (type == "details") {
    return `Provide ${count} important details about ${heading}${
      title ? "as it pertains to " + title : "?"
    }`;
  } else {
    return `${heading} ${title}`;
  }
};

export default getPrompts;
