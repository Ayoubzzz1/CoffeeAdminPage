import { Routes, Route } from 'react-router-dom';


import Personnelcard from '../Pages/Personnel/Personnelcard'
import Addpersonnel from './Personnel/addpersonnel';
import Managepersonnel from './Personnel/managepersonnel';
function PageRoutes() {
  return (
    <Routes>
      <Route path="/personnel/personnelcard" element={<Personnelcard />} />
      <Route path="/personnel/addpersonnel" element={<Addpersonnel />} />
      <Route path="/personnel/managepersonnel" element={<Managepersonnel />} />

 


    </Routes>
  );
}
export default PageRoutes;