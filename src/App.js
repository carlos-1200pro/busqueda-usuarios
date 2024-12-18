import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Card, Spinner } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function App() {
  // Estados
  const [query, setQuery] = useState("");  // Término de búsqueda
  const [users, setUsers] = useState([]);  // Usuarios encontrados
  const [loading, setLoading] = useState(false);  // Indicador de carga

  // Función para manejar el cambio en el input de búsqueda
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Función para manejar el envío del formulario y realizar la búsqueda
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Buscando usuarios con el término:", query); // Verificar el valor de la búsqueda
    setLoading(true);
    setUsers([]);  // Limpiar los resultados previos

    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users?name_like=${query}`);
      console.log("Usuarios encontrados:", response.data); // Verificar la respuesta de la API
      setUsers(response.data);  // Establecer los usuarios encontrados
    } catch (error) {
      console.error("Error al obtener los datos", error);
    } finally {
      setLoading(false);  // Detener la carga
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Búsqueda de Usuarios</h1>

      {/* Formulario de búsqueda */}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Busca por nombre"
              value={query}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Button type="submit" variant="primary" block>
              <FaSearch /> Buscar
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Mostrar cargando o resultados */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {users.length > 0 ? (
            users.map((user) => (
              <Col md={4} key={user.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                    <Card.Text>
                      <strong>Ciudad:</strong> {user.address.city}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center">No se encontraron usuarios con ese nombre.</div>
          )}
        </Row>
      )}
    </Container>
  );
}

export default App;
