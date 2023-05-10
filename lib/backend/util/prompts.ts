import Category from "../types/category"

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
                return `What are ${count} major chronological event titles of ${topic}? Please keep each numbered point to less than 10 words.`
            } else {
                return `What is 1 major event title of ${topic}? Please keep the numbered point to less than 10 words.`
            }
        } else if (category === "Person") {
            if (count > 1) {
                return `What are ${count} major chapters regarding ${topic}'s life? Keep each numbered point to less than 10 words.`
            } else {
                return `What is 1 major chapter regarding ${topic}'s life? Please keep it numbered and less than 10 words.`
            }
        } else if (category === "Place") {
            if (count > 1) {
                return `What are ${count} major details regarding ${topic}? Keep each numbered point to less than 10 words.`
            } else {
                return `What is 1 major detail regarding ${topic}. Please keep it numbered and less than 10 words.`
            }
        } else if (category === "Object") {
            if (count > 1) {
                return `What are ${count} major features of ${topic}? Keep each numbered point to less than 10 words.`
            } else {
                return `What is 1 major feature regarding ${topic}? Please keep it numbered and less than 10 words.`
            }
        } else if (category === "Organization") {
            if (count > 1) {
                return `What are ${count} major details regarding the work that ${topic} does? Keep each numbered point to less than 10 words.`
            } else {
                return `What is 1 major detail regarding the work that ${topic} does? Please keep it numbered and less than 10 words.`
            }
        } else {
            if (count > 1) {
                return `What are ${count} details regarding the concept of ${topic}? Keep each numbered point to less than 10 words.`
            } else {
                return `What is 1 major detail regarding the concept of ${topic}? Please keep it numbered and less than 10 words.`
            }
        }
    } else if (type == "details") {
        if (count > 1) {
            return `Provide ${count} important details about ${topic}${
                title
                    ? "as it pertains to " + title
                    : "? Please keep each detail numbered."
            }`
        } else {
            return `Provide 1 important detail about ${topic}${
                title
                    ? "as it pertains to " + title
                    : "? Please keep the detail numbered."
            }`
        }
    } else {
        return `${topic} ${title}`
    }
}

export default getPrompts
