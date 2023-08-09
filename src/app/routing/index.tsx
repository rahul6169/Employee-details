import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Employees } from "../employee";
import { Skills } from "../skill";
import LayoutDesign from "../layout";
import { Dashboard } from "../dashboard";
import { Tags } from "../Tag";
import LoginForm from "../login";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "antd/es/form/interface";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { initSession } from "../../store/session";
import { RoutingConstraints } from "./constraints";
import { Spin } from "antd";
import "./style.css";
import { RazorpayPayment } from "../razorpay";
export const AppRouting: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, hasSession } = useSelector(
    (state: Store) => state.session
  );

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      dispatch(initSession() as any);
    });
  }, [dispatch]);

  if (!hasSession) {
    return (
      <div className="loadingSpinner">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Navigate to={RoutingConstraints.LOGIN} />} /> */}
        <Route
          path={RoutingConstraints.LOGIN}
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />
          }
        />
        <Route path="/" element={<LayoutDesign />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employees />} />
          <Route path="/skill" element={<Skills />} />
          <Route path="/tag" element={<Tags />} />
          <Route path="/razorpay" element={<RazorpayPayment />} />
          <Route path="*" element={<p>404 Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
