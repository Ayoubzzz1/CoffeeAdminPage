import { Routes, Route } from 'react-router-dom';

import Personnelcard from '../Pages/Personnel/Personnelcard';
import Addpersonnel from './Personnel/addpersonnel';
import Managepersonnel from './Personnel/managepersonnel';
import ViewCard from './Personnel/ViewCard';
import Bookingadmin from './Booking/Bookingadmin';
import Bookinguser from './Booking/Bookinguser';
import Menuitems from './Menu/Menuitems';
import Menushow from './Menu/Menushow';
import Managemenu from './Menu/Managemenu';
import Personneldate from './Personnel/Personneldate';
import Events from './Events/Events';
import Login from './Auth/Login';
function PageRoutes() {
  return (
    <Routes>
      <Route path="/personnel/personnelcard" element={<Personnelcard />} />
      <Route path="/personnel/addpersonnel" element={<Addpersonnel />} />
      <Route path="/personnel/editepersonnel/managepersonnel" element={<Managepersonnel />} />
      <Route path="/personnel/editepersonnel/Personneldate" element={<Personneldate />} />
      <Route path="/login" element={<Login />} />


      
      {/* Route for the ViewCard component to display individual personnel details */}
      <Route path="/personnel/View/:id" element={<ViewCard />} />
      <Route path="/booking/bookingshow" element={<Bookingadmin />} />

      <Route path="/booking/bookinguser" element={<Bookinguser />} />
      <Route path="/menu/addmenu" element={<Menuitems />} />
      <Route path="/menu/menuitems" element={<Menushow />} />
      <Route path="/menu/managemenu" element={<Managemenu />} />
      <Route path="/menu/managemenu" element={<Managemenu />} />
      <Route path="/event" element={<Events />} />





      
      {/* This route will match /personnel/view/:id and display the ViewCard component */}
    </Routes>
  );
}

export default PageRoutes;
