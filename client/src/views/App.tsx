import React, { FC, useEffect, useState } from "react"
import {
    googleLogout,
    useGoogleLogin,
    // hasGrantedAllScopesGoogle,
    CodeResponse,
    hasGrantedAllScopesGoogle,
} from "@react-oauth/google"
import "../style/App.css"
import TextInput from "../components/TextInput"
// import Checkmark from "./components/Checkmark";
import Button from "../components/Button"
import NumberInput from "../components/NumberInput"
import api from "../api"
import {
    Col,
    Container,
    Dropdown,
    DropdownButton,
    Image,
    Pagination,
    Row,
} from "react-bootstrap"
import { toast, ToastContainer } from "react-toastify"
import Loading from "../components/Loading"
import iError from "../models/error"
import Warning from "../components/Warning"
import Limitations from "../components/Limitations"
import AdvancedSettings from "../components/AdvancedSettings"

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./style//bootstrap.min.luxen.css";
// import "./style/bootstrap.min.cerulean.css";
// import "./style/bootstrap.min.cosmo.css";
import "../style/bootstrap.min.quartz.css"
// import "./style/bootstrap.min.litera.css";
// import "./style/bootstrap.min.cyborg.css";
import "react-toastify/dist/ReactToastify.css"
import Footer from "../components/Footer"
import Alert from "../components/Alert"
import VersionModal from "../components/VersionModal"
import InfoModal from "../components/InfoModal"
import Model from "../types/model"
import AutoButton from "../components/AutoButton"
import Category from "../types/category"
import categories from "../data/categories"
import LoadingType from "../types/loading"
import useWindowDimensions from "../util/useWindowDimensions"
import InfoIcon from "../components/InfoIcon"
import Profile from "../components/Profile"
import iUser from "../models/user"
import LogoutButton from "../components/ProfileButton"
import LoginButton from "../components/LoginButton"
// import ThemeButton from "./components/ThemeButton";
import { CircleLoader } from "react-spinners"
import jwtDecode from "jwt-decode"
import SettingsIcon from "../components/SettingsIcon"
import SettingsModal from "../components/SettingsModal"
import iPresentation from "../models/presentation"
import { TypeAnimation } from "react-type-animation"
import isMobile from "../util/isMobile"
import Result from "../components/Result"
import { Axios, AxiosError, AxiosResponse } from "axios"
import SlideCountTip from "../components/SlideCountTip"
import PrivacyPolicy from "./PrivacyPolicy"
import { useNavigate } from "react-router-dom"
import DeleteModal from "../components/DeleteModal"
import GoogleButton from "react-google-button"
import Header from "../components/Header"
// import SettingsModal from "./components/SettingsModal";

interface iState {
    showAlert: boolean
    showVersion: boolean
    showTopicTip: boolean
    showCategoryTip: boolean
    showDeleteModal: boolean
    settings: boolean
    topic: string
    category: Category
    auto: boolean
    title: string
    presentationId: string
    subtitle: string
    slideCount: number
    images: boolean
    sources: boolean
    model: Model
    submit: boolean
    profileLoading: boolean
    loading: LoadingType | null
    warning: string | null
    error: iError | null
}

const controller = new AbortController()

const topicTipMessage =
    'This is where you will enter the topic of your presentation. Please be as specific as possible, as this ensures the accuracy of the presentation. For example, the topic "The History of Tesla Motors" is much better than simply writing "Tesla", as the program clearly knows that it needs to discuss the history of the company called "Tesla Motors" instead of something else, such as the life of the individual konwn as Nikola Tesla.'
const categoryTipMessage =
    'Choose an option that best categorizes what you want your topic and presentation to relate to. This will ensure the accuracy of the presentation. For example, if your topic is "The Space Shuttle Columbia Disaster", choosing the category "Place" may make the presentation discuss the location of the incident, where as choosing the category "Event" may make the presentation discuss the events that unfolded. Select "Auto" if you want the program to choose what it believes is the most relevant category to the topic.'

