<script setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ref, onMounted } from 'vue';
import { useReservationStore } from '@/stores/reservationStore';

const reservationStore = useReservationStore();

const handleEventClick = (info) => {
    const reservation = info.event.extendedProps;
    alert(`Détails de la réservation:\nClient: ${reservation.client.nom}\nChambre: ${reservation.chambre.numeroChambre}\nStatus: ${reservation.status}\nDate de début: ${reservation.dateDebut}\nDate de fin: ${reservation.dateFin}`);
};

const calendarOptions = ref({
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    events: [],
    eventClick: handleEventClick,
});

onMounted(async () => {
    try {
        const reservations = await reservationStore.loadReservations();
        calendarOptions.value.events = reservations.map(reservation => ({
            title: `Réservation - Client: ${reservation.client.nom}`,
            start: reservation.dateDebut,
            end: reservation.dateFin,
            allDay: true,
            backgroundColor: reservation.status === 'CONFIRMEE' ? '#1abc9c' : '#f39c12',
            borderColor: reservation.status === 'CONFIRMEE' ? '#16a085' : '#e67e22',
            textColor: '#fff',
            extendedProps: reservation
        }));
    } catch (error) {
        console.error('Erreur lors du chargement des réservations:', error);
    }
});
</script>

<template>
    <div class="calendar-page">
        <div class="calendar-container">
            <FullCalendar :options="calendarOptions" />
        </div>
    </div>
</template>

<style scoped>
.calendar-page {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.calendar-container {
    width: 100%;
    max-width: 1200px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.fc .fc-toolbar-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.fc .fc-button {
    background-color: #1abc9c;
    border: none;
    color: #fff;
}

.fc .fc-button:hover {
    background-color: #16a085;
}

.fc-daygrid-event {
    background-color: #007bff;
    border-color: #0056b3;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
}
</style>
