import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password,setPassword] = useState("");
  const [length,setLength] = useState(8);
  const [number,setNumber] = useState(false);
  const [specialCharacters,setSpecialCharacters] = useState(false);

  //ref
  const passwordRef = useRef()
  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password])
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number)str+="0123456789"
    if(specialCharacters)str+="!@#$%^&*(){}[]"
    for(let i=0;i<length;i++){
      let idx = Math.floor(Math.random()*str.length)
      pass+=str[idx]
    }
    setPassword(pass)
  },[length,number,specialCharacters,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,number,specialCharacters,passwordGenerator])
  return (
    <div className='bg-slate-700 rounded-xl h-56 w-auto'>
      <h1 className='font-bold my-3 px-5'>Password Generator</h1>
      <input className='h-12 w-64 px-2 rounded-xl w-80 bg-gray my-5' type="text" placeholder='Password' value={password} ref={passwordRef}/>
      <button onClick={copyPassword}>Copy</button>
      <br />
      <input className='mx-2' type="range" minLength={8} maxLength={100} value={length} onChange={(e)=>{
        setLength(e.target.value)
      }}/>
      <label>Length : {length}</label>
      <input className='mx-2' type="checkbox" name="number" defaultChecked={number} onChange={()=>{
        setNumber(prev=>!prev)
      }}/>
      <label htmlFor="number">Number</label>
      <input className='mx-2' type="checkbox" name="special" defaultChecked={specialCharacters} onChange={()=>{
        setSpecialCharacters(prev=>!prev)
      }}/>
      <label htmlFor="">Special</label>
    </div>
  )
}

export default App
