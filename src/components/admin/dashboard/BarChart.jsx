import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ dailyRevenue }) => {
  // Convert the dailyRevenue object to an array of objects
  const updatedData = Object.entries(dailyRevenue).map(([date, revenue]) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue,
  }));

  // Get the last seven elements of the updatedData array
  const lastSevenDaysData = updatedData.slice(-7);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={lastSevenDaysData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;







// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const BarChartComponent = ({ dailyRevenue }) => {
//   // Convert the dailyRevenue object to an array of objects
//   const updatedData = Object.entries(dailyRevenue).map(([date, revenue]) => ({
//     date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//     revenue,
//   }));

//   return (
//     <BarChart width={500} height={300} data={updatedData}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="date" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="revenue" fill="#8884d8" />
//     </BarChart>
//   );
// };

// export default BarChartComponent;







// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// // const data = [
// //     { month: 'Jan', revenue: 400 },
// //     { month: 'Feb', revenue: 300 },
// //     { month: 'Mar', revenue: 600 },
// //     { month: 'Apr', revenue: 800 },
// //     { month: 'May', revenue: 400 },
// //     { month: 'Jun', revenue: 300 },
// //     { month: 'Jul', revenue: 600 },
// //     { month: 'Aug', revenue: 800 },
// //     { month: 'Sep', revenue: 400 },
// //     { month: 'Oct', revenue: 300 },
// //     { month: 'Nov', revenue: 600 },
// //     { month: 'Dec', revenue: 800 },
// // ];

// const BarChartComponent = ({totalRevenue}) => {
//     const updatedData = data.map(item => ({
//         ...item,
//         revenue: totalRevenue, // You can use a formula here to calculate revenue based on totalRevenue and month if needed
//       }));
//   return (
//     <BarChart width={500} height={300} data={updatedData}>
//       <CartesianGrid strokeDasharray="3 3" />
//       {/* <XAxis dataKey="category" /> */}
//       <XAxis dataKey="month" /> {/* Update dataKey to "month" */}   
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="revenue" fill="#8884d8" />
//     </BarChart>
//   );
// };

// export default BarChartComponent;
