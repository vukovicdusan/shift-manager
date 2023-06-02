import CalendarComponent from "@/components/CalendarComponent";
import Modal from "@/components/Modal/Modal";
import { getShifts, getWorkers } from "@/helpers/shiftHandlers/getData";
import ProtectedPage from "./protected-page/protected-page";

const Home = async () => {
  const shifts = await getShifts();
  const workers = await getWorkers();

  return (
    <>
      <ProtectedPage>
        <CalendarComponent shifts={shifts}></CalendarComponent>
      </ProtectedPage>
      <Modal workers={workers}></Modal>
    </>
  );
};

export default Home;
