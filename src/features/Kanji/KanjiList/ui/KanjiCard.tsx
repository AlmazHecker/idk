import React, { FC, useRef, useState } from "react";
import { Card, CardContent } from "@ui/card";
import { KVGAnimator } from "@/src/features/Kanji/KanjiList/lib/animate-kanji";

type KanjiCardProps = {
  kanji: string;
  kunyomi: string;
  onyomi: string;
  meaning: string;
  jlptLevel: string;
  strokes: number;
};

export const KanjiCard: FC<KanjiCardProps> = ({
  kanji,
  kunyomi,
  onyomi,
  meaning,
  jlptLevel,
  strokes,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const svgContainerRef = useRef<HTMLDivElement>(null);

  const getKanjiCode = async (kanjiChar: string): Promise<string> => {
    const code = kanjiChar.charCodeAt(0).toString(16).padStart(5, "0");
    const res = await fetch(
      `https://kanjivg.tagaini.net/kanjivg/kanji/${code}.svg`,
    );
    const data = await res.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "image/svg+xml");
    xmlDoc.documentElement.id = kanjiChar;
    return new XMLSerializer().serializeToString(xmlDoc);
  };

  const handleMouseEnter = async () => {
    setIsHovered(true);
    const svgData = await getKanjiCode(kanji);

    if (!svgContainerRef.current) return;
    svgContainerRef.current.innerHTML = svgData;

    const svgElement = document.getElementById(kanji);
    if (!svgElement) return;

    colorSVGGroups(svgElement);
    new KVGAnimator(svgElement, 500);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const colorSVGGroups = (svgElement: HTMLElement) => {
    const colours = ["red", "orange", "green", "blue", "goldenrod"];
    const groups = svgElement.getElementsByTagName("g");

    Array.from(groups).forEach((group, index) => {
      const paths = group.getElementsByTagName("path");
      Array.from(paths).forEach((path) => {
        path.style.stroke = colours[index % colours.length];
      });
    });
  };
  return (
    <Card className="w-[390px] p-5 border dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 shadow-[10px_10px_0px_-3px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_-3px_rgba(255,255,255,0.1)] transition-colors">
      <div
        className="w-full h-60 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden cursor-pointer relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: isHovered ? 0 : 1 }}
        >
          <span className="text-[200px] font-bold text-gray-800 dark:text-gray-100">
            {kanji}
          </span>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <div
            ref={svgContainerRef}
            className=" object-contain transition-transform duration-300 transform scale-200"
          />
        </div>
      </div>

      <CardContent className="p-0 mt-4">
        <div className="flex justify-between items-center">
          <button className="bg-[#f4d03f] dark:bg-yellow-600 px-4 py-2 rounded hover:bg-black dark:hover:bg-gray-900 hover:text-white transition-colors">
            {jlptLevel}
          </button>
          <p className="text-gray-500 dark:text-gray-400">Strokes: {strokes}</p>
        </div>

        <h3 className="text-2xl font-semibold mt-2 text-gray-900 dark:text-gray-100 hover:text-[#f4d03f] dark:hover:text-yellow-600 cursor-pointer transition-colors">
          {meaning}
        </h3>

        <div className="text-gray-500 dark:text-gray-400 py-2 leading-relaxed space-y-1">
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              On&apos;yomi:
            </span>{" "}
            {onyomi}
          </p>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Kun&apos;yomi:
            </span>{" "}
            {kunyomi}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <div className="w-[10%] aspect-square bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm text-gray-700 dark:text-gray-300">
            KJ
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            Kanji Journey
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};
