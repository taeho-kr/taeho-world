import { useRecoilState } from "recoil";
import { StoriesAtom } from "../store/story";

const useStory = () => {
  const [story, setStory] = useRecoilState(StoriesAtom);

  const openStory = (users) => {
    setStory({
      show: true,
      users,
    });
  };

  const closeStory = () => {
    setStory({
      show: false,
      users: [],
    });
  };

  return { openStory, closeStory };
};

export default useStory;
