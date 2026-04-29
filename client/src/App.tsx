import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Optimizer from "./components/Optimizer";
import Container from "./components/Container";
import { ResumeProvider } from "./context/ResumeContext";

function App() {
    return (
        <ResumeProvider>
            <BrowserRouter>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/optimize" element={<Optimizer />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </ResumeProvider>
    );
}

export default App;
