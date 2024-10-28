import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Carousel = ({ contents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const startPos = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const isDragging = useRef(false);

  const getPositionX = (event) => {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  };

  const handleTouchStart = (event) => {
    startPos.current = getPositionX(event);
    isDragging.current = true;
    trackRef.current.style.transition = "none";
  };

  const handleTouchMove = (event) => {
    if (isDragging.current) {
      const currentPosition = getPositionX(event);
      currentTranslate.current =
        prevTranslate.current + currentPosition - startPos.current;
      trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    const movedBy = currentTranslate.current - prevTranslate.current;
    if (movedBy < -50 && currentIndex < contents.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    trackRef.current.style.transition = "transform 0.3s ease-out";
    prevTranslate.current = currentIndex * -trackRef.current.clientWidth;
    trackRef.current.style.transform = `translateX(${prevTranslate.current}px)`;
  };

  const handleMouseDown = (event) => {
    handleTouchStart(event);
    window.addEventListener("mousemove", handleTouchMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    handleTouchEnd();
    window.removeEventListener("mousemove", handleTouchMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const track = trackRef.current;
    prevTranslate.current = currentIndex * -track.clientWidth;
    track.style.transform = `translateX(${prevTranslate.current}px)`;

    if (contents.length > 1) {
      track.addEventListener("mousedown", handleMouseDown);
      track.addEventListener("touchstart", handleTouchStart);
      track.addEventListener("touchmove", handleTouchMove);
      track.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      track.removeEventListener("mousedown", handleMouseDown);
      track.removeEventListener("touchstart", handleTouchStart);
      track.removeEventListener("touchmove", handleTouchMove);
      track.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousemove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [currentIndex, contents.length]);

  return (
    <CarouselContainer>
      <TrackContainer>
        <Track ref={trackRef}>
          {contents.map((content, index) => (
            <Slide key={index}>
              {content.type === "image" ? (
                <img src={content.src} alt={content.alt} />
              ) : (
                <video
                  src={content.src}
                  type="video/mp4"
                  controls
                  muted
                  autoPlay
                />
              )}
            </Slide>
          ))}
        </Track>
      </TrackContainer>
      {contents.length > 1 && (
        <Indicator>
          {currentIndex + 1}/{contents.length}
        </Indicator>
      )}
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
`;

const TrackContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Track = styled.div`
  display: flex;
  transition: transform 0.3s ease-out;
  width: 100%;
  height: 100%;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Indicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.875rem;
`;

export default Carousel;
