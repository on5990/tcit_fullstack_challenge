import PostForm from "./PostForm";
import Search from "./Search";
import PostTable from "./PostTable";

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>Posts</h1>
      </header>
      <main className="dashboard-content">
        <Search />
        <PostTable />
        <PostForm />
      </main>
    </div>
  );
}

export default Dashboard;
