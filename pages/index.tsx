import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <FullCalendar plugins={[timeGridPlugin]} initialView="timeGridWeek" />
    </div>
  );
}
