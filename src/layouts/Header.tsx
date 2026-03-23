import Text from "@/components/myUI/text";
import appStore from "@/store/appStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Header = ({ animate }: { animate: boolean }) => {
  const [titleTyped, setTitleTyped] = useState<boolean>(!animate);
  const { setHeaderRendered } = appStore();
  const { t } = useTranslation();

  return (
    <header className="flex flex-col">
      <Text
        size="title"
        weight="thin"
        typing={animate}
        onTypingComplete={() => setTitleTyped(true)}
      >
        Taeho
      </Text>
      {titleTyped && (
        <Text
          size="caption"
          weight="thin"
          typing={animate}
          onTypingComplete={() => setHeaderRendered(true)}
        >
          {t('header.subtitle')}
        </Text>
      )}
    </header>
  );
};

export default Header;
