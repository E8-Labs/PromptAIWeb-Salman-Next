import React from 'react'
import { } from './styles.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiPath from '@/app/lib/ApiPath'


const AIpersonality = () => {

const [email, setEmail] = React.useState('')

  const joinwaitlist = ()=> {
    //console.log("Joining waitlist")
    if (email === null || email === "") {
      toast(`Enter valid email`);
      //console.log("Joining waitlist: Invalid email")
      return
  }

  const apiParams = {
      method: "post",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "email": email,
      }),
      redirect: 'follow'
  }
  //console.log("Sending Reset Api")
  fetch(ApiPath.JoinWaitList, apiParams)
      .then(function (res) {
          // //console.log("Response is ", res)
          return res.json();
      }).then(resJson => {
          // this.props.clickEvent("stap6");
          if (resJson.status == true) {
              //console.log(resJson.message)
              toast(resJson.message)

          } else {
              //console.log("Error login ", resJson.message)
              toast(`Error: ${resJson.message}`);
          }
      })
      .catch(error => {
          //console.log("User error " + error)
          toast(`Error: ${error}`);
          // this.setState({ showerror: true ,showerrortype : 2 ,showerrormessage: "Invalid Response" });
          // this.error_handaling();
      });
  }


  return (
    <div className="tab-pane fade overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }} id="pills-AiPersonality" role="tabpanel" aria-labelledby="pills-AiPersonality-tab">
      {/* <div className="step_progress">
        <span></span>
      </div> */}
      <div className="AiPersonality-wrapper">
        <div className="step-wrapper step-container">
          <div className="step">
            <img src="/shadow_shp.png" className="shadow_shp" alt="" />
            <div className="AiPersonality-wrap">
              <div className="AiPersonality-content">
                <h3>Build your AI <br /> Personality</h3>
                <p>Allow your subscribers to directly communicate with an AI version
                  of yourself to ask questions about your niche and topics. </p>
              </div>
              <img src="/animation1.png" className="ai-1" alt="" />
              <img src="/animation2.png" className="ai-2" alt="" />
              <img src="/animation3.png" className="ai-3" alt="" />
              <img src="/animation4.png" className="ai-4" alt="" />
              <img src="/animation5.png" className="ai-5" alt="" />
              <img src="/animation6.png" className="ai-6" alt="" />
              <img src="/animation7.png" className="ai-7" alt="" />
              <img src="/animation8.png" className="ai-8" alt="" />
              <img src="/animation9.png" className="ai-9" alt="" />
              <img src="/animation10.png" className="ai-10" alt="" />
            </div>
            <div className="ai-create-bottom mt-5 text-center join_wait_list">
             
                <div className='flex-col justify-start items-start '>
                  <label>Join the waitlist</label>
                  <div className='flex  justify-center items-center gap-3'>
                    <input type="email" name="" placeholder="Email Address" onChange={(e)=> {
                      //console.log("Input changed", e.target.value)
                      setEmail(e.target.value)
                    }}/>
                    <button className="custom-btn-2" onClick={joinwaitlist}>Join the waitlist</button>
                  </div>
                </div>
                
              
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AIpersonality
