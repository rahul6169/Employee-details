import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutDesign from "../layout";

export const AppRouting: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Navigate to={RoutingConstraints.LOGIN} />} /> */}

        <Route path="" element={<LayoutDesign />} />

        {/* </Route> */}
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
};
