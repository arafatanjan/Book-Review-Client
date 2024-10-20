import DashboardProfile from "@/components/ui/DashboardProfile";
import dynamic from "next/dynamic";

const Dashboardpage =async () => {
  const DashboardProfile = dynamic(() => import("@/components/ui/DashboardProfile"), {
    ssr: false,
  });
  
  const res= await fetch("http://localhost:5000/reviews",{
    cache:'no-store'
  });
  const blogs= await res.json();
  

  return (
    <div>
      {/* <h2 style={{ marginTop: '100px' }}>Welcome user</h2> */}
      <DashboardProfile  blogs={blogs}/>
    </div>
  );
};

export default Dashboardpage;