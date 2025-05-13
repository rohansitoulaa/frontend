import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import ColorThief from "colorthief";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaStop, FaFileAudio } from "react-icons/fa";
import { useThemeStore } from "../../../stores/useThemeStore";
import { read } from "fs";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface Props {
  article: {
    title: string;
    image: string;
    content: string; // PDF URL
  };
  onClose: () => void;
}

const ArticlePage: React.FC<Props> = ({ article, onClose }) => {
  const theme = useThemeStore((state) => state.theme);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [bgColor, setBgColor] = useState<string>("#000");
  const [pageTexts, setPageTexts] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [readingMode, setReadingMode] = useState(false);

  const toggleReadingMode = () => {
    setReadingMode((prev) => !prev);
  };

  useEffect(() => {
    const renderPDF = async () => {
      const loadingTask = pdfjsLib.getDocument(article.content);
      const pdf = await loadingTask.promise;

      if (containerRef.current) containerRef.current.innerHTML = "";

      const containerWidth = containerRef.current?.clientWidth || 800;
      const extractedTexts: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const scale = containerWidth / page.getViewport({ scale: 1 }).width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");

        await page.render({ canvasContext: context!, viewport }).promise;
        const canvasWrapper = document.createElement("div");
        canvasWrapper.style.display = "block";
        canvasWrapper.style.margin = "0 auto 24px";
        canvasWrapper.style.padding = "16px";
        canvasWrapper.appendChild(canvas);
        canvas.style.borderRadius = "16px";

        containerRef.current?.appendChild(canvasWrapper);

        containerRef.current?.appendChild(canvas);
        if (readingMode == true) {
          canvas.style.filter = "brightness(0.7) sepia(0.6)";
        }

        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => (item as any).str)
          .join(" ");
        extractedTexts.push(pageText);
      }

      setPageTexts(extractedTexts);
    };

    renderPDF();
  }, [article.content, readingMode]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const colorThief = new ColorThief();

    const handleLoad = () => {
      try {
        const color = colorThief.getColor(img);
        setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      } catch (err) {
        console.warn("Could not extract color:", err);
      }
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
      return () => img.removeEventListener("load", handleLoad);
    }
  }, [article.image]);

  const speakPages = (texts: string[]) => {
    window.speechSynthesis.cancel();
    const fullText = texts.join(" ");
    const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
    let sentenceIndex = 0;

    const speakNext = () => {
      if (sentenceIndex >= sentences.length) {
        stopSpeech();
        return;
      }

      const sentence = sentences[sentenceIndex].trim();
      const wordList = sentence.split(/\s+/).filter(Boolean);
      setWords(wordList);
      setCurrentWordIndex(0);

      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = "en-US";
      utterance.rate = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onboundary = (event) => {
        if (event.charIndex !== undefined) {
          const spokenPart = sentence.substring(0, event.charIndex);
          const wordIndex = spokenPart
            .trim()
            .split(/\s+/)
            .filter(Boolean).length;
          setCurrentWordIndex(wordIndex);
        }
      };

      utterance.onend = () => {
        sentenceIndex++;
        speakNext();
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  const pauseSpeech = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resumeSpeech = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentWordIndex(null);
    setWords([]);
  };

  const handleMainButton = () => {
    if (!isSpeaking) {
      speakPages(pageTexts);
    } else {
      stopSpeech();
    }
  };

  const handlePauseResume = () => {
    if (isPaused) resumeSpeech();
    else pauseSpeech();
  };
  const handleArticleClose = () => {
    stopSpeech();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={` w-[90%] max-w-5xl h-[90vh] overflow-y-scroll scrollbar-hide rounded-xl p-6 relative ${
          readingMode ? "bg-[#dad2b2] text-[#4d4a4a]" : "bg-[#ffff]"
        }`}
      >
        <div
          className="flex justify-end items-center "
          onClick={toggleReadingMode}
        >
          <img
            className="w-10 h-10 cursor-pointer "
            src={`images/${readingMode ? "reading_mode_dark" : "reading_mode_light"}.png`}
            alt="Toggle Reading Mode"
          />
        </div>
        {/* Close */}
        <motion.button
          onClick={handleArticleClose}
          className="fixed top-6 right-8 z-50 text-gray-600"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-5xl font-bold text-[#f2f2f2]">×</span>
        </motion.button>

        <h1 className="text-3xl text-center font-extrabold mb-6">
          {article.title}
        </h1>

        {/* Image */}
        <div
          className={`flex justify-center mb-8 p-3 rounded ${readingMode ? "bg-[#dad2b2] text-[#4d4a4a]" : "bg-[#ffff]"}`}
        >
          <img
            src={article.image}
            alt="Cover"
            ref={imgRef}
            crossOrigin="anonymous"
            className="max-h-64 rounded shadow-lg object-contain"
          />
        </div>

        {/* Buttons */}
        <div className="text-center mb-6 flex flex-col items-center gap-3">
          {/* Speak/Stop Button */}
          <motion.button
            onClick={handleMainButton}
            className={`flex items-center gap-2 px-6 py-3 font-semibold rounded shadow transition ${
              !isSpeaking
                ? "border-2 border-black text-black"
                : "bg-black text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            animate={
              isSpeaking
                ? { opacity: [0.6, 1, 0.6] } // pulse effect
                : { opacity: 1 }
            }
            transition={
              isSpeaking
                ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          >
            {!isSpeaking ? <FaFileAudio /> : <FaStop />}
            {!isSpeaking ? "Start Article" : "Stop Article"}
          </motion.button>

          {/* Pause/Resume Button */}
          {isSpeaking && (
            <motion.button
              onClick={handlePauseResume}
              className={`flex items-center gap-2 px-6 py-2 rounded font-semibold text-black transition ${
                isPaused ? "" : ""
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {isPaused ? <FaPlay /> : <FaPause />}
            </motion.button>
          )}
        </div>

        {/* Highlighted Text */}
        <div className="text-lg px-6 py-4 bg-transparent rounded mb-6 leading-relaxed">
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              className={
                idx === currentWordIndex ? "text-black bg-[#fde68a]" : ""
              }
            >
              {word + " "}
            </motion.span>
          ))}
        </div>

        {/* Rendered PDF */}
        <div ref={containerRef} className="scrollbar-hide rounded" />
      </div>
    </div>
  );
};

export default ArticlePage;
