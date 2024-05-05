import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import BookResource from './pages/CreateBookResource';
import DashClassroom from './pages/ViewBookResource';
import UpdateBookResource from './pages/UpdateBookResource';

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/book-resource" element={<BookResource />}/>
        <Route path="/book-resource-dash" element={<DashClassroom />}/>
        <Route path="/update-sportsbooking/:resourceId" element={<UpdateBookResource/>} />

  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
