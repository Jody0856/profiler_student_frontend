// ChartIPSemester.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartIPSemester = ({ data }) => {
  // Urutkan data berdasarkan tahun_semester dan jenis_semester
  const sortedData = data.sort((a, b) => {
    const semesterA = `${a.tahun_semester}-${a.jenis_semester}`;
    const semesterB = `${b.tahun_semester}-${b.jenis_semester}`;
    return semesterA.localeCompare(semesterB); // Urutkan berdasarkan gabungan tahun dan jenis semester
  });

  // Membuat label untuk semester (misal: "2024-Gasal", "2024-Genap")
  const semesters = [
    ...new Set(
      sortedData.map((item) => {
        let text1 = item.jenis_semester;
        let text = text1.charAt(0).toUpperCase() + text1.slice(1);
        return `${text}-${item.tahun_semester}`;
        // return ` ${item.jenis_semester}-${item.tahun_semester}`;
      })
    ),
  ];

  // Menghitung IPK untuk setiap semester
  const ipkValues = semesters.map((semester) => {
    const semesterData = sortedData.filter((item) => {
      let text1 = item.jenis_semester;
      let text = text1.charAt(0).toUpperCase() + text1.slice(1);
      return `${text}-${item.tahun_semester}` === semester;
      //return `${item.jenis_semester}-${item.tahun_semester}` === semester
    });
    const totalSKS = semesterData.reduce(
      (acc, item) => acc + item.sks_matakuliah,
      0
    ); // Total SKS untuk semester ini
    const totalNilai = semesterData.reduce(
      (acc, item) => acc + item.nilai * item.sks_matakuliah,
      0
    ); // Total nilai * SKS untuk semester ini
    return totalNilai / totalSKS; // IPK = total nilai / total SKS
  });

  // Data chart
  const chartData = {
    labels: semesters, // Semester sebagai label chart
    datasets: [
      {
        label: "IP Semester",
        data: ipkValues,
        backgroundColor: "rgba(75,192,192,0.6)", // Warna batang
        borderColor: "rgba(75,192,192,1)", // Warna border batang
        borderWidth: 1,
      },
    ],
  };

  // Opsi chart dengan batang yang lebih kecil
  const chartOptions = {
    responsive: true, // Menyesuaikan ukuran chart dengan lebar layar
    scales: {
      x: {
        barPercentage: 0.5, // Memperkecil lebar batang (50% dari lebar kategori)
        categoryPercentage: 0.5, // Memperkecil lebar kategori
        ticks: {
          autoSkip: true, // Menyembunyikan label yang terlalu panjang
          maxRotation: 45, // Rotasi maksimum label X
          minRotation: 30, // Rotasi minimum label X
        }
      },
      y: {
        min: 0, // Minimum sumbu Y
        max: 4, // Maksimum sumbu Y
        ticks: {
          stepSize: 1, // Langkah sumbu Y (0, 1, 2, 3, 4)
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: true, // Menampilkan tooltip
        backgroundColor: 'rgba(0,0,0,0.7)', // Warna background tooltip
        titleColor: '#fff', // Warna judul tooltip
        bodyColor: '#fff', // Warna isi tooltip
      }
    }
  }; 

  return ( 
    <div style={{ width: '100%', height: '600px' }}>
      <h3>Chart IP Semester</h3>
      <Bar style={{width:"100%"}} data={chartData} options={chartOptions} /> {/* Menggunakan Bar chart */}
    </div>
  );
};

export default ChartIPSemester;
