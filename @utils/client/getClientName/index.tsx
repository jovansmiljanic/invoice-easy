// Core
import { useEffect, useState } from "react";

// Vendors
import axios from "axios";

// Global types
import { Client } from "@types";
import mongoose from "mongoose";

export const getClientName = (id: mongoose.Types.ObjectId) => {
  const [clients, setClients] = useState<Client[]>([]);

  const getData = async () => {
    const { data } = await axios.get(`/api/client`);

    setClients(data.clients);
  };

  useEffect(() => {
    getData();
  }, []);

  const client = clients.filter((client) => client._id === id);

  return (
    <div>
      {client.map((a, i) => (
        <div key={i}>{a.clientName}</div>
      ))}
    </div>
  );
};
