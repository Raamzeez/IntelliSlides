import React, { FC, useState } from "react";
import "./style/App.css";
import TextInput from "./components/TextInput";
import Checkmark from "./components/Checkmark";
import Button from "./components/Button";
import NumberInput from "./components/NumberInput";
import api from "./api";
import { Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.min.quartz.css";
// import "./bootstrap.min.luxen.css";
// import "./bootstrap.min.cerulean.css";
// import "./bootstrap.min.cosmo.css";
import "react-toastify/dist/ReactToastify.css";
import Success from "./components/Success";
import Loading from "./components/Loading";
import iError from "./models/error";
import Error from "./components/Error";
import Warning from "./components/Warning";
import Limitations from "./components/Limitations";
import AdvancedSettings from "./components/AdvancedSettings";

interface iState {
  topic: string;
  title: string;
  subtitle: string;
  slideCount: number;
  images: boolean;
  sources: boolean;
  submit: boolean;
  loading: boolean;
  warning: string;
  error: iError | null;
}

const controller = new AbortController();

const App: FC = () => {
  const [state, setState] = useState<iState>({
    topic: "",
    title: "",
    subtitle: "",
    slideCount: 5,
    images: false,
    sources: false,
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
      <h2 style={{ color: "white", position: "absolute", top: 20 }}>
        GPT3 Presentations
      </h2>
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
            />
          </div>
          <div>
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
          </div>
          <div>
            <Button
              type="success"
              value={"Submit"}
              onClickHandler={onSubmitHandler}
              disabled={disable()}
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
