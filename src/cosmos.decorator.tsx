import "typeface-inter";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import React from "react";
import { useValue } from "react-cosmos/fixture";

import defaultTheme from "./themes/default";

const themes = {
  default: {}
};

const Decorator: React.FC<{ children: any; theme?: string }> = ({
  children
}) => {
  const defaultValue = localStorage.getItem("theme") || "default";

  const [theme, setTheme] = useValue("theme", { defaultValue });

  return (
    <ThemeProvider theme={createMuiTheme(defaultTheme)}>
      <CssBaseline />
      <header style={{ display: "none" }}>
        <select
          onChange={e => {
            setTheme(e.target.value);
            localStorage.setItem("theme", e.target.value);
          }}
          value={theme}
        >
          {Object.keys(themes).map(key => (
            <option value={key} key={key}>
              {key}
            </option>
          ))}
        </select>
      </header>

      {children}
    </ThemeProvider>
  );
};

export default Decorator;
