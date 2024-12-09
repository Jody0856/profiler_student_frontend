import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const exampleData =  [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
  ]

export default function BasicPie({data=exampleData}) {
  return (
    <PieChart
      series={[
        {
          data,
        },  
      ]}
      
      width={600}
      height={400}
      animation={false} 
    />
  );
}
