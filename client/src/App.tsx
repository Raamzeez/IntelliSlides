import React, { FC, useState } from "react";
import "./style/App.css";
import TextInput from "./components/TextInput";
// import Checkmark from "./components/Checkmark";
import Button from "./components/Button";
import NumberInput from "./components/NumberInput";
import api from "./api";
import { Col, Container, Pagination, Row } from "react-bootstrap";
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
import Model from "./types/model";
import AutoButton from "./components/AutoButton";
import Category from "./types/category";
import categories from "./data/categories";
import LoadingType from "./types/loading";
// import SettingsIcon from "./components/SettingsIcon";
// import SettingsModal from "./components/SettingsModal";

interface iState {
  showAlert: boolean;
  showVersion: boolean;
  showTip: boolean;
  settings: boolean;
  topic: string;
  category: Category;
  auto: boolean;
  title: string;
  presentationId: string;
  subtitle: string;
  slideCount: number;
  images: boolean;
  sources: boolean;
  model: Model;
  submit: boolean;
  // loading: boolean;
  loading: LoadingType | null;
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
    category: "Event",
    auto: false,
    title: "",
    presentationId: "",
    subtitle: "",
    slideCount: 5,
    images: false,
    sources: false,
    model: "text-davinci-003",
    submit: false,
    loading: null,
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
    setState({ ...state, submit: true, loading: "ValidateParameters" });
    console.log("/validateParameters");
    const parametersResponse = await api.post("/validateParameters", state, {
      signal: controller.signal,
    });
    console.log(parametersResponse.data);
    if (parametersResponse.status !== 200) {
      return setState({
        ...state,
        submit: true,
        loading: null,
        error: {
          message: parametersResponse.data,
          status: parametersResponse.status,
        },
      });
    }
    setState({ ...state, loading: "SlidesData" });
    const slidesDataResponse = await api.post("/slidesData", state, {
      signal: controller.signal,
    });
    console.log(slidesDataResponse.data);
    if (slidesDataResponse.status !== 200) {
      return setState({
        ...state,
        submit: true,
        loading: null,
        error: {
          message: "Couldn't Gather Information",
          status: slidesDataResponse.status,
        },
      });
    }
    setState({ ...state, loading: "CreatePresentation" });
    const data = { slidesInfo: slidesDataResponse.data, ...state };
    console.log(data);
    const presentationResponse = await api.post("/createPresentation", data);
    console.log(presentationResponse.data);
    if (presentationResponse.status !== 200) {
      return setState({
        ...state,
        submit: true,
        loading: null,
        error: {
          message: "Couldn't Create Presentation",
          status: presentationResponse.status,
        },
      });
    }
    console.log(presentationResponse);
    return setState({
      ...state,
      submit: true,
      loading: null,
      presentationId: presentationResponse.data.data.presentationId,
      error: null,
    });
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
            <Row>
              <Col>
                <p style={{ fontSize: 18, marginTop: 9, marginRight: -50 }}>
                  Category:
                </p>
              </Col>
              <Col>
                <Pagination
                  style={{
                    position: "relative",
                    left: 34,
                    top: 6.5,
                  }}
                >
                  {categories.map((category, index) => {
                    return (
                      <Pagination.Item disabled={state.auto} key={index}>
                        {category}
                      </Pagination.Item>
                    );
                  })}
                </Pagination>
              </Col>
              <Col>
                <AutoButton
                  onClickHandler={() =>
                    setState({ ...state, category: "Event", auto: !state.auto })
                  }
                />
              </Col>
            </Row>
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
              style={{ marginTop: 30 }}
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
          presentationId={state.presentationId}
          onClickHandler={() =>
            setState({ ...state, loading: null, submit: false })
          }
        />
      )}
      {state.submit && !state.loading && state.error && (
        <Error
          onClickHandler={() =>
            setState({ ...state, loading: null, submit: false })
          }
        />
      )}
    </Container>
  );
};

export default App;
