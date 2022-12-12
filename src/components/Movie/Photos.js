import { useEffect, useRef, useState } from "react";
import { navigatingSlider } from "../../helpers/helpers";
import SectionTitle from "./SectionTitle";

import classes from "./styles/Photos.module.css";

const Photos = ({ photos, layoutClasses }) => {
  let [currentImage, setCurrentImage] = useState(4);

  const sliderWrapperRef = useRef();
  const sliderInnerRef = useRef();
  const btnPrevRef = useRef();
  const btnNextRef = useRef();

  const images = photos;

  useEffect(() => {
    if (btnPrevRef.current && btnNextRef.current) {
      btnPrevRef.current.classList.add(classes["disabled"]);
      if (images?.length < 4) {
        btnNextRef.current.classList.add(classes["disabled"]);
      }
    }
  }, []);

  const handleNextClick = () => {
    navigatingSlider(false, {
      currentImage,
      setCurrentImage,
      sliderWrapperRef,
      sliderInnerRef,
      images,
      btnPrevRef,
      btnNextRef,
      disabled: classes.disabled,
    });
  };

  const handlePrevClick = () => {
    navigatingSlider(true, {
      currentImage,
      setCurrentImage,
      sliderWrapperRef,
      sliderInnerRef,
      images,
      btnPrevRef,
      btnNextRef,
      disabled: classes.disabled,
    });
  };

  const handleShowButton = (e) => {
    if (e.clientX < sliderWrapperRef.current.clientWidth / 2) {
      btnPrevRef.current.classList.add(classes["show-btn"]);
      btnPrevRef.current.classList.remove(classes["hide-opacity"]);
      btnNextRef.current.classList.remove(classes["show-btn"]);
      btnNextRef.current.classList.add(classes["hide-opacity"]);
    }
    if (e.clientX > sliderWrapperRef.current.clientWidth / 2) {
      btnNextRef.current.classList.add(classes["show-btn"]);
      btnNextRef.current.classList.remove(classes["hide-opacity"]);
      btnPrevRef.current.classList.remove(classes["show-btn"]);
      btnPrevRef.current.classList.add(classes["hide-opacity"]);
    }
  };
  const handleHideButton = (e) => {
    btnPrevRef.current.classList.remove(classes["show-btn"]);
    btnNextRef.current.classList.remove(classes["show-btn"]);
  };

  return (
    <section>
      <SectionTitle
        count={images && images.length ? images.length : 0}
        moreInfo={true}
        layoutClasses={layoutClasses}
      >
        Photos
      </SectionTitle>
      {images?.length > 0 ? (
        <section
          className={classes["photos-slider-wrapper"]}
          ref={sliderWrapperRef}
          onMouseMove={handleShowButton}
          onMouseLeave={handleHideButton}
        >
          {images.length > 4 && (
            <div className={classes["buttons"]}>
              <button ref={btnPrevRef} onClick={handlePrevClick}>
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon"
                  id="iconContext-chevron-left-inline"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                >
                  <path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path>
                </svg>
              </button>
              <button ref={btnNextRef} onClick={handleNextClick}>
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ipc-icon ipc-icon--chevron-right-inline ipc-icon--inline ipc-pager-icon"
                  id="iconContext-chevron-right-inline"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                >
                  <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
                </svg>
              </button>
            </div>
          )}
          <div className={classes["photos-slider-inner"]} ref={sliderInnerRef}>
            {images?.length > 0 &&
              images.map((img, i) => (
                <div key={i}>
                  <img src={img} />
                </div>
              ))}
          </div>
        </section>
      ) : (
        <h3 className="pbot2-rem">No photos yet!</h3>
      )}
    </section>
  );
};

export default Photos;
