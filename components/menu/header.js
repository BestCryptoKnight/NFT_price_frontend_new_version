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
        <a className="no-underline">
            {props.children}
        </a>
    </Link>
);

const NavItems = () => {
    return (
        <div className='menu'>
            {
                Links.map((link, index) => {
                    return <div className='navbar-item' key={index} style={{ background: "rgba(217, 217, 217, 0.05)" }}>
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
    const [openMenu, setOpenMenu] = React.useState(false);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const [openMenu2, setOpenMenu2] = React.useState(false);
    const [openMenu3, setOpenMenu3] = React.useState(false);
    const handleBtnClick = () => {
        setOpenMenu(!openMenu);
    };
    const handleBtnClick1 = () => {
        setOpenMenu1(!openMenu1);
    };
    const handleBtnClick2 = () => {
        setOpenMenu2(!openMenu2);
    };
    const handleBtnClick3 = () => {
        setOpenMenu3(!openMenu3);
    };
    const closeMenu = () => {
        setOpenMenu(false);
    };
    const closeMenu1 = () => {
        setOpenMenu1(false);
    };
    const closeMenu2 = () => {
        setOpenMenu2(false);
    };
    const closeMenu3 = () => {
        setOpenMenu3(false);
    };

    const ref = useOnclickOutside(() => {
        closeMenu();
    });
    const ref1 = useOnclickOutside(() => {
        closeMenu1();
    });
    const ref2 = useOnclickOutside(() => {
        closeMenu2();
    });
    const ref3 = useOnclickOutside(() => {
        closeMenu3();
    });


    const [showmenu, btn_icon] = useState(false);
    const [showpop, btn_icon_pop] = useState(false);
    const [shownot, btn_icon_not] = useState(false);
    const closePop = () => {
        btn_icon_pop(false);
    };
    const closeNot = () => {
        btn_icon_not(false);
    };
    const refpop = useOnclickOutside(() => {
        closePop();
    });
    const refpopnot = useOnclickOutside(() => {
        closeNot();
    });

    useEffect(() => {
        const header = document.getElementById("myHeader");
        const totop = document.getElementById("scroll-to-top");
        const sticky = header.offsetTop;
        const scrollCallBack = window.addEventListener("scroll", () => {
            btn_icon(false);
            if (window.pageYOffset > sticky) {
                header.classList.add("sticky");
                totop.classList.add("show");

            } else {
                header.classList.remove("sticky");
                totop.classList.remove("show");
            }
            if (window.pageYOffset > sticky) {
                closeMenu();
            }
        });
        return () => {
            window.removeEventListener("scroll", scrollCallBack);
        };
    }, []);
    return (
        <header className={` ${className}`} id="myHeader">
            <div className='container'>
                <div className='header-container'>

                    <div className='no-underline' >
                        <div className='panchang-font'>
                            <NavLink href="/">
                                <span >
                                    NFT
                                </span>
                                <span className="white-color">
                                    PRICE
                                </span>
                            </NavLink>
                        </div>
                    </div>

                    <div className='search' >
                        <input id="quick_search" className="search-input" name="quick_search"
                            placeholder="&#x1F50E;&#xFE0E; search item here..."
                            type="text"
                        />
                    </div>

                    <div className="page-nav">
                        <span className="">Home</span>
                        <span className="">About</span>
                    </div>

                    {/* <BreakpointProvider>
                        <Breakpoint l down>
                            {showmenu && <NavItems />}
                        </Breakpoint>

                        <Breakpoint xl>
                            <NavItems />
                        </Breakpoint>
                    </BreakpointProvider> */}
                </div>
            </div>
        </header>
    );
}
export default Header;
