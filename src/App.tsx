import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NetworkPackages from "./components/NetworkPackages";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NetworkPackages />;

  
    </>
  )
}

export default App
