import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

const Nav = () => {
  const initialUserData = localStorage.getItem('userData') ? 
  JSON.parse(localStorage.getItem('userData')) : {};

  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate(); //검색 시 페이지 이동을 위한 것
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => { //user 정보 보내주기
      if (user) { // 유저 정보가 있다면
        if (pathname === "/") {
          navigate('/main');
        }
      } else {
        navigate('/');
      }
    })
  }, [auth, navigate, pathname])
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const handleScroll = () => {
    if(window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value); //검색창에 타이핑된 단어
    navigate(`/search?q=${e.target.value}`); //검색 시에 `` 안에 들어간 곳으로 페이지 이동
  }

  //Google Login Popup 뜨는 기능
  const handleAuth = () => {
    signInWithPopup(auth, provider) // user 정보 보내기
    .then(result => {
      setUserData(result.user); //user 정보 받기
      localStorage.setItem('userData', JSON.stringify(result.user));
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUserData({});
      navigate('/');
    })
    .catch(error => { console.log(error); });
  }

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/main")}
        />
      </Logo>
      {pathname === '/' ? 
        (<Login onClick={handleAuth}>Login</Login>) : 
        <>
          <Input
            value={searchValue}
            onChange={handleChange} 
            className='nav__input' 
            placeholder='검색해주세요'
          />
          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={handleSignOut}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      }
    </NavWrapper>
  )
}

export default Nav;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19)
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius:  4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`

const Login = styled.a`
  background-color: rgba(0, 0, 0, .6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: .2s ease;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show ? "#090b13" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`