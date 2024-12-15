// kategorisasi.js
import { Grid } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import {
  Card as BootstrapCard,
  Container,
  Pagination,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap"; // Import Bootstrap Tabs and Card
import { BsExclamationCircleFill } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa"; // Remove FaRegFrown
import { useLocation } from "react-router-dom"; // Import useLocation
import ChartIPSemester from "./ChartIPSemester"; // Import ChartIPSemester component
import BasicPie from "./PieChart";

// Kegiatan Mahasiswa Component with Pagination
const KegiatanMahasiswa = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set number of items per page

  // Calculate the total pages based on the data length and items per page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the current page's data (items for the current page)
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const jenisKegiatan = [];
  for (const dataRow of data) {
    const { tingkat_kegiatan } = dataRow;
    if (!jenisKegiatan.includes(tingkat_kegiatan))
      jenisKegiatan.push(tingkat_kegiatan);
  }
  const dataPieChart = [];
  let ikegiatan = 0;
  for (const kegiatan of jenisKegiatan) {
    let totalKegiatan = 0;
    for (const dataRow of data) {
      if (dataRow.tingkat_kegiatan === kegiatan) totalKegiatan++;
    }
    const percentKegiatan = totalKegiatan;
    dataPieChart.push({
      id: 5000 + ikegiatan,
      value: percentKegiatan,
      label: kegiatan,
    });
    ikegiatan++;
  }

  console.log("dataPiechart", dataPieChart);

  return (
    <Grid container spacing={2}>
      {/* Left Column: Table and Pagination */}
      <Grid item xs={8} md={8} lg={8}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Kegiatan</th>
              <th>Tanggal Kegiatan</th>
              <th>Tingkat Kegiatan</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{row.nama_kegiatan}</td>
                <td>
                  {row.tanggal_kegiatan
                    ? moment(row.tanggal_kegiatan).format("DD/MM/YYYY")
                    : "-"}
                </td>
                <td>{row.tingkat_kegiatan}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          <Pagination.Prev
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
          />
        </Pagination>
      </Grid>

      {/* Right Column: Pie Chart */}
      <Grid
        container
        justifyContent="center"
        // alignItems="center"
        style={{ minHeight: "100%" }}
        item
        xs={4}
        md={4}
        lg={4}
      >
        <BasicPie data={dataPieChart} />
      </Grid>
    </Grid>
  );
};

// Kelulusan Mahasiswa Component with Pagination
const KelulusanMahasiswa = ({ kelulusan }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set number of items per page

  // Calculate the total pages based on the data length and items per page
  const totalPages = Math.ceil(kelulusan.length / itemsPerPage);

  // Get the current page's data (items for the current page)
  const currentData = kelulusan.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Tahun</th>
            <th>Semester</th>
            <th>Nama Mata Kuliah</th>
            <th>SKS</th>
            <th>Nilai</th>
            <th>Kategori</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{row.tahun_semester}</td>
              <td>{row.jenis_semester}</td>
              <td>{row.nama_matkul}</td>
              <td>{row.sks_matakuliah}</td>
              <td>{row.kode_nilai}</td>
              <td>{row.kategori_matakuliah}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Below Table */}
      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          <Pagination.Prev
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
          />
        </Pagination>
      </div>
      {/* Add the Chart component here */}
      <Grid
        container
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ChartIPSemester data={kelulusan} />{" "}
        {/* Pass kelulusan data to ChartIPSemester */}
      </Grid>
    </div>
  );
};

