import EditPost from '@/pages/admin-post/pages/edit/EditPost';
import LoadPost from '@/pages/admin-post/pages/load/LoadPost';
import Post from '@/pages/admin-post/pages/root/Post';
import { Route, Routes } from 'react-router-dom';

export default function PostRouter() {
  return (
    <Routes>
      <Route path='/' element={<Post />}></Route>
      <Route path='cargar' element={<LoadPost />}></Route>
      <Route path='editar' element={<EditPost />}></Route>
    </Routes>
  );
}
