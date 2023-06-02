import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Employees } from "../employee";
import { Skills } from "../skill";
import LayoutDesign from "../layout";

export const AppRouting: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDesign />} />

        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
};
