import { useState } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataProvider from './context/DataProvider';
import Home from './components/home/Home';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Login from './components/account/Login';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/header/Header';

const App = () => {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <div>
      <DataProvider>
        <BrowserRouter>
          <Box style={{ marginTop: 64 }}>
            <Header isAuthenticated={isAuthenticated} />
            <Routes>

              {/* Public routes */}
              <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/' element={<Home />} />

              {/* Private routes */}
              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/create' element={<CreatePost />} />
                <Route path='/details/:id' element={<DetailView />} />
                <Route path='/update/:id' element={<Update />} />
              </Route>

            </Routes>

          </Box>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
};

export default App;
