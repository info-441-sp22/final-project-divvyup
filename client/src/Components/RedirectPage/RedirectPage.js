import React,{ useEffect } from 'react'
import {Button} from 'reactstrap'
function RedirectPage() {

    useEffect(() => {
        document.getElementById('testo').click()
      })

  return (
    <div>
        <Button id="testo" href="/api/v1/trips/userStatus" hidden={true} >hello</Button>
    </div>
  )
}

export default RedirectPage