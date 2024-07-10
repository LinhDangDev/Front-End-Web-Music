import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../component/Home/Home";
import Login from "../component/Authentication/Login";
import Authenticate from "../component/Authentication/Authenticate";
import Register from "../component/Authentication/Register";
import ForgotPassword from "../component/Authentication/ForgotPassword";
import VerifyOtp from '../component/Authentication/VerifyOtp';
import ChangePassword from "../component/Authentication/ChangePassword"
import Album from "../component/Home/Albums";
import Artist from "../component/Home/Artist";
import Song from "../component/Home/Song";
import AllCategory from '../component/Home/CategoryList';
import Category from '../component/Home/Category';
import CategoryPageSong from '../component/Home/CategoryPageSong';
import AllArtist from '../component/Home/ArtistList';
const AppRoutes = () => {
    return (
        <Router>
            <Routes> {/* Sử dụng Routes thay vì Route */}
                <Route path="/login" element={<Login />} />
                <Route path="/authenticate" element={<Authenticate />} />
                <Route path="/" element={<Home />} />
                <Route path="/album/:albumId" element={<Album />} />
                <Route path="/artist" element={<Artist />} />
                <Route path="/artists" element={<AllArtist />} /> 
                <Route path="/song" element={<Song />} />
                <Route path="/all-categories" element={<AllCategory />} />
                <Route path="/genres" element={<Category />} /> {/* Route cho trang Category */}
                <Route path="/genres/:genreId/songs" element={<CategoryPageSong />} />
                <Route path="/songs/:id/play" element={<Song />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/artist/:artistId/songs" element={<Artist />} />
            



                {/* <Route path="/admin" element={<AdminLayout />} />
                <Route path="create-user" element={<CreateUser />} />
                <Route path="update-user" element={<UpdateUser />} />
                <Route path="delete-user" element={<DeleteUser />} />
                <Route path="create-permission" element={<CreatePermission />} />
                <Route path="create-role" element={<CreateRole />} />
                <Route path="create-song" element={<CreateSong />} /> */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;