import { Response } from "express";
import categories from "../data/categories";
import iParameters from "../models/parameters";

const errorChecks = (parameters: iParameters, res: Response) => {
  if (!parameters.topic) {
    return res.status(400).send("Incorrect Parameters: No Topic Provided");
  }
  if (parameters.topic.length < 2) {
    return res
      .status(400)
      .send("Incorrect Parameters: Topic Less Than 2 Characters");
  }
  if (!parameters.slideCount) {
    return res
      .status(400)
      .send("Incorrect Parameters: No Value for Slide Count");
  }
  if (parameters.slideCount < 1) {
    return res
      .status(400)
      .send("Incorrect Parameters: Slide Count Cannot Be Less Than 1");
  }
  if (parameters.slideCount > 20) {
    return res
      .status(400)
      .send("Incorrect Parameters: Slide Count Cannot Exceed 25");
  }
  if (
    categories.filter((category) => category === parameters.category).length !==
    1
  ) {
    return res.status(400).send("Incorrect Parameters: Invalid Category");
  }
};

export default errorChecks;
