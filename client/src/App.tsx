import React, { FC, useEffect, useState } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
  useGoogleLogin,
  hasGrantedAllScopesGoogle,
  CodeResponse,
} from "@react-oauth/google";
import "./style/App.css";
import TextInput from "./components/TextInput";
// import Checkmark from "./components/Checkmark";
import Button from "./components/Button";
import NumberInput from "./components/NumberInput";
import api from "./api";
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Pagination,
  Row,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
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
import useWindowDimensions from "./util/useWindowDimensions";
import InfoIcon from "./components/InfoIcon";
import Profile from "./components/Profile";
import iUser from "./models/user";
import LogoutButton from "./components/LogoutButton";
import { useCookies } from "react-cookie";
import LoginButton from "./components/LoginButton";
// import SettingsIcon from "./components/SettingsIcon";
// import SettingsModal from "./components/SettingsModal";

interface iState {
  showAlert: boolean;
  showVersion: boolean;
  showTopicTip: boolean;
  showCategoryTip: boolean;
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

const topicTipMessage =
  'This is where you will enter the topic of your presentation. Please be as specific as possible, as this ensures the accuracy of the presentation. For example, the topic "The History of Tesla Motors" is much better than simply writing "Tesla", as the program clearly knows that it needs to discuss the history of the company called "Tesla Motors" instead of something else, such as the life of the individual konwn as Nikola Tesla.';
const categoryTipMessage =
  'Choose an option that best categorizes what you want your topic and presentation to relate to. This will ensure the accuracy of the presentation. For example, if your topic is "The Space Shuttle Columbia Disaster", choosing the category "Place" may make the presentation discuss the location of the incident, where as choosing the category "Event" may make the presentation discuss the events that unfolded. Select "Auto" as a last resort if you are unsure. This will make the program guess the category with no guarantee of accuracy.';

const App: FC = () => {
  // const [cookies, setCookie, removeCookie] = useCookies(["jwt_token"]);

  const fetchToken = () => {
    console.log("JWT Token:", localStorage.getItem("jwt_token"));
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      return null;
    }
    return jwtDecode(token);
  };

  const { height, width } = useWindowDimensions();

  const [user, setUser] = useState<iUser | null>(fetchToken() as iUser);

  const [token, setToken] = useState<string | null>(null);

