import authorize from "./functions/authorize";
import createPresentation from "./functions/createPresentation";
import getTopics from "./functions/getTopics";
import iParameters from "./models/parameters";

const parameters: iParameters = {
  title: "WW2",
  heading: "Major Events of WW2",
  subtitle: "By: Mohammed Raamiz Abbasi",
  slideCount: 6,
};

// authorize()
//   .then((client) => {
//     console.log("Successful authentication!");
//     createPresentation(parameters, client)
//       .then((presentation) => {
//         console.log("Success!");
//         console.log("Presentation Object:\n");
//         console.log(JSON.stringify(presentation.data.slides, null, 2));
//       })
//       .catch((err) => {
//         console.log(JSON.stringify(err, null, 2));
//       });
//   })
//   .catch(console.error);

getTopics(parameters.heading, parameters.slideCount);
