import React, { useEffect } from "react";
import { auth, provider } from "../../config";
import buttonStyle from "./signInButton.module.css";
import { signInWithPopup } from "firebase/auth";
import googleLogoWhite from "../../assets/images/google_black_logo_icon_147125.png";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const SignInButton = () => {
  // const navigate = useNavigate();
  // const signInWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const token = result?.credential?.accessToken;
  //     const userId = result?.user?.uid;
  //     navigate("/terminal")
  //     // Store the token and user ID in localStorage or your preferred storage method

  //     // Navigate to the home page
  //   } catch (error) {
  //     console.error("Error occurred during sign in:", error);
  //     // Handle the error as desired
  //   }
  // };

  const [user] = useAuthState(auth);
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className={buttonStyle.btnbody}>
      <div onClick={signInWithGoogle} className={buttonStyle.googleBtn}>
        <div className={buttonStyle.imageALign}>
          <img className={buttonStyle.image} src={googleLogoWhite} alt="G" />
        </div>
        <h4 className={buttonStyle.text}>Continue with Google</h4>
      </div>
    </div>
  );
};

export default SignInButton;
