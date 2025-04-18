import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xxxxxxxx.supabase.co"; // À remplacer
const supabaseKey = "eyJhbGci..."; // À remplacer
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    zone: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("profils").insert([formData]);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      alert("Profil enregistré avec succès !");
      setFormData({ nom: "", email: "", zone: "", description: "" });
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-8 text-gray-800">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <img src="/logo-assistvie.png" alt="Logo AssistVie" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-orange-600">AssistVie</h1>
        </div>
      </header>

      <section className="bg-white rounded-2xl shadow p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-bold text-orange-700 mb-4">
          Création de profil (Assistant de vie)
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom complet"
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            name="zone"
            value={formData.zone}
            onChange={handleChange}
            placeholder="Zone géographique"
            className="p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description, expérience, services proposés..."
            className="p-2 border border-gray-300 rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          >
            Enregistrer
          </button>
        </form>
      </section>

      <footer className="text-center mt-12 text-sm text-gray-500">
        &copy; 2025 AssistVie. Tous droits réservés.
      </footer>
    </div>
  );
}
