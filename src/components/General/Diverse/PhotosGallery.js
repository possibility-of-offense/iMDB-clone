import { Link } from "react-router-dom";
import HeaderImageInfo from "./HeaderImageInfo";
import classes from "./styles/PhotosGallery.module.css";

const PhotosGallery = ({ id, data, endpoint = "movies" }) => {
  if (data.length > 0) {
    const { name, year } = data[0];

    return (
      <section className={classes["gallery__wrapper"]}>
        <div className={classes["gallery__wrapper--inner"]}>
          <Link to="add-photos">Add more photos</Link>
          <div className={classes["gallery__wrapper-inner-grid"]}>
            <HeaderImageInfo
              img="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
              title={name}
              year={year}
              link={`/${endpoint}/${id}`}
              heading="Photo Gallery"
            />
            <div className={classes["gallery__wrapper--body"]}>
              {data.map((el) => (
                <div key={el}>
                  <figure>
                    {/* <img title="img" alt="img" src={el.image} /> */}
                    <img title="img" alt="img" src={el} />
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default PhotosGallery;
