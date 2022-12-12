import { useParams } from "react-router-dom";
import HeaderImageInfo from "../components/General/HeaderImageInfo";
import classes from "./styles/Gallery.module.css";

const Gallery = () => {
  const { id } = useParams();

  return (
    <section className={classes["gallery__wrapper"]}>
      <div className={classes["gallery__wrapper--inner"]}>
        <div className={classes["gallery__wrapper-inner-grid"]}>
          <HeaderImageInfo
            img="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
            title="Seven Years in Tibet"
            year="1997"
            link={`/movies/${id}`}
            heading="Photo Gallery"
          />
          <div className={classes["gallery__wrapper--body"]}>
            <div>
              <figure>
                <img
                  title="img"
                  alt="img"
                  src="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
                />
              </figure>
            </div>
            <div>
              <figure>
                <img
                  title="img"
                  alt="img"
                  src="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
                />
              </figure>
            </div>
            <div>
              <figure>
                <img
                  title="img"
                  alt="img"
                  src="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
                />
              </figure>
            </div>
            <div>
              <figure>
                <img
                  title="img"
                  alt="img"
                  src="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
                />
              </figure>
            </div>
            <div>
              <figure>
                <img
                  title="img"
                  alt="img"
                  src="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
                />
              </figure>
            </div>
            <div>
              <figure>
                <img
                  title="img"
                  alt="img"
                  src="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
                />
              </figure>
            </div>
            <div>
              <figure>
                <img
                  title="img"
                  alt="img"
                  src="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
                />
              </figure>
            </div>
            <div>
              <figure>
                <img
                  title="img"
                  alt="img"
                  src="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
                />
              </figure>
            </div>
            <div>
              <figure>
                <img
                  title="img"
                  alt="img"
                  src="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
                />
              </figure>
            </div>
            <div>
              <figure>
                <img
                  title="img"
                  alt="img"
                  src="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
                />
              </figure>
            </div>
            <div>
              <figure>
                <img
                  title="img"
                  alt="img"
                  src="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
                />
              </figure>
            </div>
            <div>
              <figure>
                <img
                  title="img"
                  alt="img"
                  src="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
