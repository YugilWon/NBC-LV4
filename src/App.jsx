import React from "react";
import Router from "./shared/Router";
import { QueryClientProvider, QueryClient } from "react-query";
import "./reset.css";
import GlobalStyle from "./styled-components/Font/Font";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
