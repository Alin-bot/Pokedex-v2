import * as React from "react";

import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import {
  ChakraProvider,
  ColorModeScript,
  HStack,
  Spinner,
  theme,
  VStack,
} from "@chakra-ui/react";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout/Layout";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <React.Suspense
            fallback={
              <VStack h="100vh" justify="center" align="center">
                <HStack justify="center" align="center">
                  <Spinner thickness="4px" emptyColor="gray.200" size="xl" />
                </HStack>
              </VStack>
            }
          >
            <Routes>
              <Route index element={<HomePage />} />
            </Routes>
          </React.Suspense>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
