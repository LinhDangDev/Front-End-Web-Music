// import logo from '%PUBLIC_URL%/logo.svg';
import './App.css';
import NavBar from './component/NavBar'; 
import Loader from './component/Loader';
import SearchMode from './component/SearchMode';
import Main from './component/Main';
import HeaderHero from './component/HeaderHero';
import SupportChatMode from './component/SupportChatMode';
import Footer from './component/Footer';

function App() {
  return (
    <div className="App">
      <Loader/>
      <NavBar />
      <SupportChatMode/>
      <SearchMode />
      <HeaderHero/>
      <Main/>

      <Footer />
      
    </div>
    
  );
}

export default App;
