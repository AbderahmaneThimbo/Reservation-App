<template>
    <div class="receipt-container">
        <div class="receipt-header">
            <div class="logo">
                <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
            </div>
            <h1>FICHE RÉSERVATION</h1>
        </div>
        <div class="receipt-body">
            <div class="section">
                <h2 class="section-title">CLIENT</h2>
                <div class="grid">
                    <div class="grid-item"><strong>Nom :</strong> {{ reservation.client?.nom }}</div>
                    <div class="grid-item"><strong>Prénom :</strong> {{ reservation.client?.prenom }}</div>
                    <div class="grid-item"><strong>Téléphone :</strong> {{ reservation.client?.telephone }}</div>

                </div>
            </div>
            <div class="section">
                <h2 class="section-title">DÉTAILS DE LA RÉSERVATION</h2>
                <div class="grid">
                    <div class="grid-item"><strong>Chambre :</strong> {{ reservation.chambre?.numeroChambre }}</div>
                    <div class="grid-item"><strong>Date d'Arrivée :</strong> {{ formatDate(reservation.dateDebut) }}
                    </div>
                    <div class="grid-item"><strong>Date de Départ :</strong> {{ formatDate(reservation.dateFin) }}</div>
                    <div class="grid-item"><strong>Statut :</strong> {{ reservation.status }}</div>
                </div>
            </div>
        </div>
        <div class="receipt-footer">
            <p>Merci pour votre réservation !</p>
            <button @click="generatePDF" class="btn btn-primary">Télécharger le PDF</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRoute } from 'vue-router';
import { useReservationStore } from '@/stores/reservationStore';

const reservationStore = useReservationStore();
const reservation = ref({});
const route = useRoute();

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

onMounted(async () => {
    const id = route.params.id;
    reservation.value = await reservationStore.loadReservationById(id);
});

const generatePDF = async () => {
    const element = document.querySelector(".receipt-container"); // Sélectionnez le conteneur à capturer
    const canvas = await html2canvas(element, {
        scale: 2, // Augmentez la résolution de l'image capturée
    });

    const imgData = canvas.toDataURL("image/png"); // Convertit en image
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width / 10; // Ajustez pour s'adapter au PDF
    const imgHeight = (imgWidth * canvas.height) / canvas.width;

    // Ajoutez l'image capturée dans le PDF
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    pdf.save(`fiche_reservation_${reservation.value.id}.pdf`);
};

</script>

<style scoped>
.receipt-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #fff;
    font-family: Arial, sans-serif;
}

.receipt-header {
    text-align: center;
    margin-bottom: 20px;
    background-color: #f4f4f4;
    padding: 20px 10px;
}

.logo-img {
    width: 80px;
    height: 80px;
    margin-bottom: 15px;
}


.receipt-header h1 {
    color: #34495e;
    font-size: 24px;
    margin: 0;
}

.section {
    margin-bottom: 20px;
}

.section-title {
    background-color: #16a085;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 18px;
    text-align: center;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.grid-item {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.receipt-footer {
    text-align: center;
    margin-top: 20px;
}

.receipt-footer .btn {
    background-color: #16a085;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.receipt-footer .btn:hover {
    background-color: #1f4d68;
}
</style>
