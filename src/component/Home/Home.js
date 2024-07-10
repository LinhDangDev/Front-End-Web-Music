import React from 'react';
import NavBar from './NavBar';
import SearchMode from './SearchMode';
import Main from './Main';
import HeaderHero from './HeaderHero';
import SupportChatMode from './SupportChatMode';
import Footer from './Footer';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../services/localStorageService';
import { useEffect } from "react";
import TestApi from "./TestApi"


export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = getToken();

        if (!accessToken) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <>
            <Loader />
            <NavBar />
            <SupportChatMode />
            <SearchMode />
            <HeaderHero />
            <Main />
            <Footer />
        </>
    )

}
