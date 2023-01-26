import React, { FC, useState } from "react";
import "./App.css";
import TextInput from "./components/TextInput";
import Checkmark from "./components/Checkmark";
import Button from "./components/Button";
import NumberInput from "./components/NumberInput";
import api from "./api";

interface iState {
  topic: string;
  title: string;
  subtitle: string;
  slideCount: number;
  images: boolean;
  sources: boolean;
}

const App: FC = () => {
  const [state, setState] = useState<iState>({
    topic: "",
    title: "",
    subtitle: "",
    slideCount: 1,
    images: false,
    sources: false,
  });

  const onSubmitHandler = async () => {
    // const response = await api.post("/createPresentation", state);
    // console.log(response);
    api
      .post("/createPresentation", state)
      .then((response) => console.log(response));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{}}>GPT3 Presentations</h2>
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
          <Button onClickHandler={onSubmitHandler} />
        </div>
      </header>
    </div>
  );
};

export default App;
