import LoadingType from "../types/loading";

const loadingStatuses: { type: LoadingType; message: string }[] = [
  { type: "ValidateParameters", message: "Validating Parameters" },
  { type: "FetchingCategory", message: "Fetching Category" },
  { type: "SlideTitles", message: "Getting Slide Titles" },
  { type: "SlideDetails", message: "Gathering Slide Details" },
  { type: "CreatePresentation", message: "Creating Presentation" },
];

export default loadingStatuses;
