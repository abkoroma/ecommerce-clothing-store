
import { Outlet } from 'react-router-dom';
import CategoryDirectory from '../../components/category-directory/category-directory.component';
  
  export default function Home() {
    return (
        <div>
          <CategoryDirectory />
          <Outlet />
        </div>
    );
  }
  