import Category from "../types/category";
import iSlideInfo from "./slideInfo";

interface iParameters {
  topic: string;
  category: Category;
  title: string;
  subtitle: string;
  slideCount: number;
  model:
    | "text-davinci-003"
    | "text-curie-001"
    | "text-babbage-001"
    | "text-ada-001";
  auto?: boolean;
  titles?: string[];
  images?: boolean;
  sources?: boolean;
  slidesInfo?: iSlideInfo[];
}

export default iParameters;
