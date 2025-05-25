import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";

function MainGraph({ series, seriesMeta, allSectors }) {
    const [seriesData, setSeriesData] = useState(null);
    const [overlayData, setOverlayData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        fetch(`http://localhost:8000/series/${series}`)
            .then(res => res.json())
            .then(data => {
                const raw = data[series];
                const formatted = Object.entries(raw).map(([date, value]) => ({
                    date,
                    value
                }));
                setSeriesData({
                    title: series,
                    data: formatted
                });
            })
    }, [series]);

    const addOverlaySeries = (seriesId) => {
        if (overlayData.some(o => o.id === seriesId)) return;
        fetch(`http://localhost:8000/series/${seriesId}`)
            .then(res => res.json())
            .then(data => {
                const raw = data[seriesId];
                const formatted = Object.entries(raw).map(([date, value]) => ({
                    date,
                    value
                }));
                setOverlayData(prev => [...prev, {
                    id: seriesId,
                    data: formatted
                }]);
            });
    };

    useEffect(() => {
        if (!seriesData || !chartRef.current) return;

        const chart = echarts.init(chartRef.current);

        chart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [
                    seriesMeta[series].series_description,
                    ...overlayData.map(o => seriesMeta[o.id].series_description)
                ],
                top: 0
            },
            xAxis: {
                type: 'category',
                data: Array.isArray(seriesData.data) ? seriesData.data.map(d => d.date) : []
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: seriesMeta[series].series_description,
                    data: Array.isArray(seriesData.data) ? seriesData.data.map(d => d.value) : [],
                    type: 'line',
                    smooth: true
                },
                ...overlayData.map(o => ({
                    name: seriesMeta[o.id].series_description,
                    data: o.data.map(d => d.value),
                    type: 'line',
                    smooth: true
                }))
            ]
        });

        return () => chart.dispose();
    }, [seriesData, overlayData, series]);

    return (
        <div style={{ display: "flex", width: "100%", height: "600px" }}>
            <div ref={chartRef} style={{ flex: "0 0 70%", height: "100%" }} />
            <div className="list" style={{ flex: "0 0 30%", paddingLeft: "1rem", overflowY: "auto", maxHeight: "100%" }}>
                <h4>Compare with:</h4>
                {seriesMeta && Object.entries(seriesMeta).map(([id, meta]) => (
                    id !== series && (
                        <div
                            key={id}
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={() => addOverlaySeries(id)}
                        >
                            {meta.series_description}
                        </div>
                    )
                ))}
                <hr></hr>
                <h4>Other Sectors:</h4>
                {allSectors && allSectors.map(sector =>
                    Object.entries(sector.series).map(([id, meta]) =>
                        id !== series && (
                            <div
                                key={id}
                                style={{ cursor: "pointer", color: "green" }}
                                onClick={() => addOverlaySeries(id)}
                            >
                                {meta.series_description}
                            </div>
                        )
                    )
                )}
            </div>
        </div>
    );
}

export default MainGraph;