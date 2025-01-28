import React from 'react';
import AdminPanel from '../components/AdminPanel';
import Header from '../components/Header';
import PanelTestimonios from '../components/PanelTestimonios';
import PanelServicios from '../components/PanelServicios';
import PanelCursosTalleres from '../components/PanelCursosTalleres';
import PanelEventosTL from '../components/PanelEventosTL';

const AdminPage = ({ embeds, onAddEmbed, onDeleteEmbed }) => {
    return (
        <div className="">
            <Header />
            <AdminPanel embeds={embeds} onAddEmbed={onAddEmbed} onDeleteEmbed={onDeleteEmbed} />
            <PanelTestimonios />
            <PanelServicios />
            <PanelCursosTalleres />
            <PanelEventosTL />
        </div>
    );
};

export default AdminPage;