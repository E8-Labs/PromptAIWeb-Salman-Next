// Import necessary components from 'next/head'
import Head from 'next/head';
import Link from 'next/link';

// Define the PrivacyPolicy component
const PrivacyPolicy = () => {
  // Return the JSX for the component
  return (
    <div className="flex flex-col c9 doc- bg-black text-white w-full h-full pl-4 overflow-y-scroll">
      {/* Set up the head of the document with metadata */}
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title >AgentX.ai Terms and Conditions</title>
        {/* Add any additional styles or meta tags here */}
      </Head>

      {/* Privacy Policy content */}
      <p className="c11">
        <span className=' flexbg-red w-full text-center' style={{ fontSize: 24, fontWeight: 'bold' }}>AgentX.ai Terms and Conditions</span>
      </p>
      <br />
      <p className="c0">
        <span className="c7" style={{ fontSize: 16, fontWeight: 'bold' }}>Effective Date: Jan 17, 2024 [Mamba Szn]</span>
      </p>
      <br />
      <br />

      <p>Welcome to AgentX.ai</p><br /><br />
      <p className="c2">
      These Terms and Conditions govern your use of the AgentX.ai website, mobile application, and AI-powered services (collectively, the Service). By accessing or using the Service, you agree to be bound by these Terms and Conditions.
      </p>

      {/* ... (Continue adding the rest of your HTML content here) */}
      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: 'bold' }}>1. Use of the Service</span>
      </p>

      <div class="prose pl-5">
        <ul class="list-disc">
          <li>Eligibility: The Service is intended for users who are 18 years of age or older.</li>
          <li>Account Registration: You must register for an account to access certain features of the Service. Keep your account information confidential.</li>
          <li>Permitted Use: You agree to use the Service lawfully and respect the rights of others.</li>
        </ul>
        {/* <p>These data points help us tailor experiences for both agents and their customers and improve our AI-driven processes. We do not share this data with any third parties.</p> */}
      </div>

      {/* ... (Continue adding the rest of your HTML content here) */}
      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: 'bold' }}>2. Intellectual Property Rights</span>
      </p>

      

      <div class="prose pl-5">
        <ul class="list-disc">
          <li>All rights in the Service and its content are owned by or licensed to AgentX.ai. Personal and professional use is permitted, but no reproduction or commercial use without our consent.</li>
          
        </ul>
      </div>




      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: 'bold' }}>3. Content and Conduct</span>
      </p>

      <div class="prose pl-5">
        <ul class="list-disc">
          <li>User-Generated Content: Youre responsible for your content on the Service.</li>
          <li>Prohibited Conduct: No illegal or unauthorized use of the Service. Harassment and offensive behavior are prohibited.</li>
        </ul>
      </div>


      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: 'bold' }}>4. Privacy and Data Protection</span>
      </p>

      <div class="prose pl-5">
        <ul class="list-disc">
          <li>Our Privacy Policy outlines our data practices.</li>
          {/* <li>Prohibited Conduct: No illegal or unauthorized use of the Service. Harassment and offensive behavior are prohibited.</li> */}
        </ul>
      </div>



      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: 'bold' }}>5. Service Subscription</span>
      </p>

      <div class="prose pl-5">
        <ul class="list-disc">
          <li>Free Trial: New users may access a free 14-day trial. Trial terms are subject to change.</li>
          <li>Paid Subscription: Continued use after the trial requires a paid subscription. Details of plans and payment terms are available on our website or through the app.</li>
          <li>Cancellation: You can cancel your subscription in accordance with our cancellation policy.</li>
        </ul>

      </div>


      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: 'bold' }}>6. Disclaimer of Warranties</span>
      </p>

      <div class="prose pl-5">
        <ul class="list-disc">
          <li>The Service is provided without warranties, express or implied.</li>
        </ul>

      </div>




      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: 'bold' }}>7. Limitation of Liability</span>
      </p>

      <div class="prose pl-5">
        <ul class="list-disc">
          <li>AgentX.ai is not liable for indirect or incidental damages related to your use of the Service.</li>
        </ul>
      </div>



      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: 'bold' }}>8. Indemnification</span>
      </p>

      <div class="prose pl-5">
        <ul class="list-disc">
          <li>You agree to indemnify AgentX.ai against claims related to your use of the Service.</li>
        </ul>
      </div>



      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: 'bold' }}>9. Changes to the Service and Terms
        </span>
      </p>

      <div class="prose pl-5">
        <ul class="list-disc">
          <li>We may modify the Service and these Terms. Continued use after changes means acceptance of the new terms.</li>
        </ul>
      </div>



      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: 'bold' }}>10. Governing Law
        </span>
      </p>

      <div class="prose pl-5">
        <ul class="list-disc">
          <li>Governed by California law. Disputes fall under Californias jurisdiction.</li>
        </ul>
      </div>



      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: 'bold' }}>11. Contact Information
        </span>
      </p>

      <div class="prose pl-5">
        <ul class="list-disc">
          <li>Questions about these Terms? Contact us through our website at <Link style={{ color: 'blue' }} href="https://www.myagentx.com/">AgentX.ai Contact Page</Link></li>
        </ul>
      </div>



      <p className="c1">
        <span className="c2">Conclusion</span>
      </p>

      <div class="prose pl-5">
        <ul class="list-disc">
          <li>Using our Service means you understand and agree to these Terms and Conditions.</li>
        </ul>
      </div>

      <p className="c1 c10">
        <span className="c12"></span>
      </p>
      <br /><br /><br /><br /><br />
    </div>
  );
};

// Export the PrivacyPolicy component
export default PrivacyPolicy;
