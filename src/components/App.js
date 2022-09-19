import '../App.css';
import { Container } from 'react-bootstrap'
import SignUp from './SignUp';
import SignIn from './SignIn'
import { AuthProvider } from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Profile from './Profile';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
          <div className="w-100" style={{maxWidth:"400px"}}>
            <Routes>
              <Route index element={<SignUp/>}/>
              <Route path='/sign-in' element={<SignIn/>}/>
              <Route path='/profile' element={<Profile/>} />
            </Routes>
          </div>
        </Container>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false} />
      </AuthProvider>
    </Router>
  );
}

export default App;