import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Header from './component/Header'
import Projects from './pages/Projects'
import Footer from './component/Footer'
import PrivateRoute from './component/PrivateRoute'
import CreatePost from './pages/CreatePost'
import IsadminPrivateRoute from './component/IsadminPrivateRoute'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './component/ScrollToTop'
import Search from './pages/Search'


export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup/>} />
      <Route element={<PrivateRoute /> } >
      <Route path='/dashboard' element={ <Dashboard /> } />
      </Route>
      <Route element={<IsadminPrivateRoute />}>
        <Route path='/create-post' element={ <CreatePost /> } />
        <Route path='/update-post/:postid' element={<UpdatePost />} />
      </Route>
      <Route path='/projects' element={ <Projects /> } />
      <Route path='/post/:postslug' element={<PostPage />} />
      <Route path='/search' element={<Search />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}
