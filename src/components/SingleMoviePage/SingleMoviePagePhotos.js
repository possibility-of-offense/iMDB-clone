import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { navigatingSlider } from "../../helpers/helpers";
import SectionTitle from "../General/SinglePage/SectionTitle";

import { FaLink } from "react-icons/fa";

import classes from "./styles/SingleMoviePagePhotos.module.css";

const SingleMoviePhotos = ({ photos, layoutClasses, link, authorId }) => {
  const { id } = useParams();

  const images = photos;

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
          <section className={classes["photos-slider-wrapper"]}>
            <p>Selected photos</p>
            <div className={classes["photos-slider-inner"]}>
              {images?.length > 0 &&
                images.slice(0, 10).map((img, i) => (
                  <div key={i}>
                    <Link to={`/movies/${id}/image/${img.id}`}>
                      <img
                        src={img.url}
                        title={img.movieName}
                        alt={img.movieName}
                      />
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
