import CalendarComponent from "@/components/CalendarComponent";
import Modal from "@/components/Modal/Modal";
import Region from "@/components/Region";
import Wrapper from "@/components/Wrapper";
import AddShiftForm from "@/components/forms/AddShiftForm/AddShiftForm";
import { getShifts, getWorkers } from "@/helpers/shiftHandlers/getData";

const Home = async () => {
  const shifts = await getShifts();
  const workers = await getWorkers();

  return (
    <main>
      <Region>
        <Wrapper>
          <CalendarComponent shifts={shifts}></CalendarComponent>
          <Modal>
            <AddShiftForm workers={workers}></AddShiftForm>
          </Modal>
        </Wrapper>
      </Region>
    </main>
  );
};

export default Home;
