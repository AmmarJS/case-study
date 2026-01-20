import { useState } from "react";

import type { Item } from "../../Types/Item";

import SideMenu from "../SideMenu/SideMenu";
import Projects from "../Projects/Projects";

import "./CaseStudies.css";

function CaseStudies() {
  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  const items: Item[] = [
    {
      id: 0,
      image: "https://picsum.photos/id/237/390/434",
      title: "1st",
      desc: "Lorem ipsum dolor sit amet",
    },
    {
      id: 1,
      image: "https://picsum.photos/id/238/390/434",
      title: "2nd",
      desc: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      image: "https://picsum.photos/id/239/390/434",
      title: "3rd",
      desc: "Lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      image: "https://picsum.photos/id/240/390/434",
      title: "4th",
      desc: "Lorem ipsum dolor sit amet",
    },
    {
      id: 4,
      image: "https://picsum.photos/id/241/390/434",
      title: "5th",
      desc: "Lorem ipsum dolor sit amet",
    },
    {
      id: 5,
      image: "https://picsum.photos/id/242/390/434",
      title: "6th",
      desc: "Lorem ipsum dolor sit amet",
    },
  ];

  return (
    <section className="case-studies-container">
      <Projects selectedIndex={selectedIndex} items={items} />
      <SideMenu
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        items={items}
      />
    </section>
  );
}

export default CaseStudies;
