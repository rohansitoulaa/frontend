import { useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Saazan Poudel Jr",
    role: "Project Manager",
    image: "/images/saazan.jpg",
    description:
      "Saazan Poudel Jr is the driving force behind the Paper-Talk team, ensuring that every member is aligned with the project goals and timelines. With a strong grasp of Agile methodologies, he organizes sprint plannings, standups, and retrospectives with precision. His leadership keeps the team focused and productive, ensuring no task goes unaccounted for. He actively collaborates with both technical and non-technical stakeholders, bridges communication gaps, and is always on top of project risks, ensuring early mitigation. Beyond task allocation and monitoring, he takes a proactive role in mentoring, conflict resolution, and strategic alignment. His visionary guidance is pivotal to maintaining momentum and delivering successful iterations on time.",
  },
  {
    name: "Prasidhha Poudel",
    role: "Business Analyst",
    image: "/images/prasiddha.jpg",
    description:
      "Prasidhha Poudel excels at translating business needs into clear technical requirements. She engages stakeholders to understand the broader business goals and user pain points, ensuring no aspect of the solution is overlooked. With exceptional documentation skills, she crafts detailed feature outlines, user flows, and process diagrams. Her analytical approach ensures that the team is always building what brings the most value to the users. She plays a vital role in backlog grooming, acceptance criteria validation, and sprint reviews. Prasidhha ensures constant alignment between business strategy and development direction, minimizing rework and enhancing clarity across the project lifecycle.",
  },
  {
    name: "Rohan Sitoula",
    role: "Frontend Developer",
    image: "/images/rohan.jpg",
    description:
      "Rohan Sitoula is the frontend craftsman of the team, breathing life into designs with clean and efficient code. He specializes in React and TypeScript, ensuring seamless user experiences that are both aesthetically pleasing and functionally robust. From managing state efficiently to handling API integration, Rohan ensures that every click, scroll, and transition feels natural. He is committed to accessibility, responsive design, and performance optimization. By following modern frontend patterns and component-based architecture, he ensures scalability and reusability. His meticulous approach to layout, animation, and error handling results in an intuitive and polished product interface.",
  },
  {
    name: "Darwin Poudel",
    role: "Backend Developer",
    image: "/images/darwin.jpg",
    description:
      "Darwin Poudel builds the robust engine behind the Paper-Talk platform. He manages API development, server architecture, and integration of third-party services with a focus on performance and scalability. His backend logic is optimized for secure, reliable data processing and delivery. Darwin excels in handling authentication, data validation, middleware, and error logging to create a fail-proof environment. He’s proactive in maintaining security standards and is always looking to optimize backend flows to improve response times. With a clean, modular approach to code, Darwin ensures that the backend is maintainable and can adapt to future growth with ease.",
  },
  {
    name: "Dipesh Sherchan",
    role: "UI/UX Developer",
    image: "/images/dipesh.jpg",
    description:
      "Dipesh Sherchan is the visual thinker and problem solver behind the Paper-Talk interface. He designs user-centered experiences using Figma and then brings them to life in code. Dipesh focuses on usability, clarity, and aesthetics, ensuring that every interaction feels meaningful and intuitive. From color palettes to button spacing, nothing is overlooked. He actively conducts usability tests and incorporates feedback into continuous design improvements. His collaborative nature ensures that design handoffs to frontend developers are smooth and pixel-perfect. Dipesh plays a key role in shaping the product's identity through thoughtful and elegant visual design choices.",
  },
  {
    name: "Deva Hang Rai",
    role: "Database Manager",
    image: "/images/deva.jpg",
    description:
      "Deva Hang Rai ensures the data foundations of Paper-Talk are rock solid. He designs efficient database schemas, sets up indexes, and handles all aspects of data integrity, backup, and recovery. His work ensures that data is both secure and readily accessible. He optimizes queries and structures to enhance performance, particularly under high traffic scenarios. With a strong understanding of relational and NoSQL databases, Deva carefully selects tools and structures based on the project's needs. He monitors performance, ensures data normalization where necessary, and maintains strict control over access rights. His behind-the-scenes contributions ensure that everything on the surface runs flawlessly.",
  },
];

