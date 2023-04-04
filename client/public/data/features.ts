import iFeature from "../models/feature"

const features: iFeature[] = [
    {
        image: require("../images/Network.jpeg"),
        heading: "What is IntelliSlides?",
        body: "IntelliSlides is a web application that uses the GPT3 language model by OpenAI to create Google Slides presentations in a matter of minutes. Given a topic, category, and a slide count, IntelliSlides can intelligently determine the topic of each slide, and important, relevant bullet points.",
    },
    {
        image: require("../images/Library.jpeg"),
        heading: "Who can use it?",
        body: "Our web application is designed for anyone who needs to make presentations, regardless of their field or expertise. Whether you're a student, academic, employee, or just your average Joe who is curious about a topic, our platform can help simplify the presentation-making process and produce high-quality results.",
    },
]

export default features
