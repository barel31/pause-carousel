import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import './NavBar.scss';

// Load svgs
import { ReactComponent as OffsetLeft } from '../svg/offset-left.svg';
import { ReactComponent as Logo } from '../svg/logo.svg';
import { ReactComponent as Icon } from '../svg/icon.svg';

// Navigation Bar Component
export default function NavBar() {
    const [dropDownMenu, setDropDownMenu] = useState(false);

    return (
        <nav className='NavBar'>
            <div className='nav-logo'>
                <a href='/'>
                    <Logo />
                    <Icon />
                </a>
            </div>

            <div className='nav-links'>
                <a href='#' className='hover-pink'>
                    About
                </a>
                <a
                    href='#'
                    className='hover-blue nav-arrow-animation'
                    onMouseOver={() => setDropDownMenu(true)}
                    onMouseLeave={() => setDropDownMenu(false)}>
                    Contact
                    <span>
                        <HiChevronDown />
                    </span>
                </a>
                {dropDownMenu && (
                    <div
                        className='nav-contact-drop-down'
                        onMouseOver={() => setDropDownMenu(true)}
                        onMouseLeave={() => setDropDownMenu(false)}>
                        <a href='#'>FAQ</a>
                        <a href='#'>Contact Us</a>
                    </div>
                )}
                <a href='#' className='hover-orange'>
                    Pricing
                </a>
                <a href='#' className='hover-pink'>
                    Demo
                </a>
            </div>

            <div className='nav-right'>
                <a href='#' className='hover-pink'>
                    7 days Free Trial
                </a>
                <a href='#' className='hover-blue'>
                    Sign In <OffsetLeft />
                </a>
            </div>
        </nav>
    );
}
