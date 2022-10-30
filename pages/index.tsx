import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import styles from '../styles/Home.module.css';
import { useEvents } from '../hooks/useEvents';

export default function Home() {
  const { events, addEvent, openEvent } = useEvents();

  return (
    <div className={styles.container}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale="fr"
        selectable
        select={addEvent}
        events={events}
        eventClick={openEvent}
      />
    </div>
  );
}
