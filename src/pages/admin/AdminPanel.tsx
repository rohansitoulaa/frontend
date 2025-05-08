import PendingArticles from "./dashboard/pendingArticles/PendingArticles"
import Navbar from "./navbar/Navbar"

const AdminPanel = () => {
  return (
    <>
        <div className="w-full flex p-10">
            <Navbar />
            <PendingArticles />
        </div>
    </>
  )
}

export default AdminPanel