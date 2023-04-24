//Libraries
import React, { FC, useEffect, useState } from "react"
import {
    Col,
    Container,
    Dropdown,
    DropdownButton,
    Pagination,
    Row,
} from "react-bootstrap"
import {
    googleLogout,
    useGoogleLogin,
    CodeResponse,
    GoogleLogin,
} from "@react-oauth/google"
import { toast, ToastContainer } from "react-toastify"
import { CircleLoader } from "react-spinners"
import { AxiosError } from "axios"
import { useRouter } from "next/router"
import { DateTime } from "luxon"

import jwtDecode from "jwt-decode"
import GoogleButton from "react-google-button"

//Axios
import api from "../lib/frontend/axios"

//Custom Utilities
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import showPolicyUpdate from "../lib/frontend/util/showPolicyUpdate"
import errorMessage from "../lib/frontend/util/errorMessage"
import errorHandler from "../lib/frontend/util/errorHandler"

//Models
import iError from "../lib/frontend/models/error"
import iUser from "../lib/frontend/models/user"
import iPresentation from "../lib/frontend/models/presentation"
import iSlideInfo from "../lib/shared/models/slideInfo"

//Types
import Model from "../lib/frontend/types/model"
import Category from "../lib/frontend/types/category"
import LoadingType from "../lib/frontend/types/loading"

//Static Data
import categories from "../lib/frontend/data/categories"

//Custom Components
import TextInput from "../components/TextInput"
import BannerLogo from "../components/BannerLogo"
import Button from "../components/Button"
import NumberInput from "../components/NumberInput"
import Loading from "../components/Loading"
import Warning from "../components/Warning"
import Footer from "../components/Footer"
import Alert from "../components/Alert"
import VersionModal from "../components/VersionModal"
import InfoModal from "../components/InfoModal"
import InfoIcon from "../components/InfoIcon"
import Profile from "../components/Profile"
import Result from "../components/Result"
import SlideCountTip from "../components/SlideCountTip"
import DeleteModal from "../components/DeleteModal"

