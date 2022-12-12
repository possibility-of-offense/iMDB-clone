import { useNavigate } from "react-router-dom";
import classes from "./styles/HeroBanner.module.css";

const HeroBanner = ({ images, photosLink }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (photosLink) {
      navigate(photosLink);
    }
  };

  if (images && Array.isArray(images) && images.length > 0) {
    return (
      <section className={classes["hero-banner"]}>
        <div className={classes["hero-banner__media"]}>
          <div className={classes["hero-banner__image"]}>
            <img src={images[0]} />
          </div>
          <div className={classes["hero-banner__video"]}>
            <img src={images[1]} />
          </div>
        </div>
        <div className={classes["hero-banner__actions"]}>
          <div className={classes["hero-banner__actions-videos"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="ipc-icon ipc-icon--video-library ipc-icon--inline sc-a93004d6-0 gVqJqU"
              id="iconContext-video-library"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
            >
              <path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"></path>
            </svg>
            <h4>2 Videos</h4>
          </div>
          <div
            className={classes["hero-banner__actions-images"]}
            onClick={handleNavigate}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="ipc-icon ipc-icon--collections ipc-icon--inline sc-a93004d6-0 gVqJqU"
              id="iconContext-collections"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-10.6-3.47l1.63 2.18 2.58-3.22a.5.5 0 0 1 .78 0l2.96 3.7c.26.33.03.81-.39.81H9a.5.5 0 0 1-.4-.8l2-2.67c.2-.26.6-.26.8 0zM2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path>
            </svg>
            <h4>99+ Photos</h4>
          </div>
        </div>
      </section>
    );
  }
};

export default HeroBanner;
