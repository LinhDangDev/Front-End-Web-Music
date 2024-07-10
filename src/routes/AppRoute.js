import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../component/Home/Home";
import Login from "../component/Authentication/Login";
import Authenticate from "../component/Authentication/Authenticate";
import Register from "../component/Authentication/Register";
import ForgotPassword from "../component/Authentication/ForgotPassword";
import VerifyOtp from "../component/Authentication/VerifyOtp";
import ChangePassword from "../component/Authentication/ChangePassword";
import AdminLayout from "../component/test/admin/AdminLayout";
import CreateUser from "../component/test/user/CreateUser";
import UpdateUser from "../component/test/user/UpdateUser";
import DeleteUser from "../component/test/user/DeleteUser";
import CreatePermission from "../component/test/permission/CreatePermission";
import CreateRole from "../component/test/admin/Role/CreateRole";
import PermissionNav from "../component/test/permission/PermissionNav";
import ListPermission from "../component/test/permission/ListPermission";
import DeletePermission from "../component/test/permission/DeletePermission";
import UserNav from "../component/test/user/UserNav";
import ListUser from "../component/test/user/ListUser";
import RoleNav from "../component/test/admin/Role/RoleNav";
import ListRole from "../component/test/admin/Role/ListRole";
import DeleteRole from "../component/test/admin/Role/DeleteRole";
import ListSong from "../component/test/admin/songs/ListSong";
import CreateSong from "../component/test/admin/songs/CreateSong";
import UpdateSong from "../component/test/admin/songs/UpdateSong";
import DeleteSong from "../component/test/admin/songs/DeleteSong";
import CategorySong from "../component/test/admin/songs/CategorySong";
import SongNav from "../component/test/admin/songs/SongNav";
import GenreNav from "../component/test/admin/Role/Genre/GenreNav";
import CreateGenre from "../component/test/admin/Role/Genre/CreateGenre";
import UpdateGenre from "../component/test/admin/Role/Genre/UpdateGenre";
import DeleteGenre from "../component/test/admin/Role/Genre/DeleteGenre";
import ListGenre from "../component/test/admin/Role/Genre/ListGenre";

const AppRoutes = () => {
  useEffect(() => {
    // Any DOM manipulation should be done here
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/GenreNav" element={<GenreNav />} />
        <Route path="/CreateGenre" element={<CreateGenre />} />
        <Route path="/UpdateGenre" element={<UpdateGenre />} />
        <Route path="/DeleteGenre" element={<DeleteGenre />} />
        <Route path="/ListGenre" element={<ListGenre />} />
        <Route path="/SongNav" element={<SongNav />} />

        <Route path="/ListSong" element={<ListSong />} />
        <Route path="/CreateSong" element={<CreateSong />} />
        <Route path="/UpdateSong" element={<UpdateSong />} />
        <Route path="/DeleteSong" element={<DeleteSong />} />
        <Route path="/CategorySong" element={<CategorySong />} />

        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/UpdateUser" element={<UpdateUser />} />
        <Route path="/DeleteUser" element={<DeleteUser />} />
        <Route path="/UserNav" element={<UserNav />} />
        <Route path="/ListUser" element={<ListUser />} />
        <Route path="/create-permission" element={<CreatePermission />} />
        <Route path="/CreateRole" element={<CreateRole />} />
        <Route path="/DeleteRole" element={<DeleteRole />} />
        <Route path="/ListRole" element={<ListRole />} />
        <Route path="/RoleNav" element={<RoleNav />} />
        <Route path="/PermissionNav" element={<PermissionNav />}></Route>
        <Route path="/ListPermission" element={<ListPermission />}></Route>
        <Route path="/DeletePermission" element={<DeletePermission />}></Route>
        {/* permission */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
