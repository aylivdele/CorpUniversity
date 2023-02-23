import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Content from './Content/Content';

function App() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#">Corp University</Navbar.Brand>
                </Container>
            </Navbar>
            <Content />
        </>
    );
}

export default App;
