const getTopicPrompts = (
  slideCount: number,
  heading: string,
  index: number
) => {
  if (index == 0) {
    return `Suggest ${slideCount} chronological book chapter titles regarding ${heading}`;
  } else {
    return `What are ${slideCount} major chronological events of ${heading}? Please keep each event to less than 10 words.`;
  }
};

export default getTopicPrompts;
