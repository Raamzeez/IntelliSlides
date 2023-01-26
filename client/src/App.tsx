import React, { FC, useState } from "react";
import "./App.css";
import TextInput from "./components/TextInput";
import Checkmark from "./components/Checkmark";
import Button from "./components/Button";
import NumberInput from "./components/NumberInput";
import api from "./api";
import { Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Success from "./components/Success";
import Loading from "./components/Loading";
import iError from "./models/error";
import Error from "./components/Error";

interface iState {
  topic: string;
  title: string;
  subtitle: string;
  slideCount: number;
  images: boolean;
  sources: boolean;
  submit: boolean;
  loading: boolean;
  error: iError | null;
}

const App: FC = () => {
  const [state, setState] = useState<iState>({
    topic: "",
    title: "",
    subtitle: "",
    slideCount: 1,
    images: false,
    sources: false,
    submit: false,
    loading: false,
    error: null,
  });

  const onSubmitHandler = async () => {
    setState({ ...state, submit: true, loading: true });
    const response = await api.post("/createPresentation", state);
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
    toast.error("Presentation generation was cancelled!", {
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
      <h2 style={{ position: "absolute", top: 20 }}>GPT3 Presentations</h2>
      {!state.submit && (
        <>
          <div style={{ marginBottom: 25 }}>
            <TextInput
              label="Topic"
              value={state.topic}
              onChangeHandler={(e) =>
                setState({ ...state, topic: e.target.value })
              }
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
              onChangeHandler={(e) =>
                setState({ ...state, slideCount: parseInt(e.target.value) })
              }
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
            />
          </div>
        </>
      )}
      {state.submit && state.loading && (
        <Loading onClickHandler={onCancelHandler} />
      )}
      {state.submit && !state.loading && !state.error && (
        <Success
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