//State Object Interface
interface iState {
    showBetaAlert: boolean
    showPrivacyAlert: boolean
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

//Static Variables
const topicTipMessage =
    'This is where you will enter the topic of your presentation. Please be as specific as possible, as this ensures the accuracy of the presentation. For example, the topic "The History of Tesla Motors" is much better than simply writing "Tesla", as the program clearly knows that it needs to discuss the history of the company called "Tesla Motors" instead of something else, such as the life of the individual known as Nikola Tesla.'
const categoryTipMessage =
    'Choose an option that best categorizes what you want your topic and presentation to relate to. This will ensure the accuracy of the presentation. For example, if your topic is "The Space Shuttle Columbia Disaster", choosing the category "Place" may make the presentation discuss the location of the incident, where as choosing the category "Event" may make the presentation discuss the events that unfolded. Select "Auto" if you want the program to choose what it believes is the most relevant category to the topic.'

const App: FC = () => {
    const { height, width } = useWindowDimensions()

    const [user, setUser] = useState<iUser | null>(null)

    const [state, setState] = useState<iState>({
        showBetaAlert: false,
        showPrivacyAlert: false,
        showVersion: false,
        showTopicTip: false,
        showCategoryTip: false,
        showDeleteModal: false,
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
        profileLoading: true,
        warning: null,
        error: null,
    })

    const router = useRouter()

    useEffect(() => {
        localStorage.setItem("visited", DateTime.now().toISO() as string)
        let showBetaAlert = false
        let showPrivacyAlert = false
        let auto = false
        //Fix state setting issues in useEffect
        if (sessionStorage.getItem("showAlert") !== "false") {
            showBetaAlert = true
        }
        if (showPolicyUpdate()) {
            showPrivacyAlert = true
        }
        if (localStorage.getItem("auto") === "true") {
            auto = true
        }
        const fetchUser = async () => {
            try {
                if (localStorage.getItem("id_token")) {
                    // setState({
                    //     ...state,
                    //     showBetaAlert,
                    //     showPrivacyAlert,
                    //     auto,
                    // })
                    const response = await api.get("/user/userInfo")
                    setState({ ...state, profileLoading: false })
                    if (response.status !== 200) {
                        setState({
                            ...state,
                            showBetaAlert,
                            showPrivacyAlert,
                            auto,
                            profileLoading: false,
                        })
                        setUser(null)
                        // errorToast("Session expired. Login again.")
                        return
                    }
                    setState({
                        ...state,
                        showBetaAlert,
                        showPrivacyAlert,
                        auto,
                        profileLoading: false,
                    })
                    setUser(response.data)
                } else {
                    setState({
                        ...state,
                        showBetaAlert,
                        showPrivacyAlert,
                        auto,
                        profileLoading: false,
                    })
                    setUser(null)
                    return
                }
            } catch (err) {
                toast.error(errorMessage(err as AxiosError))
            }
        }
        fetchUser()
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
                "/user/login?" + new URLSearchParams(tokenResponse).toString()
            const response = await api.get(URL, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "XmlHttpRequest",
                },
            })
            setState({ ...state, profileLoading: false })
            if (response.status !== 200) {
                setUser(null)
                return
            }
            const id_token = response.data.id_token
            const { name, email, picture } = jwtDecode(id_token) as iUser
            setUser({ name, email, picture })
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem("id_token", id_token)
            }
            api.defaults.headers.Authorization = `Bearer ${id_token}`
            return true
        } catch (err) {
            toast.error(errorMessage(err as AxiosError))
        }
    }

    const logout = async () => {
        googleLogout()
        setUser(null)
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.removeItem("id_token")
        }
        toast.success("Successfully logged out user!")
    }

    const onDeleteHandler = () => {
        setState({
            ...state,
            showDeleteModal: true,
        })
    }

    const deleteUser = async () => {
        setState({ ...state, profileLoading: true })
        try {
            const response = await api.get("/user/delete")
            if (response.status !== 200) {
                setState({
                    ...state,
                    profileLoading: false,
                    showDeleteModal: false,
                })
                toast.error(response.data)
            } else {
                logout()
                toast.success("Successfully deleted user!")
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
            return toast.error(errorMessage(err as AxiosError))
        }
    }

    const onAutoClick = () => {
        const activeStatus = !state.auto
        setState({ ...state, auto: activeStatus })
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem("auto", JSON.stringify(activeStatus))
        }
    }

    const autoClickedStyle = () => {
        if (state.auto) {
            return {
                backgroundColor: "#008CBA",
                color: "white",
                boxShadow: "0 4px #656565",
                transform: "translateY(3px)",
            }
        }
        return {}
    }

    const onLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            login(tokenResponse)
        },
        ux_mode: "popup",
        flow: "auth-code",
        scope: "https://www.googleapis.com/auth/presentations",
    })

    const onHideAlert = () => {
        if (typeof window !== "undefined" && window.sessionStorage) {
            sessionStorage.setItem("showAlert", JSON.stringify(false))
            setState({ ...state, showBetaAlert: false })
        }
    }

    const fetchSlideInfo = async (titles: string[]) => {
        const slidesInfo: iSlideInfo[] = []
        for (const title of titles) {
            const slideDetailsResponse = await api.post(
                "/presentation/slideDetails",
                { ...state, title },
                { timeout: 400000 }
            )
            const slideDetailsError = errorHandler(
                slideDetailsResponse,
                state,
                logout,
                {
                    loading: "SlideDetails",
                    submit: true,
                }
            )
            if (slideDetailsError) {
                return setState(slideDetailsError)
            }
            slidesInfo.push({ title, facts: slideDetailsResponse.data })
        }
        return slidesInfo
    }

    const onSubmitHandler = async (confirm: boolean) => {
        if (disable()) {
            return toast.error("Please fill out all required fields!")
        }
        if (confirm) {
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
            const parametersError = errorHandler(
                parametersResponse,
                state,
                logout,
                {
                    loading: "ValidateParameters",
                    submit: true,
                }
            )
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
            errorHandler(categoryResponse, state, logout, {
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
            const titlesError = errorHandler(titlesResponse, state, logout, {
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
            const slidesInfo = await fetchSlideInfo(titlesResponse.data)
            //######################################################################//
            setState({
                ...state,
                submit: true,
                category: categoryResponse.data,
                warning: null,
                loading: "CreatePresentation",
            })
            const data = {
                slidesInfo,
                accessToken:
                    typeof window !== "undefined" &&
                    window.localStorage &&
                    localStorage.getItem("access_token"),
                ...state,
            }
            const presentationResponse = await api.post(
                "/presentation/createPresentation",
                data,
                { timeout: 180000 }
            )
            const presentationData = presentationResponse.data as iPresentation
            const presentationError = errorHandler(
                presentationResponse,
                state,
                logout,
                {
                    loading: "CreatePresentation",
                    submit: true,
                }
            )
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
            setState({
                ...state,
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
        toast.error("Presentation generation was cancelled!")
    }

    const onHideVersion = () => {
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem("showVersion", "false")
        }
        setState({ ...state, showVersion: false })
    }

    const onShowVersion = () => {
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
                    {state.showBetaAlert && !state.showPrivacyAlert && (
                        <>
                            <Alert
                                text="This is a Public Beta Release - Please be aware that there may
                        be bugs and issues! We are actively working on improvements."
                                className="betaAlertBackground"
                                isLoading={state.submit}
                                onCloseHandler={() => onHideAlert()}
                            />
                        </>
                    )}
                    {state.showPrivacyAlert && (
                        <>
                            <Alert
                                text="We have made changes to our privacy policy! Click here to see them."
                                className="privacyAlertBackground"
                                isLoading={state.submit}
                                onCloseHandler={() => onHideAlert()}
                                onClickHandler={() =>
                                    router.push("/privacy#disclosure")
                                }
                            />
                        </>
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
                            <BannerLogo
                                adaptiveStyling={true}
                                height={height}
                                width={width}
                            />
                            <div
                                style={{
                                    position:
                                        width > 800 ? "absolute" : "relative",
                                    right: width > 800 ? 30 : 0,
                                    top:
                                        width > 800
                                            ? state.showBetaAlert ||
                                              state.showPrivacyAlert
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
                                    <Col className="center-container">
                                        <p
                                            style={{
                                                fontSize: 15,
                                                marginTop: 9,
                                            }}
                                        >
                                            Category:
                                        </p>
                                    </Col>
                                    <Col className="center-container">
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
                                    <Col className="center-container">
                                        <div
                                            className="auto autoButton"
                                            style={{
                                                position: "relative",
                                                bottom: 4,
                                                left: width > 400 ? 7 : 0,
                                                ...autoClickedStyle(),
                                            }}
                                            onClick={onAutoClick}
                                        >
                                            Auto
                                        </div>
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
                                            ? state.showBetaAlert ||
                                              state.showPrivacyAlert
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
                        // onClickHandler={() => navigate("/versions")}
                    />
                </>
            </Container>
        </>
    )
}

export default App
