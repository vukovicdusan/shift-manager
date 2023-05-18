import CalendarComponent from "@/components/CalendarComponent";
import Region from "@/components/Region";
import Wrapper from "@/components/Wrapper";

export default function Home() {
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
