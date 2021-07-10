import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import EventItem from "../components/events/event-item";

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
