import React from 'react';
import Link from 'next/link';

const NavLink = props => (
    <Link{...props}>
        <a id={props.id}>
            {props.children}
        </a>
    </Link>
);

const footer = () => (
    <footer className="container">
        <div className='footer-border'></div>
        <div className="footer-container">
            <div className="social-icons">
                <span className='white-color'><NavLink href="https://www.instagram.com/nftpricezone/"><i className="fa fa-instagram fa-lg white"></i></NavLink></span>
                {/* <span className='white-color'><NavLink href="https://twitter.com/nftpricezone1"><i className="fab fa-telegram-plane fa-lg white"></i></NavLink></span> */}
                <span className='white-color'><NavLink href="https://twitter.com/nftpricezone1"><i className="fa fa-twitter fa-lg white"></i></NavLink></span>
                {/* <span className='white-color'><NavLink href="https://www.instagram.com/nftpricezone/"><i className="fa fa-discord fa-lg white"></i></NavLink></span> */}
            </div>
        </div>
        <div className='footer-border'></div>

        <div className="subfooter">
            <div className="tc grey-color">
                <div className="de-flex-col">
                    <span className="">© All rights reserved by - NFTPrice 2022</span>
                </div>
            </div>
        </div>
    </footer >
);
export default footer;