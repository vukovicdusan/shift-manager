import CalendarComponent from "@/components/CalendarComponent";
import Modal from "@/components/Modal";
import Region from "@/components/Region";
import Wrapper from "@/components/Wrapper";
import { getShifts } from "@/helpers/shiftHandlers/getShifts";

const Home = async () => {
  const shifts = await getShifts();
  return (
    <main>
      <Region>
        <Wrapper>
          <CalendarComponent shifts={shifts}></CalendarComponent>
          <Modal></Modal>
        </Wrapper>
      </Region>
    </main>
  );
};

export default Home;
