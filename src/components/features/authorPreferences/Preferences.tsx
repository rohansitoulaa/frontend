import {motion} from "framer-motion"
type PreferencesProps = {
  tags: string[];
  selected: string[];                     // From parent
  onChange: (selected: string[]) => void; // Callback to parent
  maxSelection: number
};

const Preferences = ({ tags, selected, onChange, maxSelection }: PreferencesProps) => {
  const toggleTag = (tag: string) => {
    let updatedTags: string[];

    if (selected.includes(tag)) {
      updatedTags = selected.filter((t) => t !== tag);
    } else {
      updatedTags = selected.length < maxSelection ? [...selected, tag] : selected;
    }

    onChange(updatedTags); // Return selected tags on every change
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {tags.map((tag, index) => (
        <motion.div
        whileHover={{scale:1.02}}
        whileTap={{scale:0.95}}

          key={index}
          onClick={() => toggleTag(tag)}
          className={`px-4 py-3  rounded-2xl cursor-pointer   ${
            selected.includes(tag) ? "bg-[linear-gradient(to_right,_#111,_#222,_#111)] text-white" : "bg-linear-65 from-[#f2f2f2] to-[#e5e5e7] text-black"
          }`}
        >
          {tag}
        </motion.div>
      ))}
    </div>
  );
};

export default Preferences;
