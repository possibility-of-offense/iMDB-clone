import { Link } from "react-router-dom";
import HeaderImageInfo from "./HeaderImageInfo";
import attributes from "./styles/PhotosGallery.module.css";

const PhotosGallery = ({ id, data, endpoint = "movies" }) => {
  if (data.length > 0) {
    const { movieName: name, movieYear: year, movieMainImage } = data[0];

    return (
      <section className={attributes["gallery__wrapper"]}>
        <div className={attributes["gallery__wrapper--inner"]}>
          <Link className={attributes["add-more-photos"]} to="add-photos">
            Add more photos
          </Link>
          <div className={attributes["gallery__wrapper-inner-grid"]}>
            <HeaderImageInfo
              img={movieMainImage}
              title={name}
              year={year}
              link={`/${endpoint}/${id}`}
              heading="Photo Gallery"
            />
            <div className={attributes["gallery__wrapper--body"]}>
              {data.map((el) => (
                <div key={el.id}>
                  <figure>
                    <Link to={`/movies/${id}/image/${el.id}`}>
                      <img title="img" alt="img" src={el.url} />
                    </Link>
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
