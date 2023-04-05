import Category from "../types/category";

const getPrompts = (
  type: "topic" | "details" | "image",
  category: Category,
  count: number,
  topic: string,
  title?: string
) => {
  if (type === "topic") {
    if (category === "Event") {
      if (count > 1) {
        return `What are ${count} major chronological events of ${topic}? Please keep each event to less than 10 words.`;
      } else {
        return `What is 1 major event of ${topic}? Please keep it to less than 10 words.`;
      }
    } else if (category === "Person") {
      if (count > 1) {
        return `What are ${count} major chapters regarding ${topic} life? Keep each chapter to less than 10 words.`;
      } else {
        return `In less than 10 words, what is one major chapter in ${topic} life?`;
      }
    } else if (category === "Place") {
      if (count > 1) {
        return `What are ${count} major details regarding ${topic}? Keep each detail to less than 10 words.`;
      } else {
        return `In less than 10 words, what is one major detail regarding ${topic}?`;
      }
    } else if (category === "Object") {
      if (count > 1) {
        return `What are ${count} features of ${topic}? Keep each feature to less than 10 words.`;
      } else {
        return `In less than 10 words, what is one major feature of ${topic}?`;
      }
    } else if (category === "Organization") {
      if (count > 1) {
        return `What are ${count} details regarding the work that ${topic} does? Keep each detail to less than 10 words.`;
      } else {
        return `In less than 10 words, is one major detail regarding the work that ${topic} does?`;
      }
    } else {
      if (count > 1) {
        return `What are ${count} details regarding the concept of ${topic}? Keep each detail to less than 10 words.`;
      } else {
        return `In less than 10 words, what is one major detail regarding the concept ${topic}?`;
      }
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
