import authorize from "./functions/authorize";
import createPresentation from "./functions/createPresentation";

authorize()
  .then(() => {
    createPresentation("Test1")
      .then(() => console.log("Success!"))
      .catch(console.error);
  })
  .catch(console.error);