const App: FC = () => {
    const { height, width } = useWindowDimensions()

    const [user, setUser] = useState<iUser | null>(null)

    const [state, setState] = useState<iState>({
        showAlert:
            sessionStorage.getItem("showAlert") === "false" ? false : true,
        showVersion:
            localStorage.getItem("showVersion") === "true" ? true : false,
        showTopicTip: false,
        showCategoryTip: false,
        showDeleteModal: false,
        settings: false,
        topic: "",
        // topic: "Some really long string as a topic and hwo are we going to format accordingly everyone?",
        // topic: "Space Shuttle Challenger Disaster",
        category: "Event",
        auto: localStorage.getItem("auto") === "true" ? true : false,
        title: "",
        // title: "Some really long string as a topic and hwo are we going to format accordingly everyone?",
        // title: "Space Shuttle Challengeer Disaster",
        presentationId: "",
        subtitle: "",
        slideCount: 5,
        images: false,
        sources: false,
        model: "text-davinci-003",
        submit: false,
        // loading: "FetchingCategory",
        loading: null,
        // submit: true,
        // loading: "ValidateParameters",
        // profileLoading: true,
        profileLoading: true,
        warning: null,
        error: null,
        // error: {
        //     message: "Test",
        // },
    })

    const navigate = useNavigate()

    const errorHandler = (response: AxiosResponse, customState?: any) => {
        const setStateObject = {
            ...state,
            ...customState,
            warning: null,
            error: { status: response.status, message: response.data },
        }
        if (response.status !== 200) {
            console.log(response.status)
            console.log("Error handling")
            if (response.status === 401 || response.status === 403) {
                logout()
            }
            return setStateObject
        }
    }

    const errorMessage = (err: AxiosError) => {
        let errorMessage = (err as AxiosError).message
        if (errorMessage === "Network Error") {
            errorMessage +=
                " - Unable to Reach Our Servers. Please try again later."
        }
        return errorMessage
    }

    const fetchUser = async () => {
        try {
            if (localStorage.getItem("id_token")) {
                const response = await api.get("/user/userInfo")
                setState({ ...state, profileLoading: false })
                if (response.status !== 200) {
                    setUser(null)
                    // errorToast("Session expired. Login again.")
                    return
                }
                setUser(response.data)
            } else {
                setState({ ...state, profileLoading: false })
                setUser(null)
                return
            }
        } catch (err) {
            console.error(err)
            errorToast(errorMessage(err as AxiosError))
        }
    }

    useEffect(() => {
        fetchUser()
        sessionStorage.setItem("visited", "true")
    }, [])

    const login = async (
        tokenResponse: Omit<
            CodeResponse,
            "error" | "error_description" | "error_uri"
        >
    ) => {
        try {
            setState({ ...state, profileLoading: true })
            const URL =
                "http://localhost:4000/api/v1/user/login?" +
                new URLSearchParams(tokenResponse).toString()
            // try {
            const response = await api.get(URL, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "XmlHttpRequest",
                },
            })
            setState({ ...state, profileLoading: false })
            if (response.status !== 200) {
                setUser(null)
                return console.error(response.data)
            }
            const id_token = response.data.id_token
            const { name, email, picture } = jwtDecode(id_token) as iUser
            setUser({ name, email, picture })
            localStorage.setItem("id_token", id_token)
            api.defaults.headers.Authorization = `Bearer ${id_token}`
            return true
        } catch (err) {
            console.log("Caught error")
            errorToast(errorMessage(err as AxiosError))
        }
    }

    const logout = async () => {
        googleLogout()
        setUser(null)
        localStorage.removeItem("id_token")
    }

    const onDeleteHandler = () => {
        setState({
            ...state,
            showDeleteModal: true,
        })
    }

    const deleteUser = async () => {
        console.log(localStorage.getItem("id_token"))
        setState({ ...state, profileLoading: true })
        try {
            const response = await api.get("/user/delete")
            if (response.status !== 200) {
                setState({
                    ...state,
                    profileLoading: false,
                    showDeleteModal: false,
                })
                errorToast(response.data)
            } else {
                logout()
                successToast("Successfully deleted user!")
            }
            setState({
                ...state,
                profileLoading: false,
                showDeleteModal: false,
            })
        } catch (err) {
            setState({
                ...state,
                profileLoading: false,
                showDeleteModal: false,
            })
            return errorToast(errorMessage(err as AxiosError))
        }
    }

    const onLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            login(tokenResponse)
            // onSubmitHandler();
            // credentialStorage(tokenResponse);
        },
        ux_mode: "popup",
        flow: "auth-code",
        scope: "https://www.googleapis.com/auth/presentations",
    })

    const onHideAlert = () => {
        sessionStorage.setItem("showAlert", JSON.stringify(false))
        setState({ ...state, showAlert: false })
    }

    const errorToast = (message: string) => {
        toast.error(message)
    }

    const successToast = (message: string) => {
        toast.success(message)
    }

    const onSubmitHandler = async (confirm: boolean) => {
        console.log("Calling onSubmitHandler")
        // console.log("id_token", localStorage.getItem("id_token"))
        if (disable()) {
            return errorToast("Please fill out all required fields!")
        }
        if (confirm) {
            console.log("We need to remove warning")
            setState({ ...state, warning: null })
        }
        if ((!state.title || !state.subtitle) && !confirm) {
            let message = ""
            if (!state.subtitle && !state.title) {
                message = "Your presentation will have no title and no subtitle"
            } else if (!state.title) {
                message = "Your presentation will have no title"
            } else {
                message = "Your presentation will have no subtitle"
            }
            return setState({ ...state, warning: message })
        }
        //######################################################################//
        setState({
            ...state,
            submit: true,
            warning: null,
            loading: "ValidateParameters",
        })
        try {
            const parametersResponse = await api.post(
                "/presentation/validateParameters",
                state
            )
            console.log("We have finished with request")
            const parametersError = errorHandler(parametersResponse, {
                loading: "ValidateParameters",
                submit: true,
            })
            if (parametersError) {
                return setState(parametersError)
            }
            //######################################################################//
            setState({
                ...state,
                submit: true,
                loading: "FetchingCategory",
                warning: null,
            })
            const categoryResponse = await api.post(
                "/presentation/category",
                state
            )
            errorHandler(categoryResponse, {
                loading: "FetchingCategory",
                submit: true,
            })
            //######################################################################//
            setState({
                ...state,
                submit: true,
                category: categoryResponse.data,
                loading: "SlideTitles",
                warning: null,
            })
            const titlesResponse = await api.post(
                "/presentation/slideTitles",
                state,
                { timeout: 10000 }
            )
            const titlesError = errorHandler(titlesResponse, {
                loading: "SlideTitles",
                submit: true,
            })
            if (titlesError) {
                return setState(titlesError)
            }
            //######################################################################//
            setState({
                ...state,
                submit: true,
                category: categoryResponse.data,
                loading: "SlideDetails",
                warning: null,
            })
            const slideDetailsResponse = await api.post(
                "/presentation/slideDetails",
                { ...state, titles: titlesResponse.data },
                { timeout: 400000 }
            )
            const slideDetailsError = errorHandler(slideDetailsResponse, {
                loading: "SlideDetails",
                submit: true,
            })
            if (slideDetailsError) {
                return setState(slideDetailsError)
            }
            //######################################################################//
            setState({
                ...state,
                submit: true,
                category: categoryResponse.data,
                warning: null,
                loading: "CreatePresentation",
            })
            const data = {
                slidesInfo: slideDetailsResponse.data,
                accessToken: localStorage.getItem("access_token"),
                ...state,
            }
            const presentationResponse = await api.post(
                "/presentation/createPresentation",
                data,
                { timeout: 180000 }
            )
            const presentationData = presentationResponse.data as iPresentation
            const presentationError = errorHandler(presentationResponse, {
                loading: "CreatePresentation",
                submit: true,
            })
            if (presentationError) {
                return setState(presentationError)
            }
            //######################################################################//
            return setState({
                ...state,
                submit: true,
                warning: null,
                loading: null,
                presentationId: presentationData.presentationId,
                error: null,
            })
        } catch (err) {
            console.log("Caught error")
            setState({
                ...state,
                // loading: "ValidateParameters",
                submit: true,
                warning: null,
                error: {
                    message: errorMessage(err as AxiosError),
                    status: (err as AxiosError).status,
                },
            })
        }
    }

    const onCancelHandler = () => {
        setState({ ...state, submit: false })
        errorToast("Presentation generation was cancelled!")
    }

    const onHideVersion = () => {
        localStorage.setItem("showVersion", "false")
        setState({ ...state, showVersion: false })
    }

    const onShowVersion = () => {
        // localStorage.setItem("showVersion", "true")
        setState({ ...state, showVersion: true })
    }

    const disable = () => {
        if (
            state.topic.length >= 2 &&
            state.slideCount >= 1 &&
            state.slideCount <= 20 &&
            categories.filter((category) => category === state.category)
                .length === 1
        ) {
            return false
        }
        return true
    }

    return (
        <>
            <Container fluid className="App">
                <ToastContainer
                    position="top-left"
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
                <>
                    {state.showDeleteModal && (
                        <DeleteModal
                            onCloseHandler={() =>
                                setState({ ...state, showDeleteModal: false })
                            }
                            onConfirmHandler={deleteUser}
                        />
                    )}
                    {state.warning && (
                        <Warning
                            onClickHandler={() => onSubmitHandler(true)}
                            onCloseHandler={() =>
                                setState({ ...state, warning: null })
                            }
                            message={state.warning}
                        />
                    )}

                    {state.showAlert && (
                        <Alert
                            isLoading={state.submit}
                            onCloseHandler={() => onHideAlert()}
                        />
                    )}
                    {state.showVersion && (
                        <VersionModal onCloseHandler={onHideVersion} />
                    )}
                    {state.showTopicTip && (
                        <InfoModal
                            title="Topic"
                            message={topicTipMessage}
                            onCloseHandler={() =>
                                setState({ ...state, showTopicTip: false })
                            }
                        />
                    )}
                    {state.showCategoryTip && (
                        <InfoModal
                            title="Category"
                            message={categoryTipMessage}
                            onCloseHandler={() =>
                                setState({
                                    ...state,
                                    showCategoryTip: false,
                                })
                            }
                        />
                    )}
                    {!state.submit && (
                        <>
                            {/* <Row>
                                <Col>
                                    <h2
                                        style={{
                                            color: "white",
                                            fontWeight: 500,
                                            transition: "all 0.5s ease",
                                            marginTop: isMobile(height, width)
                                                ? 30
                                                : 0,
                                        }}
                                        className="animate__animated animate__fadeIn animate__slow"
                                    >
                                        IntelliSlides
                                    </h2>
                                </Col>
                                <Col>
                                    {width >= 208 && (
                                        <Image
                                            src={require("../images/IntelliSlidesLogoTransparent.png")}
                                            style={{
                                                height: 50,
                                                width: 50,
                                                marginLeft: -10,
                                                marginTop: isMobile(
                                                    height,
                                                    width
                                                )
                                                    ? 24
                                                    : -4,
                                            }}
                                        />
                                    )}
                                </Col>
                            </Row> */}
                            <Image
                                src={require("../images/IntelliSlidesBannerTransparent.png")}
                                style={{
                                    height: 75,
                                    width: 280,
                                    marginTop: isMobile(height, width) ? 30 : 5,
                                }}
                                className="pointer animate__animated animate__fadeIn"
                                onClick={() => navigate("/")}
                            />
                            <div
                                style={{
                                    position:
                                        width > 800 ? "absolute" : "relative",
                                    right: width > 800 ? 30 : 0,
                                    top:
                                        width > 800
                                            ? state.showAlert
                                                ? 70
                                                : 20
                                            : 0,
                                    margin: width > 800 ? 0 : 20,
                                    transition: "all 0.5s ease",
                                }}
                                className={!user ? "shadow" : ""}
                            >
                                {state.profileLoading ? (
                                    <CircleLoader size={50} color={"#36d7b7"} />
                                ) : (
                                    <>
                                        {!user && (
                                            // <LoginButton
                                            //     onClickHandler={onLogin}
                                            // />
                                            <GoogleButton onClick={onLogin} />
                                        )}
                                        {user && (
                                            <div className="animate__animated animate__fadeInRight">
                                                <Profile
                                                    imageURL={user.picture}
                                                    email={user.email}
                                                    name={user.name}
                                                    showLogout={true}
                                                    onLogoutHandler={logout}
                                                    onDeleteHandler={
                                                        onDeleteHandler
                                                    }
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            <div>
                                <TextInput
                                    label="Topic"
                                    value={state.topic}
                                    placeholder={
                                        "The Major Historical Events of WW2"
                                    }
                                    onChangeHandler={(e) =>
                                        setState({
                                            ...state,
                                            topic: e.target.value,
                                        })
                                    }
                                    required={true}
                                    minLength={2}
                                    info={true}
                                    onTipClickHandler={() =>
                                        setState({
                                            ...state,
                                            showTopicTip: true,
                                        })
                                    }
                                />
                                <Row style={{}}>
                                    <InfoIcon
                                        style={{
                                            marginTop: width > 2000 ? 18 : 10,
                                            marginRight:
                                                width > 2000
                                                    ? 32
                                                    : width > 1100
                                                    ? 5
                                                    : 35,
                                            position: "relative",
                                            left: 32,
                                        }}
                                        onClickHandler={() =>
                                            setState({
                                                ...state,
                                                showCategoryTip: true,
                                            })
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
                                        <p
                                            style={{
                                                fontSize: 15,
                                                marginTop: 9,
                                            }}
                                        >
                                            Category:
                                        </p>
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
                                                title={
                                                    state.category
                                                        ? state.category
                                                        : "Event"
                                                }
                                                onSelect={(value) =>
                                                    setState({
                                                        ...state,
                                                        category:
                                                            value as Category,
                                                    })
                                                }
                                                disabled={state.auto}
                                                style={{
                                                    marginRight:
                                                        width > 1100 ? 25 : -10,
                                                }}
                                            >
                                                {categories.map(
                                                    (category, index) => {
                                                        return (
                                                            <Dropdown.Item
                                                                key={index}
                                                                eventKey={
                                                                    category
                                                                }
                                                                onClick={(e) =>
                                                                    setState({
                                                                        ...state,
                                                                        category:
                                                                            (
                                                                                e.target as HTMLButtonElement
                                                                            )
                                                                                .innerHTML as Category,
                                                                    })
                                                                }
                                                            >
                                                                {category}
                                                            </Dropdown.Item>
                                                        )
                                                    }
                                                )}
                                            </DropdownButton>
                                        ) : (
                                            <Pagination
                                                style={{ marginTop: 13 }}
                                            >
                                                {categories.map(
                                                    (category, index) => {
                                                        return (
                                                            <Pagination.Item
                                                                disabled={
                                                                    state.auto
                                                                }
                                                                key={index}
                                                                active={
                                                                    category ===
                                                                    state.category
                                                                }
                                                                onClick={(e) =>
                                                                    setState({
                                                                        ...state,
                                                                        category:
                                                                            (
                                                                                e.target as HTMLButtonElement
                                                                            )
                                                                                .innerHTML as Category,
                                                                    })
                                                                }
                                                            >
                                                                {category}
                                                            </Pagination.Item>
                                                        )
                                                    }
                                                )}
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
                                                setState({
                                                    ...state,
                                                    auto: !state.auto,
                                                })
                                            }
                                        />
                                    </Col>
                                </Row>
                                <TextInput
                                    label="Title"
                                    value={state.title}
                                    placeholder={"WW2 Presentation"}
                                    onChangeHandler={(e) =>
                                        setState({
                                            ...state,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                <TextInput
                                    label="Subtitle"
                                    placeholder="By: John Appleseed"
                                    value={state.subtitle}
                                    onChangeHandler={(e) =>
                                        setState({
                                            ...state,
                                            subtitle: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div style={{ marginBottom: 5 }}>
                                <NumberInput
                                    value={state.slideCount}
                                    onChangeHandler={(e) =>
                                        setState({
                                            ...state,
                                            slideCount: parseInt(
                                                e.target.value
                                            ),
                                        })
                                    }
                                    required={true}
                                    min={1}
                                    max={20}
                                />
                            </div>
                            <SlideCountTip slideCount={state.slideCount} />
                            <div>
                                <Button
                                    type={!user ? "secondary" : "success"}
                                    value={!user ? "Sign In" : "Submit"}
                                    // type={"success"}
                                    // value={"Submit"}
                                    onClickHandler={
                                        !user
                                            ? onLogin
                                            : () => onSubmitHandler(false)
                                    }
                                    // onClickHandler={login}
                                    disabled={disable()}
                                    style={{
                                        marginTop: height > 800 ? 30 : 0,
                                        marginBottom: 30,
                                    }}
                                    textStyle={{ fontSize: 17 }}
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
                                    position:
                                        width > 600 ? "absolute" : "relative",
                                    left: width > 600 ? 30 : 0,
                                    top:
                                        width > 600
                                            ? state.showAlert
                                                ? "9vh"
                                                : 20
                                            : 0,
                                    transition: "all 0.5s ease",
                                }}
                            >
                                <Profile
                                    imageURL={user.picture}
                                    email={user.email}
                                    name={user.name}
                                    showLogout={false}
                                    onLogoutHandler={logout}
                                    onDeleteHandler={onDeleteHandler}
                                />
                            </div>
                            <Loading
                                loadingStatus={state.loading}
                                error={state.error}
                                topic={state.topic}
                                title={state.title}
                                category={state.category}
                                auto={state.auto}
                                slideCount={state.slideCount}
                                onClickHandler={onCancelHandler}
                            />
                        </>
                    )}
                    {state.submit &&
                        !state.loading &&
                        !state.error &&
                        state.presentationId && (
                            <Result
                                title="Success"
                                message={`Your Presentation "${state.title}" Was Created!`}
                                presentationId={state.presentationId}
                                onClickHandler={() =>
                                    setState({
                                        ...state,
                                        loading: null,
                                        submit: false,
                                    })
                                }
                            />
                        )}
                    {state.submit && state.error && (
                        <Result
                            title="Error"
                            message={state.error.message}
                            onClickHandler={() =>
                                setState({
                                    ...state,
                                    loading: null,
                                    error: null,
                                    submit: false,
                                })
                            }
                        />
                    )}
                    <Footer
                        isLoading={state.submit}
                        onClickHandler={onShowVersion}
                    />
                </>
            </Container>
        </>
    )
}

export default App
