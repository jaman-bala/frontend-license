import React from "react";
import { Layout } from "antd";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AdminHeader from "./components/layout/AdminHeader/AdminHeader.tsx";
import AdminContent from "./components/layout/AdminContent/AdminContent.tsx";
import AdminSideBar from "./components/layout/AdminSideBar/AdminSideBar.tsx";
import License from './pages/License/License.tsx';
import Users from './pages/Users/Users.tsx';
import SignIn from './pages/SignIn/SignIn.tsx';
import PrivateRoute from "./utils/routing/privateRouting.tsx";
import LoginRoute from "./utils/routing/loginRoute.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";

const AdminLayout = () => (
  <Layout>
    <AdminHeader />
    <Layout>
      <AdminSideBar />
      <AdminContent>
        <Outlet />
      </AdminContent>
    </Layout>
  </Layout>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRoute component={SignIn} />} />
        <Route path="/" element={<PrivateRoute component={AdminLayout} />}>
          <Route index element={<License />} />
          <Route path="users" element={<Users />} />
          <Route path="*" element={<NotFound />} /> 
        </Route>
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
