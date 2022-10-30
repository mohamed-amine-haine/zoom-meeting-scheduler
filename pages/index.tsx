import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import styles from '../styles/Home.module.css';
import { useEvents } from '../hooks/useEvents';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function Home() {
  const { events, addEvent, openEvent } = useEvents();

  const [timezone, setTimezone] = useState<string>();

  useEffect(() => {
    setTimezone(dayjs.tz.guess());
  }, []);

  return (
    <div className={styles.container}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        timeZone={timezone}
        locale="fr"
        selectable
        select={addEvent}
        events={events}
        eventClick={openEvent}
      />
    </div>
  );
}
