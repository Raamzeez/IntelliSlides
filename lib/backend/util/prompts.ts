import Category from "../types/category";

const getPrompts = (
  type: "topic" | "details" | "image",
  category: Category,
  count: number,
  topic: string,
  title?: string
) => {
  const maxPointLength = 50;

  if (type === "topic") {
    const promptPrefix = count > 1 ? `What are ${count} major` : `What is 1 major`;
    const categoryPrompt = {
      Event: "chronological event titles",
      Person: "chapters regarding their life",
      Place: "major details",
      Object: "major features",
      Organization: "details regarding their work",
    }[category];

    return `${promptPrefix} ${categoryPrompt} of ${topic}? Please keep each point numbered and under ${maxPointLength} characters.`;
  } else if (type === "details") {
    const promptPrefix = count > 1 ? `Provide ${count} important` : `Provide 1 important`;
    const titleSuffix = title ? ` as it pertains to ${title}` : "";
    return `${promptPrefix} details about ${topic}${titleSuffix}? Please keep each detail numbered and under ${maxPointLength} characters.`;
  } else {
    return `${topic} ${title || ""}`;
  }
};

export default getPrompts;
