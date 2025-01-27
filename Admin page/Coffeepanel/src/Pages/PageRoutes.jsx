import { Routes, Route } from 'react-router-dom';

import Personnelcard from '../Pages/Personnel/Personnelcard';
import Addpersonnel from './Personnel/addpersonnel';
import Managepersonnel from './Personnel/managepersonnel';
import ViewCard from './Personnel/ViewCard';

function PageRoutes() {
  return (
    <Routes>
      <Route path="/personnel/personnelcard" element={<Personnelcard />} />
      <Route path="/personnel/addpersonnel" element={<Addpersonnel />} />
      <Route path="/personnel/managepersonnel" element={<Managepersonnel />} />
      
      {/* Route for the ViewCard component to display individual personnel details */}
      <Route path="/personnel/View/:id" element={<ViewCard />} />
      {/* This route will match /personnel/view/:id and display the ViewCard component */}
    </Routes>
  );
}

export default PageRoutes;
