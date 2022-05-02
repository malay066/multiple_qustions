import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Exam() {
  const sty={
    border:'1px solid black',
    padding:'10px',
    borderRadius:'10px',
    width:'500px',
    height:'150px',
    overflow:'auto'
  }
  const [contain_qus, setContain_qus] = useState([])
  const [contain_opt,setContain_opt] = useState([])
  const[value,setValue]=useState([])
  const [count,setCount]= useState(0)
  useEffect(() => {
    axios.get('http://localhost/demo.json')
      .then(res => {
        setContain_qus(res.data.questions)
        setContain_opt(res.data.option)
        setValue(res.data.values)
        // console.log(res.data.option[0].fOpt)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  const qus = contain_qus.map(con => <p key={con.q}>{con.q}</p>)
  const first_opt=contain_opt.map(con=> <p key={con.fOpt}>{con.fOpt}</p>)
  const second_opt=contain_opt.map(con=> <p key={con.sOpt}>{con.sOpt}</p>)
  const third_opt=contain_opt.map(con=> <p key={con.tOpt}>{con.tOpt}</p>)
  const f_val=value.map(con=><p key={con.fOpt_val}>{con.fOpt_val}</p>)
  const s_val=value.map(con=><p key={con.sOpt_val}>{con.sOpt_val}</p>)
  const t_val=value.map(con=><p key={con.tOpt_val}>{con.tOpt_val}</p>)
  console.log(qus[count])
  const handleNext = ()=>{
    setCount(prevCount=>prevCount+1)
    let val=document.querySelector('input[name="answer"]:checked')
    console.log(val.value)
  }
  const handlePrev = ()=>{
    setCount(prevCount=>prevCount-1)
  }
  return (
    <div className="container" style={sty}>
      {count<qus.length?<div>
        <div style={{height:'50px'}}>{qus[count]}</div>
        <div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="answer" id="inlineRadio1" onChange={(e)=>e.target.value} value={f_val[count]} />
            <label className="form-check-label" htmlFor="inlineRadio1">{first_opt[count]}</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="answer" id="inlineRadio2" onChange={(e)=>e.target.value} value="2" />
            <label className="form-check-label" htmlFor="inlineRadio2">{second_opt[count]}</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="answer" id="inlineRadio3" onChange={(e)=>e.target.value} value={t_val[count]} />
            <label className="form-check-label" htmlFor="inlineRadio3">{third_opt[count]}</label>
          </div>
        </div>
        <div>
        <button type="button" className="btn btn-primary" onClick={handleNext} style={{float:'right'}}>Next</button>
        </div>
        {count>0?<div>
        <button type="button" className="btn btn-primary" onClick={handlePrev} style={{float:'left'}}>Prev</button>
        </div>:''}
      </div>:"finish"}
      
    </div>
  )
}


