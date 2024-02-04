// Import necessary components from 'next/head'
import Head from "next/head";

// TODO: Implement MetaData per NextJS guidelines...
{
  /* <Head>
<meta charSet="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title >AgentX.ai Privacy Policy</title>
</Head> */
}

// Define the PrivacyPolicy component
export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col c9 doc- bg-black text-white w-full h-full pl-4 overflow-y-scroll">
      <p className="c11">
        <span
          className=" flexbg-red w-full text-center"
          style={{ fontSize: 24, fontWeight: "bold" }}
        >
          AgentX.ai Privacy Policy
        </span>
      </p>
      <br />
      <p className="c0">
        <span className="c7" style={{ fontSize: 16, fontWeight: "bold" }}>
          Effective Date: Jan 17, 2024 [Mamba Szn]
        </span>
      </p>
      <br />
      <br />

      <p className="c2">
        Welcome to AgentX.ai, a pioneering AI-powered real estate agent platform. We are
        headquartered in San Francisco, CA, and provide our services across the United States and
        Canada. This Privacy Policy explains how we collect, use, protect, and share your
        information.
      </p>

      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: "bold" }}>
          1. Introduction
        </span>
      </p>

      <p className="c0">
        <span className="c2">
          At AgentX.ai, we respect your privacy and are committed to protecting your personal data.
          This policy applies to all information collected through our website, mobile application,
          and AI-powered communication tools.
          <br /> <br />
        </span>
      </p>

      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: "bold" }}>
          2. Information Collection
        </span>
      </p>

      <p className="c0">
        <span className="c2">
          We collect the following types of information:
          <br />
          <br />
        </span>
      </p>

      <div className="prose pl-5">
        <ul className="list-disc">
          <li>
            Agent Personality Data: To create a unique, personalized experience for real estate
            agents.
          </li>
          <li>Customer Data: Information provided by or about our users clients.</li>
          <li>Agent Data: Information about our users, the real estate agents.</li>
        </ul>
        <p>
          These data points help us tailor experiences for both agents and their customers and
          improve our AI-driven processes. We do not share this data with any third parties.
        </p>
      </div>

      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: "bold" }}>
          3. User Intraction
        </span>
      </p>

      <p className="c0 pl-5">
        <span className="c2">
          Our users interact with our services primarily through an app, SMS, and our website. Our
          services are designed for users in the 30 to 55 age range.
        </span>
      </p>

      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: "bold" }}>
          4. Data Security
        </span>
      </p>

      <p className="c0 pl-5">
        <span className="c2">
          We employ industry-standard security measures to ensure the protection of your data
          against unauthorized access and misuse.
        </span>
      </p>

      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: "bold" }}>
          5. Compliance Requirements
        </span>
      </p>

      <p className="c0">
        <span className="c2">
          Given our operations in the United States and Canada, we adhere to:
          <br />
          <br />
        </span>
      </p>

      <div className="prose pl-5">
        <ul className="list-disc">
          <li>The California Consumer Privacy Act (CCPA).</li>
          <p>
            The Personal Information Protection and Electronic Documents Act (PIPEDA) in Canada.
          </p>
          <li>These laws provide users with rights regarding their personal data.</li>
        </ul>
      </div>

      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: "bold" }}>
          6. Cookies and Tracking Technologies
        </span>
      </p>

      <p className="c0 pl-5">
        <span className="c2">
          We use standard cookies and similar technologies to enhance user experience and analyze
          platform usage.
          <br />
          <br />
        </span>
      </p>

      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: "bold" }}>
          7. Data Retention and Deletion
        </span>
      </p>

      <p className="c0 pl-5">
        <span className="c2">
          We adhere to industry standards for data retention and deletion. Users have the right to
          request the deletion of their personal data.
          <br />
          <br />
        </span>
      </p>

      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: "bold" }}>
          8. International Data Transfer
        </span>
      </p>

      <p className="c0 pl-5">
        <span className="c2">
          Our data operations are confined to the United States and Canada, ensuring data remains
          within these borders.
          <br />
          <br />
        </span>
      </p>

      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: "bold" }}>
          9. User Rights
        </span>
      </p>

      <p className="c0 pl-5">
        <span className="c2">
          Users have the right to access, correct, and delete their personal data directly from the
          app they(&apos;)re using or by requesting through our contact page on{" "}
          <a style={{ color: "blue" }} href="https://www.myagentx.com/">
            AgentX.ai Contact Page
          </a>
          .
          <br />
        </span>
      </p>

      <br />
      <p className="c1">
        <span className="c2" style={{ fontSize: 14, fontWeight: "bold" }}>
          10. Contact Information
        </span>
      </p>

      <p className="c0 pl-5">
        <span className="c2">
          For any privacy-related inquiries or concerns, please reach out to us via our website at{" "}
          <a style={{ color: "blue" }} href="https://www.myagentx.com/">
            AgentX.ai Contact Page
          </a>
          .
          <br />
        </span>
      </p>

      <p className="c1">
        <span className="c2">Changes to This Policy</span>
      </p>

      <p className="c0">
        <span className="c2">
          We may update this policy periodically. Significant changes will be communicated through
          our platform or via email.
        </span>
      </p>

      <p className="c1 c10">
        <span className="c12"></span>
      </p>
    </div>
  );
}
