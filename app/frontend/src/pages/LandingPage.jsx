import React, { useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import SectorSummary from '../components/SectorSummary';
import '../index';

function LandingPage() {
    const [sectors, setSectors] = useState([]);
  
    useEffect(() => {
        fetch("http://localhost:8000/gics_data")
            .then(res => res.json())
            .then(data => {
                const formatted = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value
                }));
            setSectors(formatted);
            })
    }, []);
  
    return (
        <div>
            <NavBar sectors={sectors} />
            <main>
                <div className="grid_list">
                    {sectors.map((sector) => (
                        <div key={sector.id}>
                            <a href={`/sector/${sector.id}`} style={{ color: "#fff", textDecoration: "none" }}>
                                <div className="card">
                                    <div style={{ height: "60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                      <h3 style={{ color: "#000000", textDecoration: "none", fontWeight: "bold", margin: 0 }}>{sector.id}</h3>
                                    </div>
                                    <hr></hr>
                                    <SectorSummary sector={sector} />
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default LandingPage;