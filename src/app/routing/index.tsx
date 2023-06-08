import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Employees } from "../employee";
import { Skills } from "../skill";
import LayoutDesign from "../layout";
import { Dashboard } from "../dashboard";
import { Tags } from "../Tag";
import LoginForm from "../login";

export const AppRouting: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route path="/" element={<LayoutDesign />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employees />} />
          <Route path="/skill" element={<Skills />} />
          <Route path="/tag" element={<Tags />} />
          <Route path="*" element={<p>404 Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
