export const getNumber = (str) => {
  let num = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "-") {
      num += "-";
      continue;
    }
    if (!isNaN(Number(str[i]))) {
      num += Number(str[i]);
    }
  }

  return num;
};

export const navigatingSlider = (prev, options) => {
  const {
    currentImage,
    setCurrentImage,
    sliderWrapperRef,
    sliderInnerRef,
    images,
    btnNextRef,
    btnPrevRef,
    disabled,
  } = options;

  if (prev) {
    btnNextRef.current.classList.remove(disabled);
    if (currentImage - 4 > 0) {
      console.log(currentImage - 4);
      if (currentImage - 4 == 4) {
        btnPrevRef.current.classList.add(disabled);
      }
      btnNextRef.current.classList.remove(disabled);

      setCurrentImage((prev) => prev - 4);
      const parentWidth = sliderWrapperRef.current.clientWidth;

      const calc = parentWidth;

      const getTranslateValue = sliderInnerRef.current.style.transform
        .split("translateX")
        .pop();

      const getTranslateNumber = +getNumber(getTranslateValue);

      sliderInnerRef.current.style.transform = `translateX(${
        getTranslateNumber + calc
      }px)`;
    } else if (currentImage - 4 === 0) {
      btnPrevRef.current.classList.add(disabled);
    }
    return;
  }

  if (currentImage + 4 <= images.length) {
    if (currentImage + 4 == images.length) {
      btnNextRef.current.classList.add(disabled);
    }

    btnPrevRef.current.classList.remove(disabled);
    setCurrentImage((prev) => prev + 4);
    const parentWidth = sliderWrapperRef.current.clientWidth;

    const calc = parentWidth;

    const getTranslateValue = sliderInnerRef.current.style.transform
      .split("translateX")
      .pop();

    const getTranslateNumber = +getNumber(getTranslateValue);

    sliderInnerRef.current.style.transform = `translateX(${
      getTranslateNumber - calc
    }px)`;
  } else {
    btnNextRef.current.classList.add(disabled);
  }
};

export const upperCaseFirstWord = (word) => {
  if (typeof word !== "string") return;

  return word[0].toUpperCase() + word.slice(1);
};

export const validateInputsFields = (fields) => {
  let filled = true;

  for (let field of fields) {
    if (Array.isArray(field) && field.length === 0) {
      filled = false;
      break;
    }

    if (typeof field === "object" && Object.values(field).length === 0) {
      filled = false;
      break;
    }

    if (!field) {
      filled = false;
      break;
    }
  }

  return filled;
};
