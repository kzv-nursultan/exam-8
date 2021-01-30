import React from 'react';
import Footer from '../UI/Footer/Footer';
import NavBar from '../../containers/NavBar/NavBar';
import Content from '../../containers/Content/Content';

const MainPage = () => {
    return(
        <div>
            <NavBar/>
            <div className='container'>
               <Content/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainPage;