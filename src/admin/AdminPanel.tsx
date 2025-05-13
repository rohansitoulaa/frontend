import PendingAuthors from "./dashboard/authorRequest/PendingAuthors";
import PendingArticles from "./dashboard/pendingArticles/PendingArticles";
import TopAuthors from "./dashboard/topAuthors/TopAuthors";
import TopCategories from "./dashboard/topCategories/TopCategories";
import Total from "./dashboard/total/Total";
import Navbar from "./navbar/Navbar";

const AdminPanel = () => {
  return (
    <>
      <div className="w-full flex justify-center max-h-screen py-3  gap-3">
        <Navbar />
        <div className="flex flex-col gap-3 max-h-screen ">
          <div className="flex gap-3 max-h-screen ">
            <Total />
            <TopAuthors />
            <TopCategories />
          </div>
          <div className="flex gap-3 max-h-screen">
            <PendingArticles />
            <PendingAuthors />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
