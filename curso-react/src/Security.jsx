import React from 'react'
import CryptoJS from "crypto-js";

export const decrypt = (hash, key) => {
    return CryptoJS.AES.decrypt(hash, key).toString(CryptoJS.enc.Utf8);
}

const encrypt = (text,key) => {
    return CryptoJS.AES.encrypt(text, key).toString();
}


function Security() {
  return (
    <div>
      
    </div>
  )
}

export default Security
