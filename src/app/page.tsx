import DetectionDashboard from '../components/DetectionDashboard';
import { getLogsForAdmin } from "@/app/actions/getLogs"
const Home = async () => {
  const logs = await getLogsForAdmin();
  return (
    <div className="container">
      <DetectionDashboard logs={logs}/>
    </div>
  );
}

export default Home;
