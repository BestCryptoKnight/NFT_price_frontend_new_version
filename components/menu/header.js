import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
//import { header } from 'react-bootstrap';
import Link from 'next/link';
import useOnclickOutside from "react-cool-onclickoutside";
import { Links } from "./Menu";

setDefaultBreakpoints([
    { xs: 0 },
    { l: 1199 },
    { xl: 1200 }
]);

const NavLink = props => (
    <Link{...props}>
        <a className="text-dec-n">
            {props.children}
        </a>
    </Link>
);

const NavItems = () => {
    return (
        <div className="page-nav">
            {
                Links.map((link, index) => {
                    return <div className='navbar-item' key={index} >
                        <NavLink href={link.to}>
                            <>
                                {link.name}
                                <span className='lines'></span>
                            </>
                        </NavLink>
                    </div>
                })
            }
        </div>
    );
}


const Header = function ({ className }) {

    return (
        <header className={` ${className}`} id="myHeader">
            <div className='container'>
                <div className='header-container'>

                    <div className='no-underline responsive-nav' >
                        <div className='panchang-font flex-auto'>
                            <NavLink href="/">
                                <span >
                                    NFT
                                </span>
                                <span className="white-color">
                                    PRICE
                                </span>
                            </NavLink>
                        </div>
                        <div className="mobile-nav">

                            <NavItems />
                        </div>
                    </div>

                    <div className='search' >
                        <input id="quick_search" className="search-input" name="quick_search"
                            placeholder="&#x1F50E;&#xFE0E; search item here..."
                            type="text"
                        />
                    </div>
                    <div className="laptop-nav">

                        <NavItems />
                    </div>

                </div>
            </div>
        </header>
    );
}
export default Header;
