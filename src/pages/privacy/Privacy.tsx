const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center dark:text-white">
        Privacy Policy
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>
          At Paper-Talk, your privacy is important to us. This Privacy Policy
          explains how we collect, use, and protect your information when you
          use our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <ul className="list-disc pl-6">
          <li>
            <strong>Account Information:</strong> When you register as an
            author, we collect your name, email address, and other form data
            required during the 3-step signup process.
          </li>
          <li>
            <strong>Content Data:</strong> We store the articles you upload in
            PDF or rich-text format.
          </li>
          <li>
            <strong>Technical Data:</strong> We may collect your IP address,
            browser type, and usage behavior to improve our service and
            security.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Data</h2>
        <ul className="list-disc pl-6">
          <li>To manage your author account</li>
          <li>To review, approve, and publish submitted articles</li>
          <li>To communicate with you about your account or submissions</li>
          <li>To monitor and improve platform functionality and security</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Sharing Your Data</h2>
        <p>
          We do not sell or rent your personal information. Your data may be
          shared only with authorized admin personnel for moderation or system
          operations, and only as necessary.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
        <p>
          We take appropriate technical and organizational measures to protect
          your personal information from unauthorized access, misuse, or
          disclosure. However, no platform can guarantee complete security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">6. Cookies and Tracking</h2>
        <p>
          Paper-Talk may use cookies or similar technologies to enhance user
          experience and gather analytical data. You can disable cookies in your
          browser settings if preferred.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">7. Your Rights</h2>
        <p>
          You have the right to request access to your personal data, correction
          of inaccuracies, or deletion of your account. Contact us to make such
          a request.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          8. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically. Any changes will be
          posted on this page with an updated revision date.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">9. Contact Information</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, feel
          free to reach out at{" "}
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

export default Privacy;
