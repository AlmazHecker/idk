import React, { FC, useRef, useState } from "react";
import { Card, CardContent } from "@ui/card";
import { KVGAnimator } from "@/src/features/Kanji/KanjiList/lib/animate-kanji";
import { MoreVertical } from "lucide-react";
import { Button } from "@/src/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { useToggle } from "@/src/shared/hooks/useToggle";
import UpdateKanjiDialog from "../../UpdateKanji/ui/UpdateKanjiDialog";
import DeleteKanjiDialog from "../../DeleteKanji/ui/DeleteKanjiDialog";
import { Kanji } from "@prisma/client";

type KanjiCardProps = { kanji: Kanji };

export const KanjiCard: FC<KanjiCardProps> = ({ kanji }) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const cachedSvg = useRef("");
  const [isHovered, setIsHovered] = useState(false);

  const updateDialog = useToggle(false);
  const deleteDialog = useToggle(false);

  const getKanjiCode = async (kanjiChar: string) => {
    try {
      if (cachedSvg.current) {
        return cachedSvg.current;
      }

      const code = kanjiChar.charCodeAt(0).toString(16).padStart(5, "0");
      const res = await fetch(
        `https://kanjivg.tagaini.net/kanjivg/kanji/${code}.svg`
      );
      const data = await res.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "image/svg+xml");
      xmlDoc.documentElement.id = kanjiChar;

      cachedSvg.current = new XMLSerializer().serializeToString(xmlDoc);
      return cachedSvg.current;
    } catch (e) {
      console.log("Something went wrong: ", e);
    }
  };

  const handleMouseEnter = async () => {
    setIsHovered(true);
    const svgData = await getKanjiCode(kanji.kanji);

    if (!svgContainerRef.current || !svgData) return;
    svgContainerRef.current.innerHTML = svgData;

    const svgElement = document.getElementById(kanji.kanji);
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
    <>
      <Card className="w-[370px] p-5 border dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 shadow-[10px_10px_0px_-3px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_-3px_rgba(255,255,255,0.1)] transition-colors">
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
              {kanji.kanji}
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
              {kanji.jlptLevel}
            </button>
            <p className="text-gray-500 dark:text-gray-400">
              Strokes: {kanji.strokes}
            </p>
          </div>

          <h3 className="text-2xl font-semibold mt-2 text-gray-900 dark:text-gray-100 hover:text-[#f4d03f] dark:hover:text-yellow-600 cursor-pointer transition-colors">
            {kanji.meaning}
          </h3>

          <div className="text-gray-500 dark:text-gray-400 py-2 leading-relaxed space-y-1">
            <p>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                On&apos;yomi:
              </span>{" "}
              {kanji.onyomi}
            </p>
            <p>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Kun&apos;yomi:
              </span>{" "}
              {kanji.kunyomi}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div className="flex gap-3 items-center">
              <div className="w-[35px] aspect-square bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm text-gray-700 dark:text-gray-300">
                KJ
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Kanji Journey
              </h4>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Menu"
                >
                  <MoreVertical
                    size={18}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={updateDialog.toggle}>
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={deleteDialog.toggle}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
      <UpdateKanjiDialog
        open={updateDialog.isOpen}
        onOpenChange={updateDialog.toggle}
        value={kanji}
      />
      <DeleteKanjiDialog
        open={deleteDialog.isOpen}
        onOpenChange={deleteDialog.toggle}
        value={kanji}
      />
    </>
  );
};
