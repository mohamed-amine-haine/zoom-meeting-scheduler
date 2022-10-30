import FullCalendar, { DateSelectArg, EventInput } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import styles from '../styles/Home.module.css';
import { useCallback, useState } from 'react';
import { promptEventObjectForm } from '../services/calendarServices';

export default function Home() {
  const [events, setEvents] = useState<EventInput[]>([]);

  const addEvent = useCallback(({ start, end }: DateSelectArg) => {
    const title = promptEventObjectForm(start, end);

    if (title) {
      const newEvent: EventInput = { start, end, title };
      setEvents(oldEvents => [...oldEvents, newEvent]);
    }
  }, []);

  return (
    <div className={styles.container}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        timeZone="local"
        locale="fr"
        selectable
        select={addEvent}
        events={events}
      />
    </div>
  );
}
