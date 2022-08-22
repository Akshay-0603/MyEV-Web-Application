import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Express } from 'express' 
import App from './App'

ReactDOM.render('/',(req,res)=>{
  res.send("hello world from the");
}
)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
