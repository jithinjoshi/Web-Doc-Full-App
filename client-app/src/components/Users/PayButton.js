import React, { useState } from 'react'
import { paymentGate } from '../../Helpers/userHelper'

const PayButton = ({items}) => {
    const [paymentDetails,usePaymentDetails] = useState();
    const handleClick = ()=>{
        
        paymentGate(items).then((payment)=>{
            if(payment.data.URL){
                window.location.href = payment.data.URL;
            }
        }).catch((err)=>{
            return err;
        })
        
    }
  return (
    <div onClick={handleClick}>Pay</div>
  )
}

export default PayButton