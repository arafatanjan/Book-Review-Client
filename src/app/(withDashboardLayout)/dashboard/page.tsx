import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";


const Dashboardpage = async () => {
    const session= await getServerSession(authOptions);
    console.log(session);
    return (
        <div>
            <h2 style={{marginTop:"100px"}}>Welcome {session?.user?.name}</h2>
        </div>
    );
};

export default Dashboardpage;