
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const navigate = useNavigate()
// const dispatch = useDispatch();
// new data --------------------------------------------------------------------------------------------//
const pf  = 'http://localhost:9080/images/'
const [ShowConfimation , setShowConfirmation] = useState(false)
const user = useSelector((state)=>state.user.user)

const  handleClicks = () =>{
setShowConfirmation(true)
}
const handleAddPost = () =>{
(user?.tokenObject)? navigate('/add_post') : toast.error('Please Login to continue')
}

const conformLogout = ()=>{
localStorage.clear()
setShowConfirmation(false)
window.location.href='/'
}
const cancleOperation = () =>{
setShowConfirmation(false)
}



    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

  return (
    <>
        <nav className="navbar">
            <div className="navbar-container" style={user?.tokenObject ? {alignItems:'baseline'} : {alignItems:'center'}}>
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    BlogOS <i className='fab fa-typo3'></i>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/all_post' className='nav-links' onClick={closeMobileMenu}>
                     Posts
                        </Link>
                    </li>
                                    
                    <li className='nav-item' onClick={closeMobileMenu}>
                      
                      <span className='nav-links' onClick={handleAddPost}> Add Post </span>
                        
                    </li>
                  
                    {user &&   <li className='nav-item'  onClick={handleClicks}>
                        <Link  className='nav-links' onClick={closeMobileMenu}>
                     LOGOUT
                        </Link>
                    </li>}
        {user ? (
          <Link  className='Logo' to={`/settings/${user?.tokenObject?.id}`} onClick={closeMobileMenu}>
        {
   (
    <img
      className="user"
// src='/images/user.png'
src={(user?.tokenObject?.profilePic === "") ? '/images/user.png' : user?.tokenObject?.profilePic}
      alt=""
    />
  ) 
}

          </Link>
        ) : (
            <> 
            <li className="nav-item">
              <Link className="nav-links" to="/login" onClick={closeMobileMenu}>
                LOGIN
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-links" to="/register" onClick={closeMobileMenu}>
                SignUp
              </Link>
            </li>
            </>
        )}
        {
          ShowConfimation &&  
           ( <div className="conformContainer"> 
            <div className="subContainer">
            <span className="rightCross" onClick={cancleOperation}>❌</span>
              <p className="popUp">Are you sure you want to Logout</p>
            <button onClick={conformLogout}>Yes</button>
            <button onClick={cancleOperation} style={{marginLeft:"15px"}}>No</button>
            </div>
             </div>
           )
        }
           
                </ul>
               
            </div>    
        </nav>
    </>
  )
}

export default Navbar;

