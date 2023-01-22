import authorize from "./functions/authorize";
import createPresentation from "./functions/createPresentation";
import iParameters from "./models/parameters";

const parameters: iParameters = {
  title: "WW2",
  heading: "Major Events of WW2",
  subtitle: "By: Mohammed Raamiz Abbasi",
};

authorize()
  .then((client) => {
    console.log("Successful authentication!");
    createPresentation("Test1", client)
      .then(() => console.log("Success!"))
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
      });
  })
  .catch(console.error);
