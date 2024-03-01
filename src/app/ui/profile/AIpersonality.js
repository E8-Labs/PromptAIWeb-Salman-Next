import React from 'react'
import { } from './styles.css'


const AIpersonality = () => {
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
                    <input type="email" name="" placeholder="Email Address" />
                    <button className="custom-btn-2">Join the waitlist</button>
                  </div>
                </div>
                
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIpersonality
