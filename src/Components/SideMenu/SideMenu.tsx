import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "../../Hooks/useIsMobile";
import GLightbox from "glightbox";

import type { Item } from "../../Types/Item";

import Seperator from "../../Assets/Seperator.svg";
import SeperatorMobile from "../../Assets/SeperatorMobile.svg";
import "glightbox/dist/css/glightbox.css";
import "./SideMenu.css";

type SideMenuProps = {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  items: Item[];
};

function SideMenu({ selectedIndex, setSelectedIndex, items }: SideMenuProps) {
  const [localIndex, setLocalIndex] = useState<number>(selectedIndex);
  const [localItems, setLocalItems] = useState<Item[]>([...items]);
  const lightboxRef = useRef<any>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    lightboxRef.current = GLightbox({
      // @ts-ignore
      elements: items.map((item) => ({
        href: item.image,
        type: "image",
        title: item.title,
        description: item.desc,
      })),
    });
    return () => {
      lightboxRef.current?.destroy();
    };
  }, []);

  const CONTAINER_HEIGHT: number = 416;
  const ITEM_HEIGHT: number = 80;
  const ITEM_WIDTH = 160;
  const ITEM_GAP: number = 32;

  const offset: number = isMobile
    ? -localIndex * (ITEM_WIDTH + ITEM_GAP) + // horizontal
      window.innerWidth / 2 -
      ITEM_WIDTH / 2
    : -localIndex * (ITEM_HEIGHT + ITEM_GAP) + // vertical
      CONTAINER_HEIGHT / 2 -
      ITEM_HEIGHT / 2;

  const handleClick = (i: number) => {
    console.log(i);
    if (i + 3 === localItems.length) {
      setLocalItems((prev) => {
        return [...prev, ...items];
      });
    }
    if (i === 1) {
      setLocalItems((prev) => {
        return [...items, ...prev];
      });
    }
    setLocalIndex(i);
    setSelectedIndex(i % items.length);
  };

  return (
    <div className="side-menu-container">
      <div className="glow-clip">
        <div className="bg-glow" />
      </div>
      <div className="control-panel">
        <div
          className="action-button"
          onClick={() => {
            handleClick(localIndex + 1);
          }}
        >
          <div className="next-btn">
            <div className="next-arrow"></div>
          </div>
        </div>
        <div className="seperator">
          {!isMobile && <img src={Seperator} alt="separator" />}
          {isMobile && <img src={SeperatorMobile} alt="separator" />}
        </div>
      </div>
      <div className="list">
        {!isMobile && <div className="first-item-clip"></div>}
        <div
          className="list-inner"
          style={{
            transform: isMobile
              ? `translateX(${offset}px)`
              : `translateY(${offset}px)`,
          }}
        >
          {localItems.map((item, index) => {
            return (
              <div
                key={index}
                className={`list-item ${
                  index === localIndex ? "active" : ""
                } glightbox-item`}
                data-href={item.image}
                onClick={() => handleClick(index)}
                onDoubleClick={() =>
                  lightboxRef.current?.openAt(index % items.length)
                }
              >
                <p className="list-item-title">{item.title}</p>
                <p className="list-item-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
      {isMobile && (
        <h1 className="side-menu-title">
          Ranked Among <span>The Top</span>
        </h1>
      )}
    </div>
  );
}

export default SideMenu;
