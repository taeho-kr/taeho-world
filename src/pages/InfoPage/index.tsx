import Expertise from "./components/Expertise";
import SNSArea from "./components/SNSArea";

const InfoPage = () => {
  return (
    <div className="w-full lg:h-full flex flex-col justify-center items-center gap-10 pt-5 pb-20 md:pb-0">
      <Expertise />
      <SNSArea />
    </div>
  );
};

export default InfoPage;