const Aboutus = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime =
        (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[linear-gradient(to_right,_#111,_#222,_#111)] text-gray-800">
      {/* Top Intro Section with animation */}
      <div className="flex flex-col items-stretch gap-12 px-6 py-12">
        {/* Card 1 - Left aligned */}
        <motion.div
          className="w-180 h-100 self-start flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 dark:from-[#000] dark:to-[#222] shadow-xl rounded-2xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col p-6 w-full max-w-md">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-900 dark:to-pink-900 text-transparent bg-clip-text mb-4">
              What is Paper-Talk?
            </h1>
            <p className="text-base md:text-lg text-gray-700 dark:text-[#f5f5f5]">
              Paper-Talk is an innovative web-based news portal aimed at
              delivering fresh, relevant, and categorized news content in real
              time.
            </p>
          </div>
        </motion.div>

        {/* Card 2 - Right aligned */}
        <motion.div
          className="w-190 h-100 self-end flex flex-col md:flex-row-reverse items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 dark:from-[#000] dark:to-[#222] shadow-xl rounded-2xl overflow-hidden"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="p-6 w-full max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-900 dark:to-blue-900 text-transparent bg-clip-text mb-2">
              The Idea Behind Paper-Talk
            </h2>
            <p className="text-base md:text-lg text-gray-700 dark:text-[#f5f5f5]">
              With the rapid shift towards digital news consumption, we saw the
              need to create a simplified yet efficient news management system.
            </p>
          </div>
        </motion.div>

        {/* Card 3 - Left aligned */}
        <motion.div
          className="w-180 h-100 self-start flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 dark:from-[#000] dark:to-[#222] shadow-xl rounded-2xl overflow-hidden"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="p-6 w-full max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-yellow-600 dark:from-indigo-900 dark:to-yellow-800 text-transparent bg-clip-text mb-2">
              Who Is It For?
            </h2>
            <p className="text-base md:text-lg text-gray-700 dark:text-[#f5f5f5]">
              The platform provides seamless interfaces for admins, authors, and
              users—making news management and access easier than ever before.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Video Section */}
      <div className="flex flex-col justify-center items-center p-6 relative">
        <div className="relative w-full max-w-3xl">
          <video
            ref={videoRef}
            className="w-full h-auto object-cover rounded-xl"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
          >
            <source src="/videos/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm rounded-b-xl px-4 py-2 flex items-center justify-between gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:scale-110 transition"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="flex-1 accent-white h-1 cursor-pointer"
            />

            <button
              onClick={toggleMute}
              className="text-white hover:scale-110 transition"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <motion.h2
        className="text-center text-4xl md:text-5xl  mb-10 mt-16 
             bg-gradient-to-r from-blue-500 to-indigo-600 
             dark:from-blue-300 dark:to-indigo-400 
             text-transparent bg-clip-text"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        Faces Behind the Foundation
      </motion.h2>

      <div className="flex flex-col gap-10 p-6">
        {team.map((member, idx) => {
          const isEven = idx % 2 === 0;
          const direction = isEven ? "bg-gradient-to-r" : "bg-gradient-to-l";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } items-center w-full rounded-xl overflow-hidden ${direction} `}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-200 h-100 object-cover rounded-md"
              />
              <div className="w-full p-6 text-black dark:text-white">
                <h3 className="text-2xl md:text-4xl font-bold mb-2">
                  {member.name}
                </h3>
                <p className="text-lg md:text-2xl font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm md:text-lg">{member.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Slogan */}
      <motion.div
        className="text-center text-xl md:text-2xl mt-20 mb-10 font-semibold text-yellow-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        💡 “News that matters—made easy with Paper-Talk.”
      </motion.div>
    </div>
  );
};

export default Aboutus;
