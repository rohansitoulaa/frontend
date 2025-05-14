import FAQsItem from "./FAQsItem";

const FAQs = () => {
  const faqData = [
    {
      title: "What is Paper-Talk?",
      description:
        "Paper-Talk is a modern news platform that allows authors to upload and manage articles efficiently.",
    },
    {
      title: "How do I become an author?",
      description:
        "You can register through our 3-step author signup form. Once approved, you can submit articles.",
    },
    {
      title: "What file types are supported for article uploads?",
      description:
        "We currently support PDF uploads and rich-text article creation directly on the platform.",
    },
    {
      title: "How does the admin panel work?",
      description:
        "Admins can approve or reject submitted articles and manage author permissions.",
    },
    {
      title: "Is there a dark mode?",
      description:
        "Yes, our platform automatically adapts to your system’s dark mode setting.",
    },
  ];

  return (
    <div className="flex w-full items-start justify-center gap-10 px-4">
      {/* FAQs section */}
      <section className="bg-gradient-to-b   p-6 rounded-2xl w-1/2 max-w-2xl mt-10">
        <h2 className="text-4xl font-bold mb-6 dark:text-white">
          Frequently Asked Questions
        </h2>
        {faqData.map((faq, index) => (
          <FAQsItem
            key={index}
            title={faq.title}
            description={faq.description}
          />
        ))}
      </section>

      {/* Right side: Image + mailto */}
      <section className="sticky top-10 bg-gradient-to-b   p-6 rounded-2xl w-1/2 max-w-2xl mt-10 ">
        <div className="flex flex-col items-center">
          <img className="w-250 mb-6" src="faqs.png" alt="FAQs Illustration" />
          <div className="flex gap-2  text-center">
            <p className="text-2xl font-bold mb-6 dark:text-white">
              Need More Help?
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=lowellwolfie@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline text-lg hover:text-blue-800 transition"
            >
              mail us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
