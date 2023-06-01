import CalendarComponent from "@/components/CalendarComponent";
import Modal from "@/components/Modal/Modal";
import { getShifts, getWorkers } from "@/helpers/shiftHandlers/getData";

const Home = async () => {
  const shifts = await getShifts();
  const workers = await getWorkers();

  return (
    <>
      <CalendarComponent shifts={shifts}></CalendarComponent>
      <Modal workers={workers}></Modal>
    </>
  );
};

export default Home;
