import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { navigatingSlider } from "../../helpers/helpers";
import SectionTitle from "../General/SinglePage/SectionTitle";

import { FaLink } from "react-icons/fa";

import classes from "./styles/SingleMoviePagePhotos.module.css";

const SingleMoviePhotos = ({ photos, layoutClasses, link, authorId }) => {
  const { id } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  let [currentImage, setCurrentImage] = useState(4);

  const sliderWrapperRef = useRef();
  const sliderInnerRef = useRef();
  const btnPrevRef = useRef();
  const btnNextRef = useRef();

  const images = photos;
  console.log(images);

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
    if (btnPrevRef.current && btnNextRef.current) {
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
    }
  };
  const handleHideButton = (e) => {
    if (btnPrevRef.current && btnNextRef.current) {
      btnPrevRef.current.classList.remove(classes["show-btn"]);
      btnNextRef.current.classList.remove(classes["show-btn"]);
    }
  };

  return (
    <section>
      <SectionTitle
        count={images && images.length ? images.length : 0}
        moreInfo={true}
        layoutClasses={layoutClasses}
        link={link}
        authorId={authorId}
        editLink="edit-photos"
      >
        All Photos
      </SectionTitle>

      {images?.length > 0 ? (
        <Fragment>
          <section
            className={classes["photos-slider-wrapper"]}
            ref={sliderWrapperRef}
            onMouseMove={handleShowButton}
            onMouseLeave={handleHideButton}
          >
            <p>Selected photos</p>
            {
              // <div className={classes["buttons"]}>
              //   <button ref={btnPrevRef} onClick={handlePrevClick}>
              //     <svg
              //       width="24"
              //       height="24"
              //       xmlns="http://www.w3.org/2000/svg"
              //       className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon"
              //       id="iconContext-chevron-left-inline"
              //       viewBox="0 0 24 24"
              //       fill="currentColor"
              //       role="presentation"
              //     >
              //       <path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path>
              //     </svg>
              //   </button>
              //   <button ref={btnNextRef} onClick={handleNextClick}>
              //     <svg
              //       width="24"
              //       height="24"
              //       xmlns="http://www.w3.org/2000/svg"
              //       className="ipc-icon ipc-icon--chevron-right-inline ipc-icon--inline ipc-pager-icon"
              //       id="iconContext-chevron-right-inline"
              //       viewBox="0 0 24 24"
              //       fill="currentColor"
              //       role="presentation"
              //     >
              //       <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
              //     </svg>
              //   </button>
              // </div>
            }
            <div
              className={classes["photos-slider-inner"]}
              ref={sliderInnerRef}
            >
              {images?.length > 0 &&
                images.slice(0, 10).map((img, i) => (
                  <div key={i}>
                    <Link to={`/movies/${id}/image/${i}`}>
                      <img src={img} />
                      <FaLink color="#333" size="2em" />
                    </Link>
                  </div>
                ))}
            </div>
          </section>
        </Fragment>
      ) : (
        <h3 className="pbot2-rem">No photos yet!</h3>
      )}
    </section>
  );
};

export default SingleMoviePhotos;
