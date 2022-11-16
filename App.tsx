import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";
import { Home } from "./src/pages/Home";
import { Welcome } from "./src/pages/Welcome";


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <Welcome /> */}
      <Home />
    </ThemeProvider>
  );
}