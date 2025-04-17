import Text from "@/components/myUI/text";
import appStore from "@/store/appStore";
import { useState } from "react";

const Header = () => {
  const [titleTyped, setTitleTyped] = useState<boolean>(false);
  const { setHeaderRendered } = appStore();

  return (
    <header className="flex flex-col">
      <Text
        size="title"
        weight="thin"
        typing
        onTypingComplete={() => setTitleTyped(true)}
      >
        Taeho
      </Text>
      {titleTyped && (
        <Text
          size="caption"
          weight="thin"
          typing
          onTypingComplete={() => setHeaderRendered(true)}
        >
          Web Frontend Engineer
        </Text>
      )}
    </header>
  );
};

export default Header;
