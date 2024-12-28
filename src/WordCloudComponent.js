import React, { forwardRef, useCallback, useMemo, useEffect, useState } from "react";
import WordCloud from "react-d3-cloud";

const MAX_FONT_SIZE = 200;
const MIN_FONT_SIZE = 30;
const MAX_FONT_WEIGHT = 700;
const MIN_FONT_WEIGHT = 400;
const MAX_WORDS = 150;

const WordCloudComponent = forwardRef(({ words }, ref) => {
  const [containerSize, setContainerSize] = useState({ width: 900, height: 400 });

  // Limit the words to the top MAX_WORDS by value
  const sortedWords = useMemo(
    () => words.sort((a, b) => b.value - a.value).slice(0, MAX_WORDS),
    [words]
  );

  // Determine min and max occurrences for normalization
  const [minOccurrences, maxOccurrences] = useMemo(() => {
    const min = Math.min(...sortedWords.map((w) => w.value));
    const max = Math.max(...sortedWords.map((w) => w.value));
    return [min, max];
  }, [sortedWords]);

  // Calculate font size based on occurrences
  const calculateFontSize = useCallback(
    (wordOccurrences) => {
      const normalizedValue =
        (wordOccurrences - minOccurrences) / (maxOccurrences - minOccurrences);
      const fontSize =
        MIN_FONT_SIZE + normalizedValue * (MAX_FONT_SIZE - MIN_FONT_SIZE);
      return Math.round(fontSize);
    },
    [maxOccurrences, minOccurrences]
  );

  // Calculate font weight based on occurrences
  const calculateFontWeight = useCallback(
    (wordOccurrences) => {
      const normalizedValue =
        (wordOccurrences - minOccurrences) / (maxOccurrences - minOccurrences);
      const fontWeight =
        MIN_FONT_WEIGHT +
        normalizedValue * (MAX_FONT_WEIGHT - MIN_FONT_WEIGHT);
      return Math.round(fontWeight);
    },
    [maxOccurrences, minOccurrences]
  );

  // Update container size when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (ref && ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <WordCloud
        width={containerSize.width}
        height={containerSize.height}
        font={"Poppins"}
        fontWeight={(word) => calculateFontWeight(word.value)}
        data={sortedWords}
        rotate={0} // No rotation for the words
        padding={1} // Padding between words
        fontSize={(word) => calculateFontSize(word.value)}
        random={() => 0.5} // Keeps layout stable
      />
    </div>
  );
});

WordCloudComponent.displayName = "WordCloudComponent";

export default WordCloudComponent;
