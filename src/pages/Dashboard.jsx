
import Cards from "../components/Dash/Cards";
import Recent from "../components/Dash/Recent";
import Chart from "../components/Dash/TransChart";
import ActiveUsers from "../components/Dash/ActiveUsers";

function Dashboard() {
  return (
    <main className="mx-4 space-y-4">
      <Cards />
      <section className="md:flex  md:max-w-[1700px] 2xl:mx-auto  gap-4">
        <div className="bg-white overflow-auto w-full md:basis-8/12/">
          <Chart />
        </div>
        <div className="md:basis-4/12 flex flex-col gap-y-4 p-2">
          <ActiveUsers/>
          <Recent />
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
