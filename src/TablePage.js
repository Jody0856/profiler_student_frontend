import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Pagination, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TablePage = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Set number of items per page

  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/students")
      .then((response) => {
        console.log('response',response.data)
        const data = response.data.students
        const validatedData = data.map((student) => ({
          ...student,
          ipk_mahasiswa: student.ipk_mahasiswa || 0, // Default IPK if null
        }));
        setStudents(validatedData);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Lulus":
        return <Badge bg="success">{status}</Badge>;
      case "Aktif":
        return <Badge bg="primary">{status}</Badge>;
      case "NonAktif":
        return <Badge bg="danger">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const uniqueMajors = [...new Set(students.map((student) => student.prodi_mahasiswa))];

  const filteredStudents = students
    .filter(
      (student) =>
        (student.nama_mahasiswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.npm_mahasiswa.includes(searchTerm)) &&
        (statusFilter === "" || student.status_mahasiswa === statusFilter) &&
        (majorFilter === "" || student.prodi_mahasiswa === majorFilter)
    )
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.nama_mahasiswa.localeCompare(b.nama_mahasiswa);
      } else if (sortOption === "gpa") {
        return (b.ipk_mahasiswa || 0) - (a.ipk_mahasiswa || 0); // Sort by GPA
      }
      return 0;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentPageData = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fungsi untuk memprediksi data mahasiswa
  const predictStudentStatus = (npm) => {
    const formData = new FormData();
    formData.append('npm_mahasiswa',npm)
    axios
      .post("http://127.0.0.1:8000/predict",formData )
      .then((response) => {
        console.log('response',response.data)
        navigate("/kategorisasi", { state: response.data });
      })
      .catch((error) => {
        console.log('error',error)
        console.error("Error predicting student status:", error);
        alert("Gagal melakukan prediksi. Silakan coba lagi.");
        
        
      });
  };

  // Generate pagination items
  const pageItems = [];
  const maxVisiblePages = 10; // Maximum number of visible pages
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let page = startPage; page <= endPage; page++) {
    pageItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (startPage > 1) {
    pageItems.unshift(<Pagination.Ellipsis key="start-ellipsis" />);
  }
  if (endPage < totalPages) {
    pageItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
  }
 
  return ( 
    <div> 
      {/* Filter and Search Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by name or NPM..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        <Form.Select
          className="w-25"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="Lulus">Lulus</option>
          <option value="Aktif">Aktif</option>
          <option value="Drop-out (putus studi)">Drop-out (putus studi)</option>
          <option value="Keluar">Keluar</option>
          {/* <option value="NonAktif">NonAktif</option> */}
        </Form.Select>
  
        <Form.Select
          className="w-25"
          value={majorFilter}
          onChange={(e) => setMajorFilter(e.target.value)}
        >
          <option value="">Filter by Major</option>
          {uniqueMajors.map((major, index) => (
            <option key={index} value={major}>
              {major}
            </option>
          ))}
        </Form.Select>
  
        <Form.Select
          className="w-25"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">Sort by Name (A-Z)</option>
          <option value="gpa">Sort by IPK (High to Low)</option>
        </Form.Select>
      </div>
  
      {/* Table and Pagination Wrapper */}
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name/NPM</th>
              <th>Status</th>
              <th>Jurusan</th>
              <th>IPK</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((student, index) => (
              <tr key={index}>
                <td>
                  {student.nama_mahasiswa} <br /> {student.npm_mahasiswa}
                </td>
                <td>{getStatusBadge(student.status_mahasiswa)}</td>
                <td>{student.prodi_mahasiswa}</td>
                <td>{(student.ipk_mahasiswa || 0).toFixed(2)}</td> {/* Validasi IPK */}
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => predictStudentStatus(student.npm_mahasiswa)}
                  >
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        {/* Pagination Centered */}
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {pageItems}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default TablePage;