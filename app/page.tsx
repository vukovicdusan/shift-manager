import CalendarComponent from "@/components/CalendarComponent";
import Region from "@/components/Region";
import Wrapper from "@/components/Wrapper";
import { getShifts } from "@/helpers/shiftHandlers/getShifts";

export default function Home() {
  const fetchShifts = async () => {
    const shifts = await getShifts();
    console.log("it alive", shifts);
  };

  fetchShifts();

  return (
    <main>
      <Region>
        <Wrapper>
          <CalendarComponent></CalendarComponent>
        </Wrapper>
      </Region>
    </main>
  );
}
