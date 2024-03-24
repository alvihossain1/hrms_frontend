"use client"
import React from 'react'
var bcrypt = require('bcryptjs');

export default function AssignTask() {

  async function submitForm(e){
    e.preventDefault();
    const pass = "12345";
    var salt = bcrypt.genSaltSync(12)
    var hash_password = await bcrypt.hashSync(pass, salt);
    console.log(hash_password);
    const take = await bcrypt.compareSync("12345", hash_password);
    console.log(take)
    
  }


  return (
    <div>
      <button onClick={(e) => submitForm(e)} className='px-2 py-1 border-2 border-slate-500'>Click</button>
    </div>
  )
}
