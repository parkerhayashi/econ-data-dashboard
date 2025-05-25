import NavBar from "../components/NavBar";
import MainGraph from "../components/MainGraph";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SeriesPage() {
    const { sectorId, seriesId } = useParams();
    const [sectors, setSectors] = useState([]);
    const [seriesData, setSeriesData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/gics_data")
            .then(res => res.json())
            .then(data => {
                const formatted = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value
                }));
                setSectors(formatted);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8000/series/${seriesId}`)
            .then(res => res.json())
            .then(data => {
                const raw = data[seriesId];
                const formatted = Object.entries(raw).map(([date, value]) => ({
                    date,
                    value
                }));
                setSeriesData({
                    title: seriesId,
                    data: formatted
                });
            })
    }, []);

    const currentSector = sectors.find(sector => sector.id === sectorId);
    const seriesArray = currentSector ? Object.values(currentSector.series) : [];

    return (
        <div>
            <NavBar sectors={sectors} />
            <main>
                {currentSector?.series[seriesId] && (
                    <h1 style={{ marginLeft: "1rem" }}>
                        {currentSector.series[seriesId].series_description}
                    </h1>
                )}
                {currentSector?.series[seriesId] && (
                    <h3 style={{ marginLeft: "1rem" }}>
                        Frequency: {currentSector.series[seriesId].frequency}
                    </h3>
                )}
                {currentSector?.series[seriesId] && (
                    <div>
                        <MainGraph 
                            series={seriesId}
                            seriesMeta={currentSector?.series}
                            allSectors={sectors}
                        />
                    </div>
                )}
            </main>
        </div>
    )
}

export default SeriesPage;