import React from "react";
import Template from "../components/core/HomePage/Registration/Template";

const Login = ({ setIsLoggedIn }) => {
  return (
    <div>
      <Template
        title="Welcome Back"
        desc1="Build skills for today, tomorrow , and beyond."
        desc2="Build skills for today, tomorrow , and beyond."
        image="https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/462804520_1099505735129760_6286062070882968077_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=RaNczmZNWG8Q7kNvgH5tAp4&_nc_ht=scontent.fktm1-1.fna&_nc_gid=A3ifV1G3LwxCg0Bt4CLxLwb&oh=00_AYBV7p89xID8ZYLM-Ydv7I72lpfmMfGMkDh5lFpBBjA4BA&oe=6717DD0A"
        formType="Login"
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};

export default Login;
