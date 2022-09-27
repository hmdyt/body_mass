import React from "react";
import { Data } from "plotly.js";
import Plot from "react-plotly.js";
import BodyMassModel from "../model/BodyMass";

interface BodyMassPlotProps {
  bodyMassList: BodyMassModel[];
}

const BodyMassPlot = (props: BodyMassPlotProps): JSX.Element => {
  const plotData: Data[] = [
    {
      x: props.bodyMassList.map((bodyMass) => bodyMass.created.toDate()),
      y: props.bodyMassList.map((bodyMass) => bodyMass.mass),
      type: "scatter",
    },
  ];
  const plotLayout = {};

  return <Plot data={plotData} layout={plotLayout} />;
};

export default BodyMassPlot;
