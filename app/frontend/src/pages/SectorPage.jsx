import NavBar from '../components/NavBar';
import SeriesSnapshot from '../components/SeriesSnapshot';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SectorPage() {
    const { id } = useParams();
    const [sectors, setSectors] = useState([]);
    const [visible, setVisible] = useState({});

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

    const currentSector = sectors.find(sector => sector.id === id);
    const seriesArray = currentSector ? Object.values(currentSector.series) : [];

    return (
        <div>
            <NavBar sectors={sectors} />
            <main>
                <h1 style={{marginLeft: "1rem"}}>{id} Sector Series</h1>
                <div className="grid_list">
                    {seriesArray.map((series) => (
                      <div key={series.series_id}>
                        <div className="card">
                            <a href={`/sector/${id}/${series.series_id}`} style={{ color: "#fff", textDecoration: "none" }}>
                                <div style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h3 style={{ color: "#000000", textDecoration: "none", fontWeight: "bold", margin: 0 }}>
                                        {series.series_description}
                                    </h3>
                                </div>
                                <p style={{ color: "#000000", textDecoration: "none", margin: 0 }}>Frequency: {series.frequency}</p>
                            </a>
                            <hr></hr>
                            <button
                                onClick={() =>
                                    setVisible((prev) => ({ ...prev, [series.series_id]: true }))
                                }
                                style={{ marginBottom: "0.5rem" }}
                            >
                                Show Chart
                            </button>
                            {visible[series.series_id] && (
                                <SeriesSnapshot series={series.series_id} />
                            )}
                        </div>
                      </div>
                    ))}   
                </div>
            </main>
        </div>
  );
}

export default SectorPage;