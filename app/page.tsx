import CalendarComponent from "../components/CalendarComponent";
import Modal from "../components/Modal/AddEditShiftsModal";
import { getShifts, getWorkers } from "@/helpers/shiftHandlers/getData";
import ProtectedPage from "./protected-page/protected-page";
import WorkerInfoBoard from "@/components/WorkerInfoBoard/WorkerInfoBoard";

export const revalidate = 0;

const Home = async () => {
  const shifts = JSON.parse(JSON.stringify(await getShifts()));
  const workers = JSON.parse(JSON.stringify(await getWorkers()));

  return (
    <>
      <ProtectedPage>
        <CalendarComponent shifts={shifts}></CalendarComponent>
      </ProtectedPage>
      <WorkerInfoBoard></WorkerInfoBoard>
      <Modal workers={workers}></Modal>
    </>
  );
};

export default Home;
