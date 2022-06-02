import React from 'react'
import './HowTo.css'

function HowTo() {
  return (
    <div className='HowTo'>
    <h1>How to Use</h1>

    <p>Welcome to DivvyUp, 
      a spending management application focused on making splitting purchases 
      among groups of people easier. Users will be able to add to a joint spending 
      list and thereafter split the cost of the purchase by each individual.</p>

      <p>DivvyUp will be used in settings where there is one person making
         a purchase for a group of people. Prior to purchase, individuals can add
          items to a joint purchase list. Users added to the shopping trip can choose
           what they wish to pay for within the joint purchase list and add their names to items. 
           At the end of the trip, the person handling the transaction will input the total
          price for each item. The application will then calculate the subtotal cost for each person on the shopping trip. 
          This allows the one person making the purchases to easily calculate the subtotal and charge others.</p>

          <p>People living along with others will easily benefit from using this application because oftentimes the payment for grocery trips 
            is made by one person. Not everyone will necessarily want every item that is bought. After a shopping trip, it is hard to keep track of who “bought” what. 
            Currently, existing solutions like Venmo, split pay, etc rely on the user to manually calculate the cost of splitting bills. This app aims to automate this process.
            We as developers want to build this application because as students we often deal with the struggle of splitting costs after group purchases. 
            The process is tedious and time-consuming and we find that many of our peers encounter the same problem. Therefore, we wanted 
            to build this app to help alleviate this issue for ourselves and for others.

</p>

    </div>
  )
}

export default HowTo
