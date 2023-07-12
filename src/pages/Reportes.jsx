import { Layout } from "../templates/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import am5themes_Material from "@amcharts/amcharts5/themes/Material";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import React, { useEffect, useState } from "react";
import '../reporte.css';

export function Reportes() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchedDate, setSearchedDate] = useState(null);

  useEffect(() => {
    fetchData();
  }, [searchedDate]);

  const fetchData = async () => {
    try {
      let url = "https://germancv.pythonanywhere.com/api/records/?sensor_type=temperature";

      if (searchedDate) {
        const year = searchedDate.getFullYear();
        const month = searchedDate.getMonth() + 1;
        const day = searchedDate.getDate();

        url += `&year=${year}&month=${month}&day=${day}`;
      }

      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
      dispose();
      draw(jsonData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  let root;

  function dispose() {
    if (root) {
      root.dispose();
      root = null;
    }
  }

  const draw = (newData) => {
    root = am5.Root.new("chartdiv");
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
      am5themes_Dark.new(root),
      am5themes_Material.new(root),
    ]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);

    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round(Math.random() * 10 - 5 + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value,
      };
    }

    function generateDatas(count) {
      let data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: {
          timeUnit: "minute",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    const temp = newData.map((x) => ({
      ...x,
      date: new Date(x.timestamp).getTime(),
    }));

    series.data.setAll(temp);

    series.appear(1000);
    chart.appear(1000, 100);
  };

  return (
    <Layout>
      <div id="chartdiv" className="chartdiv"></div>
      <div style={{ display: "flex", alignItems: "center" }}>
  <p style={{ marginRight: "10px" }}>Filtrado por fecha:</p>
  <DatePicker
    selected={searchedDate}
    onChange={(date) => setSearchedDate(date)}
  />
</div>
<div style={{ margin: "77px" }}>
  <h2>Data:</h2>
  <table className="data-table">
    <thead>
      <tr>
        <th>Sensor Name</th>
        <th>Value</th>
        <th>Sensor Type</th>
        <th>Timestamp</th>
      </tr>
    </thead>
    <tbody>
      {data
        .filter((item) => {
          if (searchedDate) {
            const year = searchedDate.getFullYear();
            const month = searchedDate.getMonth() + 1;
            const day = searchedDate.getDate();
            const itemDate = new Date(item.timestamp);
            return (
              itemDate.getFullYear() === year &&
              itemDate.getMonth() + 1 === month &&
              itemDate.getDate() === day
            );
          } else {
            return true;
          }
        })
        .map((item) => (
          <tr key={item.id}>
            <td>{item.sensor_name}</td>
            <td>{item.value}</td>
            <td>{item.sensor_type}</td>
            <td>{item.timestamp}</td>
          </tr>
        ))}
    </tbody>
  </table>
  <br></br><br></br>
</div>


    </Layout>
  );
}