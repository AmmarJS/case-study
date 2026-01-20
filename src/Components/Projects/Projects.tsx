import { useRef, useEffect } from "react";
import { useIsMobile } from "../../Hooks/useIsMobile";

import type { Item } from "../../Types/Item";

import Card from "../Card/Card";
import "./Projects.css";

type ProjectsProps = {
  selectedIndex: number;
  items: Item[];
};

function Projects({ selectedIndex, items }: ProjectsProps) {
  const swiperRef = useRef<any>(null);
  const isMobile = useIsMobile();

  function getStackPosition(index: number, active: number, total: number) {
    const raw = (index - active + total) % total;

    // outgoing card (just left)
    if (raw === total - 1) return -1;

    // active + next 3 cards
    if (raw >= 0 && raw <= 3) return raw;

    // hide everything else
    return 99;
  }

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(selectedIndex, 500);
    }
  }, [selectedIndex]);

  return (
    <div className="projects-section">
      {!isMobile && <h1 className="projects-title">Case Studies</h1>}
      <div className="projects-container">
        <div className="projects">
          {items.map((item, index) => {
            const pos = getStackPosition(index, selectedIndex, items.length);

            return (
              <div
                key={item.id}
                className="stacked-card"
                style={
                  {
                    "--pos": pos,
                  } as React.CSSProperties
                }
              >
                <Card image={item.image} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Projects;
