import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = ({ totaluser, totalpartner, totalbookings }) => {
  const data = [
    // { name: 'Revenue', value: totalrevenue },
    { name: 'Users', value: totaluser },
    { name: 'Partners', value: totalpartner },
    { name: 'Bookings', value: totalbookings },
  ];

  return (
    <PieChart width={400} height={270}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data}
        cx={200}
        cy={120}
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;



















// import React from 'react';
// import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

// const data = [
//   { name: 'A', value: 400 },
//   { name: 'B', value: 300 },
//   { name: 'C', value: 300 },
//   { name: 'D', value: 200 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const PieChartComponent = () => {
//   return (
//     <PieChart width={400} height={270}>
//       <Pie
//         dataKey="value"
//         isAnimationActive={true}
//         data={data}
//         cx={200}
//         cy={100}
//         outerRadius={80}
//         fill="#8884d8"
//         label
//       >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//       <Tooltip />
//       <Legend />
//     </PieChart>
//   );
// };

// export default PieChartComponent;

