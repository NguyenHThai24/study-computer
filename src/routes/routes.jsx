import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import MouseSkillPage from '../pages/MouseSkillPage';
import TypingPage from '../pages/TypingPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout route */}
      <Route element={<MainLayout />}>
        {/* Home */}
        <Route index element={<HomePage />} />

        {/* Other pages */}
        <Route path="mouse-skills" element={<MouseSkillPage />} />
        <Route path="typing-skills" element={<TypingPage />} />
      </Route>
    </Routes>
  );
}
