import React, { FC } from "react";
import logo from "./logo.svg";
import "./App.css";
import FormCard from "./components/FormCard";
import Input from "./components/Input";
import Checkmark from "./components/Checkmark";
import Button from "./components/Button";

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{ marginTop: 50 }}>GPT3 Presentations</h2>
        <div style={{ marginBottom: 50 }}>
          <Input label="Topic" />
          <Input label="Title" />
          <Input label="Subtitle" />
        </div>
        <div>
          <Checkmark label="Images" />
          <Checkmark label="Sources" />
        </div>
        <div>
          <Button />
        </div>
      </header>
    </div>
  );
};

export default App;
