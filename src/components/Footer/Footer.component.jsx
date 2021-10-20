import React from 'react'
import './Footer.styles.css'

export default function Footer() {
    return (
        <div className="footer">
            <div className="main">
                    <h1>job board</h1>
                <div className="footer-content">
                    <ul>
                        <h4>Help</h4>
                        <a href=""><li>Support Centre</li></a>
                    </ul>
                    <ul>
                        <h4>Privacy</h4>
                        <li>Lorem Ipsum</li>
                        <li>Sit Amet</li>
                        <li>Dolar</li>
                    </ul>
                    <ul>
                        <h4>Support</h4>
                        <li>Consectetur</li>
                    </ul>
                    <ul>
                        <h4>About us</h4>
                        <li>Terms of Use</li>
                    </ul>
                </div>
                <div className="bottomContent">© copyright { new Date().getFullYear() } a.c.</div>
            </div>
        </div>
    )
}
