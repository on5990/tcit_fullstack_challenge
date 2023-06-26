import { useEffect, useState } from "react";

const hiddenLength: number = 250;

function PostDescription(props: { description: string }) {
  const { description } = props;
  const [visiblePart, setVisiblePart] = useState("");
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    if (!hidden) {
      setVisiblePart(description);
      return;
    }
    const visible =
      description.length > hiddenLength
        ? description.substring(0, hiddenLength)
        : description;
    setVisiblePart(visible);
  }, [hidden]);
  function hideDescription() {
    setHidden(true);
  }
  function showDescription() {
    setHidden(false);
  }
  return (
    <p>
      {visiblePart + " "}
      {description.length > visiblePart.length && (
        <span className="post-description-visibility" onClick={showDescription}>
          ...Ver más
        </span>
      )}
      {description === visiblePart && description.length > hiddenLength && (
        <span className="post-description-visibility" onClick={hideDescription}>
          Ver menos
        </span>
      )}
    </p>
  );
}

export default PostDescription;
