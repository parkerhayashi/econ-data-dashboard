import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";

function SeriesSnapshot({ series }) {
    const [seriesData, setSeriesData] = useState(null);
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

    useEffect(() => {
        if (!seriesData || !chartRef.current) return;

        const chart = echarts.init(chartRef.current);

        chart.setOption({
            tooltip: {
                trigger: 'axis'
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
                    data: Array.isArray(seriesData.data) ? seriesData.data.map(d => d.value) : [],
                    type: 'line',
                    smooth: true
                }
            ]
        });

        return () => chart.dispose();
    }, [seriesData]);

    return (
        <div>
            <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
        </div>
    );
}

export default SeriesSnapshot;