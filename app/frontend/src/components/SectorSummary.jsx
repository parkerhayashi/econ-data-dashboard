import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

function SectorSummary({ sector }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!sector || !sector.series) return;

        const frequencies = {
            daily: 0,
            weekly: 0,
            monthly: 0,
            quarterly: 0,
            annual: 0,
        };

        Object.values(sector.series).forEach(series => {
            const freq = series.frequency.toLowerCase();
            if (freq.includes("daily")) frequencies.daily += 1;
            else if (freq.includes("weekly")) frequencies.weekly += 1;
            else if (freq.includes("monthly")) frequencies.monthly += 1;
            else if (freq.includes("quarterly")) frequencies.quarterly += 1;
            else if (freq.includes("annual")) frequencies.annual += 1;
        });

        const chart = echarts.init(chartRef.current);
        chart.setOption({
            title: {
                text: sector.name,
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: 'Frequency',
                    type: 'pie',
                    radius: '50%',
                    data: Object.entries(frequencies).map(([key, value]) => ({
                        name: key,
                        value
                    })),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });

        return () => {
            chart.dispose();
        };
    }, [sector]);

    return (
        <div>
            <div ref={chartRef} style={{ width: "400px", height: "300px", justifyContent: "center"}} />
        </div>
    );
}

export default SectorSummary;