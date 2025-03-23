import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function ProDashboard() {
  const [events, setEvents] = useState([
    { title: "Balade en mer", date: "2025-03-27T10:00:00" },
    { title: "Plongée découverte", date: "2025-03-29T14:00:00" },
  ]);

  const handleDateClick = (info) => {
    const title = prompt("Titre de l'activité :");
    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (confirm(`Supprimer l'activité "${clickInfo.event.title}" ?`)) {
      setEvents(events.filter((event) => event.date !== clickInfo.event.startStr || event.title !== clickInfo.event.title));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tableau de bord professionnel</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height={600}
      />
    </div>
  );
}
