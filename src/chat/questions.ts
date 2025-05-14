type QuestionNode = {
  id: string;
  question: string;
  answer?: string;
  children?: QuestionNode[];
  isFinal?: boolean;
};

export const chatbotQuestions: QuestionNode[] = [
  {
    id: "q1",
    question: "What is Paper Talk?",
    answer:
      "Paper-Talk is a news website platform that allows authors to create, upload, and manage articles. It includes features such as author registration, article submission, and approval workflows. Authors can log in, submit their articles, and the platform provides an admin panel where articles can be reviewed and approved.",
    children: [
      {
        id: "q1_1",
        question: "Who can use Paper Talk?",
        answer:
          "Paper-Talk can be used by guests who can read articles without logging in. If a guest logs in, they must register as an author. Only authors can publish articles and news, with admin approval required for publishing.",
      },
      {
        id: "q1_2",
        question: "Is Paper Talk mobile-friendly?",
        answer:
          "Yes, Paper-Talk is fully responsive and optimized for both desktop and mobile devices, ensuring a seamless experience across all platforms.",
      },
    ],
  },
  {
    id: "q2",
    question: "How can I become an author?",
    answer:
      "To become an author on Paper-Talk, you need to complete a 3-step registration form. After registration, your profile will be reviewed by admins. If approved, you will gain permission to publish articles.",
    children: [
      {
        id: "q2_1",
        question: "Do I need approval to write?",
        answer:
          "Yes, after you register as an author, your profile will be reviewed by admins. If approved, you will gain permission to publish articles and contribute to the platform.",
        children: [
          {
            id: "q2_1_1",
            question: "How long does approval take?",
            answer:
              "The approval process may vary, but typically it takes a few hours. You will be notified via email once your profile is approved.",
          },
          {
            id: "q2_1_2",
            question: "Can I edit my profile before approval?",
            answer:
              "Yes, you can edit your profile information before it's approved. However, major changes may reset the review process.",
          },
        ],
      },
      {
        id: "q2_2",
        question: "Is the registration free?",
        answer:
          "Yes, registering as an author on Paper-Talk is completely free of charge.",
      },
    ],
  },
  {
    id: "q3",
    question: "Can you Edit or delete articles as an author?",
    answer:
      "Yes, authors can edit or delete their articles. However, any changes made will require admin approval before being published.",
    children: [
      {
        id: "q3_1",
        question: "What happens after I edit an article?",
        answer:
          "Once you edit an article, it enters the admin review queue again and won't go live until approved.",
      },
      {
        id: "q3_2",
        question: "Can deleted articles be recovered?",
        answer:
          "No, once an article is deleted, it cannot be recovered. Please ensure you want to remove it before confirming deletion.",
      },
    ],
  },
  {
    id: "q4",
    question: "How can I report fake news?",
    answer:
      "To report fake news, you can use the report button available on each article. This will notify the admin team for further review and action.",
    children: [
      {
        id: "q4_1",
        question: "Is there a report button on articles?",
        answer:
          "Yes, each article has a report button that allows you to report any content you believe is fake or misleading.",
      },
      {
        id: "q4_2",
        question: "Can I report anonymously?",
        answer:
          "Yes, you can report articles anonymously. However, providing your email helps the admin team follow up if needed.",
      },
    ],
  },
  {
    id: "q5",
    question: "How can I save articles?",
    answer:
      "You can save articles by clicking the bookmark icon on the top right of the article. This will add the article to your saved list.",
    children: [
      {
        id: "q5_1",
        question: "Where can I view saved articles?",
        answer:
          "You can view your saved articles by going to your profile dashboard and clicking on the 'Saved Articles' tab.",
      },
      {
        id: "q5_2",
        question: "Are saved articles available offline?",
        answer:
          "No, currently Paper-Talk does not support offline access. You need to be connected to the internet to view saved articles.",
      },
    ],
  },
  {
    id: "q6",
    question: "Can I log in as a user?",
    answer:
      "Yes, you can log in as a user by registering with your email. Once registered, you can access features such as saving articles and reporting content.",
    children: [
      {
        id: "q6_1",
        question: "Do I need an email to register?",
        answer:
          "Yes, you need to provide an email address to register as a user. This email will be used for account verification and communication purposes.",
      },
      {
        id: "q6_2",
        question: "Can I use social login (Google/Facebook)?",
        answer:
          "Currently, Paper-Talk supports email-based login only. Social login options will be added in future updates.",
      },
    ],
  },
  {
    id: "q7",
    question: "How do I create a news article as an author?",
    answer:
      "Log in to your author account and go to the submission section. Upload your article in PDF, add a title, a cover image, and select the news type. Then submit it for admin approval.",
    children: [
      {
        id: "q7_1",
        question: "Where do I submit my news content?",
        answer:
          "In your author dashboard, navigate to the article submission area to upload your article along with the required details.",
      },
      {
        id: "q7_2",
        question: "Can I edit my article after submission?",
        answer:
          "Yes, you can edit your article after submission. However, each edit will go through another admin review before publishing.",
      },
    ],
  },
  {
    id: "q8",
    question: "How do I enable dark mode?",
    answer:
      "Dark mode can be enabled by clicking the profile icon on the top-right corner of the homepage and toggling the dark mode switch.",
    children: [
      {
        id: "q8_1",
        question: "Is it available in the settings menu?",
        answer:
          "Yes, the dark mode toggle is also accessible via the settings menu in your user profile.",
      },
      {
        id: "q8_2",
        question: "Does dark mode apply to all pages?",
        answer:
          "Yes, once enabled, dark mode is applied across the entire platform including the article viewer and dashboard.",
      },
    ],
  },
  {
    id: "q9",
    question: "How do I enable reading mode?",
    answer:
      "Open any news article and click on the book icon on the top right. This will activate Reading Mode to give you a distraction-free experience.",
    children: [
      {
        id: "q9_1",
        question: "Does it remove distractions on the page?",
        answer:
          "Yes, the reading mode removes ads, sidebars, and other UI elements, leaving only the main article content for easy reading.",
      },
      {
        id: "q9_2",
        question: "Can I customize reading mode font size?",
        answer:
          "Currently, font size customization is not available in reading mode, but it's planned for a future release.",
      },
    ],
  },
];
