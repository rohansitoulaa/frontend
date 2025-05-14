const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center dark:text-white">
        Terms and Conditions
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to Paper-Talk. By accessing or using our platform, you agree
          to be bound by these Terms and Conditions. If you do not agree with
          any part of these terms, please refrain from using the service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Author Accounts</h2>
        <p>
          To submit content, users must register as authors through our 3-step
          signup process. Each account must be used by a single individual only.
          You are responsible for maintaining the confidentiality of your login
          credentials.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. Content Submission</h2>
        <p>
          Authors can upload news articles either as PDF files or through the
          built-in rich text editor. All submissions are subject to review and
          approval by the admin team. We reserve the right to reject or remove
          any content that violates our editorial standards or policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Content Ownership</h2>
        <p>
          Authors retain ownership of their submitted content. However, by
          submitting an article, you grant Paper-Talk a non-exclusive license to
          publish, distribute, and display the content on our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          5. Prohibited Activities
        </h2>
        <ul className="list-disc pl-6">
          <li>Submitting plagiarized or misleading content</li>
          <li>Uploading viruses, malware, or harmful code</li>
          <li>Attempting to bypass article approval mechanisms</li>
          <li>Harassing, impersonating, or exploiting others</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">6. Account Termination</h2>
        <p>
          We reserve the right to suspend or terminate your author account at
          our discretion if we detect a violation of these terms or misuse of
          the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          7. Disclaimer of Liability
        </h2>
        <p>
          While we strive to maintain a reliable and secure service, Paper-Talk
          is provided “as-is” without warranties of any kind. We are not liable
          for any damages resulting from use of the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">8. Changes to Terms</h2>
        <p>
          We may update these Terms and Conditions from time to time. Continued
          use of Paper-Talk after any such changes constitutes your acceptance
          of the new terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
        <p>
          For questions or concerns about these Terms, please reach out to us at{" "}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=support@papertalk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800"
          >
            support@papertalk.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default Terms;
