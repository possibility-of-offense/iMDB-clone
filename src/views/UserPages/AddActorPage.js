// React Hooks
import { useState } from "react";

// React Router hooks
import { useNavigate } from "react-router-dom";

// Firebase SDK functions
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

// Config references
import { db, auth } from "../../config/config";

// Components
import AddActorInput from "../../components/AddActor/AddActorInput";

// Classes
import attributes from "./styles/AddActorPage.module.css";
import { createPortal } from "react-dom";

// Icons
import closeIcon from "../../components/AddActor/imgs/close.png";

// Error Alert
const ErrorAlert = ({ children, closeAlert }) => {
  return createPortal(
    <div className={attributes["error-alert"]} onClick={closeAlert}>
      <div>
        {children}
        <img
          alt="Close Alert"
          title="Close Alert"
          src={closeIcon}
          onClick={closeAlert}
        />
      </div>
    </div>,
    document.getElementById("modal")
  );
};

const AddActorPage = () => {
  // React Router hooks
  const navigate = useNavigate();

  // State variables
  const [actorName, setActorName] = useState("");
  const [actorNameValid, setActorNameValid] = useState(null);
  const [actorMainImage, setActorMainImage] = useState("");
  const [actorMainImageValid, setActorMainImageValid] = useState(null);
  const [actorVideoPlaceholderImage, setActorVideoPlaceholderImage] =
    useState("");
  const [actorVideoPlaceholderImageValid, setActorVideoPlaceholderImageValid] =
    useState(null);
  const [actorShortBio, setActorShortBio] = useState("");
  const [actorShortBioValid, setActorShortBioValid] = useState(null);

  const [validForm, setValidForm] = useState(null);
  const [actorExists, setActorExists] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [statusRequest, setStatusRequest] = useState(null);

  // Helpers
  const clearStateVariables = (...states) => states.forEach((st) => st(""));
  const checkIfEmptyField = (...inputs) => inputs.some((inp) => inp === "");
  const makeAllValidStatesTrue = () => {
    const states = [
      setActorNameValid,
      setActorMainImageValid,
      setActorVideoPlaceholderImageValid,
      setActorShortBioValid,
    ];
    states.forEach((state) => state(true));
  };

  // Handlers
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  // Add Actor
  const handleAddActor = async (e) => {
    e.preventDefault();

    if (
      checkIfEmptyField(
        actorName,
        actorMainImage,
        actorVideoPlaceholderImage,
        actorShortBio
      )
    ) {
      setValidForm(false);
      setShowAlert(true);

      if (!actorName) setActorNameValid(false);
      if (!actorMainImage) setActorMainImageValid(false);
      if (!actorVideoPlaceholderImage)
        setActorVideoPlaceholderImageValid(false);
      if (!actorShortBio) setActorShortBioValid(false);

      return;
    } else {
      try {
        // Change status request
        setStatusRequest("pending");
        const lowerCaseActorName = actorName.toLowerCase();

        // Check if actor does not exist
        const eventualActorsRef = await getDocs(
          query(
            collection(db, "actors"),
            where("actorName", "==", lowerCaseActorName)
          )
        );

        if (eventualActorsRef.docs.length === 0) {
          // Add actor
          await addDoc(collection(db, "actors"), {
            actorName: lowerCaseActorName,
            actorMainImage,
            actorVideoPlaceholderImage,
            actorShortBio,
            authorId: auth?.currentUser?.uid,
          });
          navigate("/");
        } else {
          setShowAlert(true);
          setActorExists(true);
          clearStateVariables(
            setActorName,
            setActorMainImage,
            setActorVideoPlaceholderImage,
            setActorShortBio
          );
          makeAllValidStatesTrue();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setStatusRequest("finished");
      }
    }
  };

  // JSX component
  return (
    <section className={attributes["add-actor-wrapper"]}>
      {statusRequest === "pending" && (
        <div className={attributes["overlay-request"]}>
          <div className={attributes["lds-roller"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {showAlert && !validForm && (
        <ErrorAlert closeAlert={handleCloseAlert}>
          The input fields are not filled properly!
        </ErrorAlert>
      )}
      {showAlert && actorExists && (
        <ErrorAlert closeAlert={handleCloseAlert}>
          The actor exists already!
        </ErrorAlert>
      )}
      <h1>Add actor</h1>
      <form
        className={attributes["add-action__form"]}
        onSubmit={handleAddActor}
      >
        <AddActorInput
          labelText="Add Actor Name"
          id="add-action__form--actorName"
          value={actorName}
          setValue={setActorName}
          valid={actorNameValid}
          resetValid={makeAllValidStatesTrue}
          actorIsExisting={actorExists}
          resetActorIsExisting={setActorExists}
        />
        <AddActorInput
          labelText="Add Actor Main Image"
          id="add-action__form--mainImage"
          value={actorMainImage}
          setValue={setActorMainImage}
          valid={actorMainImageValid}
          resetValid={makeAllValidStatesTrue}
          actorIsExisting={actorExists}
          resetActorIsExisting={setActorExists}
        />
        <AddActorInput
          labelText="Add Actor Video Placeholder Image"
          id="add-action__form--videoPlaceholderImage"
          value={actorVideoPlaceholderImage}
          setValue={setActorVideoPlaceholderImage}
          valid={actorVideoPlaceholderImageValid}
          resetValid={makeAllValidStatesTrue}
          actorIsExisting={actorExists}
          resetActorIsExisting={setActorExists}
        />
        <AddActorInput
          labelText="Add Actor Short Bio"
          id="add-action__form--shortBio"
          value={actorShortBio}
          setValue={setActorShortBio}
          valid={actorShortBioValid}
          resetValid={makeAllValidStatesTrue}
          actorIsExisting={actorExists}
          resetActorIsExisting={setActorExists}
        />

        <button type="submit">Add actor</button>
      </form>
    </section>
  );
};

export default AddActorPage;
