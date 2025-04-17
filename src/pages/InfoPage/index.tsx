import { Instagram, Linkedin, Send } from "lucide-react";

const infos = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/taeho._.world/",
    icon: <Instagram />,
  },
  {
    name: "Email",
    link: "mailto:domybestatleastonceaweek@gmail.com",
    icon: <Send />,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/taeho-kim-0a504a335/",
    icon: <Linkedin />,
  },
];

const InfoPage = () => {
  const iconClassName = "cursor-pointer hover:text-[var(--muted)]";

  return (
    <div className="w-full h-full">
      {infos.map((info) => {
        return (
          <div key={info.name} className="flex flex-row items-center mb-2">
            <a
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center"
            >
              {info.icon}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default InfoPage;
