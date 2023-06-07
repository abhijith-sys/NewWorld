import React from 'react'
import style from "./welcomeLoader.module.css"
import { Canvas } from "react-three-fiber";
import Loader from './Loader/Loader';
const WelcomeLoader = () => {
  return (
    <div className={style.wBody}>
      <Canvas>
        <Loader/>
      </Canvas>
    </div>
  )
}

export default WelcomeLoader
