import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './MainMenu.styles.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import useOnclickOutside from 'react-cool-onclickoutside';

const MainMenu = () => {

    const [isMobileMenu, setIsMobileMenu] = useState(false)

    return (
        <>
            { isMobileMenu ? <MobileMenu setIsOpen={(value)=>setIsMobileMenu(value)} isOpen={isMobileMenu} id="mobileMenu" /> : null }
            <div className="mainMenu">
                <GiHamburgerMenu style={{ cursor: "pointer" }} onClick={()=>setIsMobileMenu(!isMobileMenu)} size="1.5em" color="white" />
                <ul>
                    <Link to="/"><li>home</li></Link>
                    <li>future talent</li>
                    <li>about</li>
                </ul>
            </div>
        </>
    );
}

export default MainMenu;

export const MobileMenu = props => {

    const ref = useOnclickOutside(() => {
        if(props.isOpen) props.setIsOpen(false)
    })

    return (
        <div ref={ref} className="mobileMenu">
            <ul>
                <Link style={{ textDecoration: "none", color: "inherit" }} to="/"><li>home</li></Link>
                <li>future talent</li>
                <li>about</li>
            </ul>
        </div>
    )
}
