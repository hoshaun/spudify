import React from "react";

import 'components/Logout.scss';
import Button from "./Button";
import { useCookies } from "react-cookie";

export default function Logout(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['username'])

  const logout = function() {
    return removeCookie('username');
  };

  return (
    <div className="welcome">
      <div className="welcome-message">Welcome, { cookies.username }!</div>
      <Button confirm onClick={() => logout()}>Logout</Button> 
    </div>
  );
}