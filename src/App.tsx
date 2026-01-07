import Characters from './pages/Characters'
import CharacterDetails from './pages/CharacterDetails'
import {Routes, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <div className="container">
        <header className="navbar">
          <Link to="/" className="brand">
            Rick & Morty Explorer
          </Link>
        </header>

        <Routes>
          <Route path="/" element={<Characters/>} />
          <Route path="/character/:id" element={<CharacterDetails/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
