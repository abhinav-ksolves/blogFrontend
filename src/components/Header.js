import React, { useState, useLayoutEffect, useRef, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { registerUser, loginUser, logoutUser } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Msg from './Msg';
import { UserContext } from '../App';
const Header = () => {
    const { Loading, msg, userInfo } = useContext(UserContext);
    const history = useHistory();
    const [isRegisterModelOpen, setIsRegisterModelOpen] = useState(false);
    const [isLoginModelOpen, setIsLoginModelOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const userRegister = useSelector(state => state.userRegister);
    const { RegisterLoading, RegisterMsg } = userRegister;


    const registerEmailRef = useRef(null);
    const usernameRef = useRef(null);
    const registerPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const loginEmailRef = useRef(null);
    const loginPasswordRef = useRef(null);

    const dispatch = useDispatch();
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser({
            username: usernameRef.current.value, email: registerEmailRef.current.value,
            password: registerPasswordRef.current.value, confirmPassword: confirmPasswordRef.current.value
        }));

    }
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email: loginEmailRef.current.value, password: loginPasswordRef.current.value }));
    }


    useLayoutEffect(() => {
        window.addEventListener('resize', () =>
            setWindowSize(window.innerWidth));

    });
    const handleSideBar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    const handleLogout = () => {

        dispatch(logoutUser);
        history.push('/');
    }

    useEffect(() => {
        if (userInfo) {
            setIsLoginModelOpen(false);
        }
        else {
            setIsLoginModelOpen(true);
        }
    }, [userInfo])

    return (
        <header>
            <nav id="navbar">
                <ul>
                    <Link to="/"> <li id="blogTitle">B</li></Link>
                    {windowSize > 400 && <span>
                        {
                            userInfo ?
                                <>
                                    {userInfo.isAdmin ? <><Link to="/admin/managePosts"><li>Manage posts</li></Link></> : <><Link to="/createPost"><li>createPost</li></Link><Link to="/yourPosts"><li>your posts</li></Link></>}
                                    <li onClick={handleLogout}>Logout</li>
                                </>
                                :
                                <>
                                    <li onClick={() => { setIsLoginModelOpen(false); setIsRegisterModelOpen(true) }}>Register</li>
                                    <li onClick={() => { setIsRegisterModelOpen(false); setIsLoginModelOpen(true) }}>Login</li>
                                </>
                        }
                    </span>
                    }
                </ul>
                {windowSize > 400 ?
                    <ul>
                        <li>📞 +91 8318561452</li>
                        <li>✉  xyz123@gmail.com</li>
                    </ul>
                    :

                    <span id="sideBarOpener" onClick={handleSideBar}>
                        <hr /><hr />
                    </span>

                }
            </nav>
            <aside style={{ display: (isSidebarOpen && windowSize <= 400) && "block" }}>
                <button type="button" className="close" onClick={handleSideBar}>x</button> <br /> <br />
                <ul>
                    <li>📞 +91 8318561452</li>
                    <li>✉  xyz123@gmail.com</li>
                    <hr />
                    {
                        userInfo ?
                            <>
                                {userInfo.isAdmin ? <><Link to="/admin/managePosts"><li>Manage posts</li></Link><hr /></> : <><li>createPost</li><hr /><li>your posts</li><hr /></>}
                                <li onClick={handleLogout}>Logout</li>
                            </>
                            :
                            <>
                                <li onClick={() => { setIsLoginModelOpen(false); setIsRegisterModelOpen(true) }}>Register</li>
                                <hr />
                                <li onClick={() => { setIsRegisterModelOpen(false); setIsLoginModelOpen(true) }}>Login</li>
                                <hr />
                            </>
                    }

                </ul>
            </aside>

            <div className="registerLoginForms" style={isRegisterModelOpen ? { display: "block" } : { display: "none" }}>
                <form onSubmit={handleSubmitRegister}>
                    <button type="button" className="close" onClick={() => setIsRegisterModelOpen(false)}>x</button> <br /> <br />
                    <h3>Register</h3>

                    {RegisterLoading ? <h3 className="msg">Wait...</h3> : <Msg msg={RegisterMsg} />}
                    <input type="text" name="username" placeholder="username" ref={usernameRef} autoComplete="off" /> <br />
                    <input type="email" name="email" placeholder="email" ref={registerEmailRef} autoComplete="off" /> <br />
                    <input type="password" name="password" placeholder="password" ref={registerPasswordRef} autoComplete="off" /> <br />
                    <input type="password" name="confirmPassword" placeholder="confirm password" ref={confirmPasswordRef} autoComplete="off" /> <br />
                    <button type="submit">Register</button>
                    <p onClick={() => { setIsRegisterModelOpen(false); setIsLoginModelOpen(true); }}>Already Registerd? Login</p>
                </form>
            </div>

            <div className="registerLoginForms" style={isLoginModelOpen ? { display: "block" } : { display: "none" }}>
                <form onSubmit={handleSubmitLogin}>
                    <button type="button" className="close" onClick={() => setIsLoginModelOpen(false)}>x</button> <br /> <br />

                    <h3>Login</h3>
                    {Loading ? <h3 className="msg">Wait...</h3> : <Msg msg={msg} />}
                    <input type="email" name="email" placeholder="email" ref={loginEmailRef} autoComplete="off" /> <br />
                    <input type="password" name="password" placeholder="password" ref={loginPasswordRef} autoComplete="off" /> <br />
                    <button type="submit">Login</button>
                    <p onClick={() => { setIsLoginModelOpen(false); setIsRegisterModelOpen(true); }}>New User? Register</p>
                </form>
            </div>

        </header>
    )
}

export default Header;