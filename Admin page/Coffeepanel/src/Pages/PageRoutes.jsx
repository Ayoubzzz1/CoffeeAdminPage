import { Routes, Route } from 'react-router-dom';


import Personnelcard from '../Pages/Personnel/Personnelcard'
function PageRoutes() {
  return (
    <Routes>
      <Route path="/personnel/personnelcard" element={<Personnelcard />} />
 


    </Routes>
  );
}
export default PageRoutes;