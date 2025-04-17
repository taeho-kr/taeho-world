import { Company, Project } from "@/types";
import styleARImage from "./images/stylear.webp";

const projects: Project[] = [
  {
    id: 1,
    company: 1,
    product: "StyleAR",
    domains: ["AI", "E-Commerce", "Beauty"],
    start: "2020-02",
    end: "2021-06",
    url: "https://www.stylear.ai/",
    image: styleARImage,
  },
  {
    id: 2,
    company: 2,
    product: "HyperChatbot",
    domains: ["AI", "E-Commerce", "Beauty"],
    start: "2020-02",
    end: "2021-06",
    url: "https://www.tmax.co.kr/hyperchatbot",
    image: styleARImage,
  },
  {
    id: 3,
    company: 2,
    product: "Research Information Sharing Service",
    domains: ["AI", "Academic"],
    start: "2021-12",
    end: "2022-12",
    url: "https://www.riss.kr/",
    image: styleARImage,
  },
  {
    id: 4,
    company: 3,
    product: "TMS",
    domains: ["Physical security", "Geographic", "Video"],
    start: "2023-04",
    end: "2024-06",
    videoUrl: "https://www.youtube.com/watch?v=uvrNgaAT7wM",
  },
  {
    id: 6,
    company: 3,
    product: "VUNex MLOps",
    domains: ["AI", "MLOps"],
    start: "2024-10",
    url: "https://mlops.vunex-cloud.com/",
  },
];

const company: Company[] = [
  {
    id: 1,
    name: "Deepixel",
    url: "https://www.deepixel.xyz/",
  },
  {
    id: 2,
    name: "Tmax AI",
    url: "https://www.tmax.co.kr/tmaxai",
  },
  {
    id: 3,
    name: "Innodep Inc.",
    url: "https://innodep.co.kr/",
  },
];

export { projects, company };
