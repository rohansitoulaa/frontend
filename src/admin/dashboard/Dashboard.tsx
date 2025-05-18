import PendingAuthors from "./authorRequest/PendingAuthors";
import PendingArticles from "./pendingArticles/PendingArticles";
import TopAuthorsName from "./topAuthors/TopAuthorsName";
import TopCategories from "./topCategories/TopCategories";
import Total from "./total/Total";

const Dashboard = () => {
  return (
    <div className="p-4">
      {/* Main Content */}
      <div className="flex-1  overflow-y-auto flex flex-col gap-4">
        {/* Row: Total + TopAuthorsName + TopCategories */}
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <Total />
          </div>
          <div className="flex-1">
            <TopAuthorsName />
          </div>
          <div className="flex-1">
            <TopCategories />
          </div>
        </div>

        {/* Row: Pending Articles + Pending Authors */}
        <div className="flex flex-row gap-4">
          <div className="flex-1 min-w-[300px]">
            <PendingArticles />
          </div>
          <div className="flex-1 min-w-[300px]">
            <PendingAuthors />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
