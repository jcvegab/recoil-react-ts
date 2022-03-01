import { Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Spinner from "./components/Spinner";
import App from "./App";
import Pokemon from "./pages/Pokemon";
import Ability from "./pages/Ability";

const rootElement = document.getElementById("root");
render(
  <Suspense fallback={<Spinner />}>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/pokemon/:pokemonId" element={<Pokemon />} />
          <Route path="/ability/:abilityId" element={<Ability />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </Suspense>,
  rootElement
);
