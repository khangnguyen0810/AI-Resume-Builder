import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Optimizer from "./components/Optimizer";
import Container from "./components/Container";
import { ResumeProvider } from "./context/ResumeContext";
import Evaluation from "./components/Evaluation";

function App() {
    return (
        <ResumeProvider>
            <BrowserRouter>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/optimize" element={<Optimizer />} />
                        <Route path="/evaluate" element={<Evaluation />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </ResumeProvider>
    );
}

export default App;
