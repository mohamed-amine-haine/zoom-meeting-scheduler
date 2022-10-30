import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridWeek" />
    </div>
  );
}
