import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import dynamic from "next/dynamic";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), { ssr: false });
const dayGridPlugin = dynamic(() => import("@fullcalendar/daygrid"), { ssr: false });
const timeGridPlugin = dynamic(() => import("@fullcalendar/timegrid"), { ssr: false });
const interactionPlugin = dynamic(() => import("@fullcalendar/interaction"), { ssr: false });

export default function ProDashboard() {
  const [events, setEvents] = useState([
    { title: "Balade en mer", date: "2025-03-27T10:00:00" },
    { title: "Plongée découverte", date: "2025-03-29T14:00:00" },
  ]);

  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    title: "",
    location: "",
    duration: "",
    capacity: "",
    price: "",
    image: "",
  });
  const [editIndex, setEditIndex] = useState(null);

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

  const handleAddActivity = () => {
    if (!newActivity.title) return;
    if (editIndex !== null) {
      const updated = [...activities];
      updated[editIndex] = newActivity;
      setActivities(updated);
      setEditIndex(null);
    } else {
      setActivities([...activities, newActivity]);
    }
    setNewActivity({ title: "", location: "", duration: "", capacity: "", price: "", image: "" });
  };

  const handleEdit = (index) => {
    setNewActivity(activities[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...activities];
    updated.splice(index, 1);
    setActivities(updated);
    if (editIndex === index) {
      setNewActivity({ title: "", location: "", duration: "", capacity: "", price: "", image: "" });
      setEditIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Tableau de bord professionnel</h1>

        <Card className="p-4 mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            {editIndex !== null ? "Modifier l'activité" : "Créer une nouvelle activité"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nom de l'activité"
              className="p-2 border rounded"
              value={newActivity.title}
              onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Lieu"
              className="p-2 border rounded"
              value={newActivity.location}
              onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
            />
            <input
              type="number"
              placeholder="Durée (min)"
              className="p-2 border rounded"
              value={newActivity.duration}
              onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
            />
            <input
              type="number"
              placeholder="Capacité"
              className="p-2 border rounded"
              value={newActivity.capacity}
              onChange={(e) => setNewActivity({ ...newActivity, capacity: e.target.value })}
            />
            <input
              type="number"
              placeholder="Prix (€)"
              className="p-2 border rounded"
              value={newActivity.price}
              onChange={(e) => setNewActivity({ ...newActivity, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL (optionnel)"
              className="p-2 border rounded"
              value={newActivity.image}
              onChange={(e) => setNewActivity({ ...newActivity, image: e.target.value })}
            />
          </div>
          <Button className="mt-4" onClick={handleAddActivity}>
            {editIndex !== null ? "Mettre à jour" : "Ajouter l'activité"}
          </Button>
        </Card>

        {activities.length > 0 && (
          <Card className="p-4 mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Mes activités</h2>
            <ul className="list-disc pl-5">
              {activities.map((act, idx) => (
                <li key={idx} className="mb-2 flex justify-between items-center">
                  <div>
                    <strong>{act.title}</strong> – {act.location} – {act.duration} min – {act.capacity} pers – {act.price} €
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(idx)}>Modifier</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(idx)}>Supprimer</Button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <Card className="p-4">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Planning</h2>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height={600}
          />
        </Card>
      </div>
    </div>
  );
}