  const [state, setState] = useState<iState>({
    showAlert: sessionStorage.getItem("showAlert") === "false" ? false : true,
    showVersion: false,
    showTopicTip: false,
    showCategoryTip: false,
    settings: false,
    topic: "",
    category: "Event",
    auto: localStorage.getItem("auto") === "false" ? false : true,
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

  useEffect(() => {}, []);

  const verifyCode = async (
    tokenResponse: Omit<
      CodeResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    const URL =
      "http://localhost:4000/api/verifyCode?" +
      new URLSearchParams(tokenResponse).toString();

    const response = await api.get(URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XmlHttpRequest",
      },
    });
    console.log(response.data);
    const userObject = jwtDecode(response.data.idToken as string);
    console.log(userObject);
    setUser(userObject as iUser);
    localStorage.setItem("jwt_token", response.data.idToken);
    if (response.status !== 200) {
      return console.error(response.data);
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwt_token");
    googleLogout();
  };

  const credentialStorage = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    const userObject = jwtDecode(credentialResponse.credential as string);
    // setUser(userObject as iUser);
    localStorage.setItem(
      "jwt_token",
      JSON.stringify(credentialResponse.credential)
    );
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      verifyCode(tokenResponse);
      // onSubmitHandler();
      // credentialStorage(tokenResponse);
    },
    ux_mode: "popup",
    flow: "auth-code",
  });

  // const hasAccess = hasGrantedAllScopesGoogle(
  //   tokenResponse,
  //   "google-scope-1",
  //   "google-scope-2"
  // );

  const onHideAlert = () => {
    sessionStorage.setItem("showAlert", JSON.stringify(false));
    setState({ ...state, showAlert: false });
  };

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
        loading: "ValidateParameters",
        submit: true,
        error: {
          message: parametersResponse.data,
          status: parametersResponse.status,
        },
      });
    }
    //######################################################################//
    setState({ ...state, submit: true, loading: "FetchingCategory" });
    const categoryResponse = await api.post("/category", state, {
      signal: controller.signal,
    });
    console.log(categoryResponse.data);
    if (categoryResponse.status !== 200) {
      return setState({
        ...state,
        loading: "FetchingCategory",
        submit: true,
        error: {
          message: "Cannot Determine Category",
          status: categoryResponse.status,
        },
      });
    }
    setState({
      ...state,
      submit: true,
      category: categoryResponse.data,
      loading: "SlideTitles",
    });
    //######################################################################//
    //######################################################################//
    const titlesResponse = await api.post("/slideTitles", state, {
      signal: controller.signal,
    });
    console.log(titlesResponse.data);
    if (titlesResponse.status !== 200) {
      return setState({
        ...state,
        loading: "SlideTitles",
        submit: true,
        error: {
          message: "Cannot Get Titles for Each Slide",
          status: titlesResponse.status,
        },
      });
    }
    setState({
      ...state,
      submit: true,
      category: categoryResponse.data,
      loading: "SlideDetails",
    });
    //######################################################################//
    const slideDetailsResponse = await api.post(
      "/slideDetails",
      { ...state, titles: titlesResponse.data },
      {
        signal: controller.signal,
      }
    );
    console.log(slideDetailsResponse.data);
    if (slideDetailsResponse.status !== 200) {
      return setState({
        ...state,
        loading: "SlideDetails",
        submit: true,
        error: {
          message: "Couldn't Gather Information",
          status: slideDetailsResponse.status,
        },
      });
    }
    setState({
      ...state,
      submit: true,
      category: categoryResponse.data,
      loading: "CreatePresentation",
    });
    const data = { slidesInfo: slideDetailsResponse.data, ...state };
    console.log(data);
    const presentationResponse = await api.post("/createPresentation", data);
    console.log(presentationResponse.data);
    if (presentationResponse.status !== 200) {
      return setState({
        ...state,
        loading: "CreatePresentation",
        submit: true,
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
    if (
      state.topic.length >= 2 &&
      state.slideCount >= 1 &&
      categories.filter((category) => category === state.category).length === 1
    ) {
      return false;
    }
    return true;
  };

  // console.log(user);

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
      {state.showAlert && <Alert onCloseHandler={() => onHideAlert()} />}
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
      {state.showTopicTip && (
        <InfoModal
          title="Topic"
          message={topicTipMessage}
          onCloseHandler={() => setState({ ...state, showTopicTip: false })}
        />
      )}
      {state.showCategoryTip && (
        <InfoModal
          title="Category"
          message={categoryTipMessage}
          onCloseHandler={() => setState({ ...state, showCategoryTip: false })}
        />
      )}
      {!state.submit && (
        <>
          <div
            style={{
              position: width > 400 ? "absolute" : "relative",
              right: width > 400 ? 30 : 0,
              top: width > 400 ? (state.showAlert ? "9vh" : 20) : 0,
              transition: "all 0.5s ease",
            }}
            className={!user ? "shadow" : ""}
          >
            {!user && <LoginButton onClickHandler={login} />}
            {user && (
              <>
                <Profile
                  imageURL={user.picture}
                  email={user.email}
                  name={user.name}
                />
                <LogoutButton onClickHandler={logout} />
              </>
            )}
          </div>
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
              onTipClickHandler={() =>
                setState({ ...state, showTopicTip: true })
              }
            />
            <Row style={{}}>
              <InfoIcon
                style={{
                  marginTop: width > 2000 ? 18 : 10,
                  marginRight: width > 2000 ? 32 : width > 1100 ? 5 : 35,
                  position: "relative",
                  left: 32,
                }}
                onClickHandler={() =>
                  setState({ ...state, showCategoryTip: true })
                }
              />
              <Col
                style={{
                  // backgroundColor: "blue",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: 18, marginTop: 9 }}>Category:</p>
              </Col>
              <Col
                style={{
                  // backgroundColor: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {width <= 2000 ? (
                  <DropdownButton
                    key={"primary"}
                    title={state.category ? state.category : "Event"}
                    onSelect={(value) =>
                      setState({ ...state, category: value as Category })
                    }
                    disabled={state.auto}
                    style={{ marginRight: width > 1100 ? 25 : -10 }}
                  >
                    {categories.map((category, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          eventKey={category}
                          onClick={(e) =>
                            setState({
                              ...state,
                              category: (e.target as HTMLButtonElement)
                                .innerHTML as Category,
                            })
                          }
                        >
                          {category}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                ) : (
                  <Pagination style={{ marginTop: 13 }}>
                    {categories.map((category, index) => {
                      return (
                        <Pagination.Item
                          disabled={state.auto}
                          key={index}
                          active={category === state.category}
                          onClick={(e) =>
                            setState({
                              ...state,
                              category: (e.target as HTMLButtonElement)
                                .innerHTML as Category,
                            })
                          }
                        >
                          {category}
                        </Pagination.Item>
                      );
                    })}
                  </Pagination>
                )}
              </Col>
              <Col
                style={{
                  // backgroundColor: "green",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AutoButton
                  onClickHandler={() =>
                    setState({ ...state, auto: !state.auto })
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
              type={!user ? "secondary" : "success"}
              value={!user ? "Sign In & Submit" : "Submit"}
              // type={"success"}
              // value={"Submit"}
              onClickHandler={!user ? login : onSubmitHandler}
              // onClickHandler={login}
              disabled={disable()}
              style={{ marginTop: height > 800 ? 30 : 0 }}
              textStyle={{ fontSize: !user ? 13 : 17 }}
              // textStyle={{ fontSize: 17 }}
            />
          </div>
        </>
      )}
      {/* {state.submit && state.loading && !state.error && ( */}
      {state.submit && state.loading && !state.error && user && (
        <>
          <div
            style={{
              position: width > 600 ? "absolute" : "relative",
              left: width > 600 ? 30 : 0,
              top: width > 600 ? (state.showAlert ? "9vh" : 20) : 0,
              transition: "all 0.5s ease",
            }}
          >
            <Profile
              imageURL={user.picture}
              email={user.email}
              name={user.name}
            />
          </div>
          <Loading
            loadingStatus={state.loading}
            error={state.error}
            topic={state.topic}
            title={state.title}
            category={state.category}
            auto={state.auto}
            onClickHandler={onCancelHandler}
          />
        </>
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
      {state.submit && state.error && (
        <Error
          loadingStatus={state.loading as LoadingType}
          error={state.error}
          category={state.category}
          auto={state.auto}
          onClickHandler={() =>
            setState({ ...state, loading: null, error: null, submit: false })
          }
        />
      )}
      <Footer
        onClickHandler={() => setState({ ...state, showVersion: true })}
      />
    </Container>
  );
};

export default App;
