import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi

const Card = ({ title, bgColor }) => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  return (
    <div
      className="card"
      style={{
        backgroundColor: bgColor,
        height: "150px",
        width: "100%", // Sesuaikan lebar kartu agar proporsional
        maxWidth: "500px", // Tambahkan batas maksimal lebar
        borderRadius: "15px",
        color: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Tambahkan shadow yang lebih halus
        marginBottom: "20px", // Spasi antar kartu
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px", // Tambahkan padding untuk ruang lebih luas
        textAlign: "center",
      }}
    >
      {/* Judul Kartu */}
      <h4
        style={{
          fontWeight: "bold",
          fontSize: "22px", // Ukuran font sedikit lebih besar
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>

      {/* Tombol View Details */}
      <button
        className="btn"
        style={{
          color: "white",
          fontSize: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Tambahkan efek background semi-transparan
          border: "1px solid white",
          borderRadius: "5px",
          padding: "5px 15px",
          textDecoration: "none",
          cursor: "pointer",
          transition: "background 0.3s ease",
        }}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.4)")
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
        }
        onClick={() => navigate("/Hasil")} // Navigasi ke halaman "hasil"
      >
        View Details &gt;
      </button>
    </div>
  );
}; 

export default Card;
 