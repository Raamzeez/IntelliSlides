import React, { FC, useState } from "react";
import "./style/App.css";
import TextInput from "./components/TextInput";
// import Checkmark from "./components/Checkmark";
import Button from "./components/Button";
import NumberInput from "./components/NumberInput";
import api from "./api";
import { Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Success from "./components/Success";
import Loading from "./components/Loading";
import iError from "./models/error";
import Error from "./components/Error";
import Warning from "./components/Warning";
import Limitations from "./components/Limitations";
import AdvancedSettings from "./components/AdvancedSettings";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./style//bootstrap.min.luxen.css";
// import "./style/bootstrap.min.cerulean.css";
// import "./style/bootstrap.min.cosmo.css";
import "./style/bootstrap.min.quartz.css";
// import "./style/bootstrap.min.litera.css";
// import "./style/bootstrap.min.cyborg.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Alert from "./components/Alert";
import VersionModal from "./components/VersionModal";
import InfoModal from "./components/InfoModal";
// import SettingsIcon from "./components/SettingsIcon";
// import SettingsModal from "./components/SettingsModal";

interface iState {
  showAlert: boolean;
  showVersion: boolean;
  showTip: boolean;
  settings: boolean;
  topic: string;
  title: string;
  subtitle: string;
  slideCount: number;
  images: boolean;
  sources: boolean;
  model:
    | "text-davinci-003"
    | "text-curie-001"
    | "text-babbage-001"
    | "text-ada-001";
  submit: boolean;
  loading: boolean;
  warning: string;
  error: iError | null;
}

const controller = new AbortController();

const App: FC = () => {
  const [state, setState] = useState<iState>({
    showAlert: true,
    showVersion: false,
    showTip: false,
    settings: false,
    topic: "",
    title: "",
    subtitle: "",
    slideCount: 5,
    images: false,
    sources: false,
    model: "text-davinci-003",
    submit: false,
    loading: false,
    warning: "",
    error: null,
  });

  const errorToast = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const onSubmitHandler = async () => {
    if (disable()) {
      return errorToast("Please fill out all required fields!");
    }
    if (!state.title || !state.subtitle) {
      let message = "";
      if (!state.subtitle && !state.title) {
        message = "Your presentation will have no title and no subtitle";
      } else if (!state.title) {
        message = "Your presentation will have no title";
      } else {
        message = "Your presentation will have no subtitle";
      }
      return setState({ ...state, warning: message });
    }
    setState({ ...state, submit: true, loading: true });
    const response = await api.post("/createPresentation", state, {
      signal: controller.signal,
    });
    console.log(response.data);
    setState({
      ...state,
      submit: true,
      loading: false,
      error:
        response.status !== 200
          ? {
              message: "Couldn't Create Presentation",
              status: response.status,
            }
          : null,
    });
    console.log(response);
  };

  const onCancelHandler = () => {
    setState({ ...state, submit: false });
    errorToast("Presentation generation was cancelled!");
  };

  const disable = () => {
    if (state.topic.length >= 2 && state.slideCount >= 1) {
      return false;
    }
    return true;
  };

  // console.log(state);

  return (
    <Container
      fluid
      className="App App-header"
      style={{ margin: 0, padding: 0 }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ fontSize: 13 }}
      />
      {state.warning && (
        <Warning
          onClickHandler={onSubmitHandler}
          onCloseHandler={() => setState({ ...state, warning: "" })}
          message={state.warning}
        />
      )}
      {state.showAlert && (
        <Alert
          onCloseHandler={() => setState({ ...state, showAlert: false })}
        />
      )}
      <h2
        style={{
          color: "white",
          position: "absolute",
          top: state.showAlert ? "9vh" : 20,
          fontWeight: 500,
          transition: "all 0.5s ease",
        }}
      >
        {/* GPT3 Presentations */}
        IntelliSlides
      </h2>
      {/* <SettingsIcon
        showingAlert={state.showAlert}
        onClickHandler={() => setState({ ...state, settings: true })}
      />
      {state.settings && (
        <SettingsModal
          onCloseHandler={() => setState({ ...state, settings: false })}
        />
      )} */}
      {state.showVersion && (
        <VersionModal
          onCloseHandler={() => setState({ ...state, showVersion: false })}
        />
      )}
      {state.showTip && (
        <InfoModal
          onCloseHandler={() => setState({ ...state, showTip: false })}
        />
      )}
      <Footer
        onClickHandler={() => setState({ ...state, showVersion: true })}
      />
      {!state.submit && (
        <>
          <Limitations />
          <AdvancedSettings onClickHandler={() => null} />
          <div style={{ marginBottom: 25 }}>
            <TextInput
              label="Topic"
              value={state.topic}
              onChangeHandler={(e) =>
                setState({ ...state, topic: e.target.value })
              }
              required={true}
              minLength={2}
              info={true}
              onTipClickHandler={() => setState({ ...state, showTip: true })}
            />
            <TextInput
              label="Title"
              value={state.title}
              onChangeHandler={(e) =>
                setState({ ...state, title: e.target.value })
              }
            />
            <TextInput
              label="Subtitle"
              value={state.subtitle}
              onChangeHandler={(e) =>
                setState({ ...state, subtitle: e.target.value })
              }
            />
          </div>
          <div style={{ marginBottom: 25 }}>
            <NumberInput
              label="Slide Count: "
              value={state.slideCount}
              onChangeHandler={(e) =>
                setState({ ...state, slideCount: parseInt(e.target.value) })
              }
              required={true}
              min={1}
              max={20}
            />
          </div>
          {/* <div>
            <Checkmark
              label="Images"
              value={state.images}
              onChangeHandler={() =>
                setState({ ...state, images: !state.images })
              }
            />
            <Checkmark
              label="Sources"
              value={state.sources}
              onChangeHandler={() =>
                setState({ ...state, sources: !state.sources })
              }
            />
          </div> */}
          <div>
            <Button
              type="success"
              value={"Submit"}
              onClickHandler={onSubmitHandler}
              disabled={disable()}
              style={{ marginTop: "50%" }}
            />
          </div>
        </>
      )}
      {state.submit && state.loading && (
        <Loading
          topic={state.topic}
          title={state.title}
          onClickHandler={onCancelHandler}
        />
      )}
      {state.submit && !state.loading && !state.error && (
        <Success
          title={state.title}
          onClickHandler={() =>
            setState({ ...state, loading: false, submit: false })
          }
        />
      )}
      {state.submit && !state.loading && state.error && (
        <Error
          onClickHandler={() =>
            setState({ ...state, loading: false, submit: false })
          }
        />
      )}
    </Container>
  );
};

export default App;
