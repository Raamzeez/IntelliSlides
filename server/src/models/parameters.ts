interface iParameters {
  title: string;
  topic: string;
  subtitle: string;
  slideCount: number;
  model:
    | "text-davinci-003"
    | "text-curie-001"
    | "text-babbage-001"
    | "text-ada-001";
  images?: boolean;
  sources?: boolean;
}

export default iParameters;
