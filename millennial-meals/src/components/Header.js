import { useState, useRef, useEffect } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { NavLink, useLocation } from 'react-router-dom';
import MillenialMeals from '../app/assets/img/logo.jpg';
// import UserLoginForm from '../features/user/UserLoginForm';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [recipesDropdownOpen, setRecipesDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const closeTimeout = useRef();
    const recipesCloseTimeout = useRef();
    const location = useLocation();
    const recipesLinkRef = useRef();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseEnter = () => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setDropdownOpen(true);
    };
    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
    };

    const handleRecipesMouseEnter = () => {
        if (recipesCloseTimeout.current) clearTimeout(recipesCloseTimeout.current);
        setRecipesDropdownOpen(true);
    };
    const handleRecipesMouseLeave = () => {
        recipesCloseTimeout.current = setTimeout(() => setRecipesDropdownOpen(false), 150);
    };

    // Helper to check if a dropdown item is active
    const isActiveDropdown = (path) => location.pathname === path;

    return (
        <>
            <style>
                {`
                .nav-link.active-custom:not(.home-link), .dropdown-item.active-custom {
                    font-weight: normal;
                    color: #111 !important;
                    background: #e9ecef !important;
                }
                .dropdown-item:hover {
                    background: #e9ecef !important;
                    color: #212529 !important;
                }
                `}
            </style>
            <Navbar
                sticky='top'
                expand='md'
                className="d-flex align-items-center"
                
            >
                <NavbarBrand className='ms-2 d-flex align-items-center' href='/'>
                    <img
                        src={MillenialMeals}
                        alt='Millenial Meals Logo'
                        className='me-3'
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                    <h1 className='mt-1 mb-0 fs-3'>Millenial Meals</h1>
                </NavbarBrand>
                <Nav className='ms-auto d-flex align-items-center' navbar>
                    <NavItem>
                        <NavLink
                            className={({ isActive }) =>
                                'nav-link' + (isActive ? ' active-custom home-link' : '')
                            }
                            to='/'
                            end
                        >
                            <i className='fa fa-home fa-lg' /> Home
                        </NavLink>
                    </NavItem>
                    {!isMobile ? (
                        <>
                            <NavItem>
                                <NavLink
                                    className={({ isActive }) =>
                                        'nav-link' + (isActiveDropdown('/restaurants') ? ' active-custom' : '')
                                    }
                                    to='/restaurants'
                                    style={{ paddingLeft: '10px' }}
                                >
                                    <i className='fa fa-cutlery fa-lg' /> Dining Out
                                </NavLink>
                            </NavItem>
                            <NavItem
                                onMouseEnter={handleRecipesMouseEnter}
                                onMouseLeave={handleRecipesMouseLeave}
                                style={{ position: 'relative' }}
                            >
                                <NavLink
                                    ref={recipesLinkRef}
                                    className={({ isActive }) =>
                                        'nav-link' + (isActiveDropdown('/recipes') ? ' active-custom' : '')
                                    }
                                    to='/recipes'
                                    style={{ paddingLeft: '10px', cursor: 'pointer' }}
                                >
                                    <i className='fa fa-book fa-lg' /> Dining In
                                </NavLink>
                                {recipesDropdownOpen && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            transform: 'translateX(-28.5%)',
                                            background: '#fff',
                                            minWidth: '130px',
                                            maxWidth: '200px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                            zIndex: 3000,
                                            borderRadius: '0 0 0.25rem 0.25rem',
                                            padding: '0.5rem 0',
                                            whiteSpace: 'nowrap',
                                            textAlign: 'right'
                                        }}
                                        onMouseEnter={handleRecipesMouseEnter}
                                        onMouseLeave={handleRecipesMouseLeave}
                                    >
                                        <a className="dropdown-item" href="/recipes" style={{ paddingRight: '10px' }}>All Recipes</a>
                                        <a className="dropdown-item" href="/recipes#poultry" style={{ paddingRight: '10px' }}>Poultry</a>
                                        <a className="dropdown-item" href="/recipes#beef" style={{ paddingRight: '10px' }}>Beef</a>
                                        <a className="dropdown-item" href="/recipes#pork" style={{ paddingRight: '10px' }}>Pork</a>
                                        <a className="dropdown-item" href="/recipes#plant-based" style={{ paddingRight: '10px' }}>Plant-Based</a>
                                    </div>
                                )}
                            </NavItem>
                        </>
                    ) : (
                        <div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{ position: 'relative' }}
                        >
                            <Dropdown
                                nav
                                inNavbar
                                isOpen={dropdownOpen}
                                toggle={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <DropdownToggle nav caret>
                                    Explore
                                </DropdownToggle>
                                <DropdownMenu
                                    className="dropdown-menu-end position-absolute"
                                    style={{ right: 0, left: 'auto', zIndex: 2000, paddingLeft: 0 }}
                                >
                                    <DropdownItem
                                        tag={NavLink}
                                        to='/restaurants'
                                        className={isActiveDropdown('/restaurants') ? 'active-custom' : ''}
                                        style={{ paddingLeft: '10px' }}
                                    >
                                        <i className='fa fa-cutlery fa-lg' /> Dining Out
                                    </DropdownItem>
                                    <div
                                        onMouseEnter={handleRecipesMouseEnter}
                                        onMouseLeave={handleRecipesMouseLeave}
                                        style={{ position: 'relative', margin: 0, padding: 0 }}
                                    >
                                        <Dropdown
                                            nav
                                            inNavbar
                                            isOpen={recipesDropdownOpen}
                                            toggle={() => setRecipesDropdownOpen(!recipesDropdownOpen)}
                                        >
                                            <DropdownToggle
                                                nav
                                                caret
                                                tag={NavLink}
                                                to="/recipes"
                                                className={isActiveDropdown('/recipes') ? 'active-custom' : ''}
                                                style={{ cursor: 'pointer', paddingLeft: 10 }}
                                            >
                                                <i className='fa fa-book fa-lg' /> Dining In
                                            </DropdownToggle>
                                            <DropdownMenu
                                                className="dropdown-menu-end position-absolute"
                                                style={{ right: 0, left: 'auto', zIndex: 2100 }}
                                            >
                                                <DropdownItem href="#breakfast">All Recipes</DropdownItem>
                                                <DropdownItem href="#lunch">Poultry</DropdownItem>
                                                <DropdownItem href="#dinner">Beef</DropdownItem>
                                                <DropdownItem href="#dinner">Pork</DropdownItem>
                                                <DropdownItem href="#dinner">Plant-Based</DropdownItem>
                                                
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    )}
                </Nav>
                {/* <UserLoginForm /> */}
            </Navbar>
        </>
    );
};

export default Header;