const Kategorisasi = () => {
  const location = useLocation();
  const student = location.state; // Get student data from location state

  // Function to determine the color based on percentage
  const getCardColor = (percentage) => {
    if (percentage < 50) return "danger"; // Red color for below 50
    if (percentage >= 50 && percentage <= 70) return "warning"; // Yellow color for 50-70
    return "success"; // Green color for 70 and above
  };

  const TextGraduate = (data) => {
    if (data < 50)
      return "Kemungkinan besar mahasiwa tidak akan lulus berdasarkan performa.";
    if (data >= 50 && data <= 70)
      return "Mahasiswa mungkin masih on-track lulus, tetapi perlu peningkatan performa";
    return "Kinerja Mahasiswa sangat baik, masih on-track untuk lulus tepat waktu";
  };
  const TextCategory = (data) => {
    if (data === "Memenuhi Standar")
      return "Mahasiswa sudah mencapai tingkat keterlibatan yang optimal dan memenuhi kriteria.";
    return "Mahasiswa sudah mengikuti cukup banyak kegiatan, namun masih perlu peningkatan dalam jenis kegiatan yang lebih berdampak.";
  };

  return (
    <Container>
      <BootstrapCard
        className="shadow-sm mb-4"
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h3 className="mb-3"> Data Mahasiswa</h3>
        {student ? (
          <div className="row">
            <div className="col-lg-6">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "150px 20px 1fr", // Columns for label, colon, and value
                  rowGap: "10px",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>Nama</strong>
                </div>
                <div>:</div>
                <div>{student?.nama_mahasiswa ?? "-"}</div>

                <div>
                  <strong>NPM</strong>
                </div>
                <div>:</div>
                <div>{student?.npm_mahasiswa ?? "-"}</div>

                <div>
                  <strong>Status</strong>
                </div>
                <div>:</div>
                <div
                  style={{
                    color:
                      student?.status_mahasiswa === "Lulus"
                        ? "green"
                        : student?.status_mahasiswa === "NonAktif"
                        ? "red"
                        : "blue",
                    fontWeight: "bold",
                  }}
                >
                  {student?.status_mahasiswa ?? "-"}
                </div>

                <div>
                  <strong>Jurusan</strong>
                </div>
                <div>:</div>
                <div>{student?.prodi_mahasiswa ?? "-"}</div>

                <div>
                  <strong>IPK</strong>
                </div>
                <div>:</div>
                <div style={{ fontWeight: "bold" }}>
                  {student?.ipk_mahasiswa
                    ? student?.ipk_mahasiswa.toFixed(2)
                    : "-"}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <BootstrapCard
                    className={`text-white bg-${getCardColor(
                      student?.persentase_kelulusan
                    )} mb-3`}
                    style={{
                      //  width: "45%",
                      // borderRadius: "12px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      padding: "15px 20px",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <BootstrapCard.Body>
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        <FaUserGraduate size={40} color="white" />
                      </div>
                      <BootstrapCard.Title
                        className="text-center"
                        // style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      ></BootstrapCard.Title>
                      <p
                        className="text-center"
                        style={{ fontSize: "1rem", margin: "10px 0 0" }}
                      >
                        Persentase Kelulusan :{" "}
                        <strong>
                          {student?.persentase_kelulusan
                            ? student.persentase_kelulusan.toFixed(1) // Membatasi 1 angka desimal
                            : "0.0"}{" "}
                          %
                        </strong>
                      </p>
                    </BootstrapCard.Body>
                    <BootstrapCard.Footer className="text-center">
                      {TextGraduate(student?.persentase_kelulusan)}
                    </BootstrapCard.Footer>
                  </BootstrapCard>
                </div>
                <div className="col-lg-12">
                  <BootstrapCard
                    className="text-white bg-info mb-3"
                    style={{
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      padding: "20px 25px",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <BootstrapCard.Body>
                      {/* Icon Section */}
                      <div className="d-flex justify-content-center align-items-center mb-4">
                        <BsExclamationCircleFill size={50} color="white" />
                      </div>
                      {/* Title Section */}
                      <BootstrapCard.Title className="text-center mb-3" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                        Kategori Mahasiswa
                      </BootstrapCard.Title>
                      {/* Kategori Mahasiswa Section */}
                      <div className="text-center mb-3">
                        <p className="lead" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                          {student?.kategori_mahasiswa ?? "Data not available"}
                        </p>
                      </div>
                    </BootstrapCard.Body>
                    
                    {/* Footer Section */}
                    <BootstrapCard.Footer className="text-center">
                      <div className="d-flex justify-content-between">
                        {/* Category Text Section */}
                        <div className="w-50">
                          <p className="mb-2" style={{ fontWeight: "bold" }}>Kategori:</p>
                          <p className="mb-0">{TextCategory(student?.kategori_mahasiswa)}</p>
                        </div>
                        
                        {/* Detailed Interests Section */}
                        <div className="w-50">
                          <p className="mb-2" style={{ fontWeight: "bold" }}>Peminatan:</p>
                          <p className="mb-0" style={{ fontSize: "1rem" }}>
                            <p>{Object.keys(student?.detailed_interests).join(', ')}</p>
                          </p>
                        </div>
                      </div>
                      
                      {/* Dominant Interest Section */}
                      <div className="mt-3">
                        <p className="mb-2" style={{ fontWeight: "bold" }}>Paling Diminati:</p>
                        <p className="mb-0" style={{ fontSize: "1rem" }}>
                          <p>{student?.dominant_interest ?? "Data not available"}</p>
                        </p>
                      </div>
                    </BootstrapCard.Footer>
                  </BootstrapCard>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div>
            <strong style={{ color: "red" }}>
              Mohon memilih mahasiswa terlebih dahulu
            </strong>
          </div>
        )}
      </BootstrapCard>

      {/* Tabs for Kelulusan, Kegiatan Mahasiswa */}
      <Tabs
        defaultActiveKey="Nilai"
        id="student-category-tabs"
        className="mb-3"
      >
        <Tab eventKey="Nilai" title="Nilai">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <KelulusanMahasiswa kelulusan={student.daftar_mata_kuliah} />
          </div>
        </Tab>

        <Tab eventKey="kegiatan-mahasiswa" title="Kegiatan Mahasiswa">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <KegiatanMahasiswa data={student.daftar_kegiatan} />
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Kategorisasi;