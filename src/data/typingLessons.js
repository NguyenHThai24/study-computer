export const typingLessons = [
  {
    id: 1,
    title: 'Bài 1: Cơ bản',
    content:
      'Học gõ phím là kỹ năng quan trọng trong thời đại số. Luyện tập mỗi ngày giúp bạn thành thạo hơn.',
    difficulty: 'Dễ',
  },
  {
    id: 2,
    title: 'Bài 2: Câu dài',
    content:
      'Công nghệ thông tin phát triển nhanh chóng, đòi hỏi mọi người phải không ngừng học hỏi và trau dồi kiến thức mới.',
    difficulty: 'Trung bình',
  },
  {
    id: 3,
    title: 'Bài 3: Thử thách',
    content:
      'Trí tuệ nhân tạo và máy học đang thay đổi cách chúng ta làm việc, giao tiếp và sáng tạo trong thế kỷ 21.',
    difficulty: 'Khó',
  },
  {
    id: 4,
    title: 'Bài 4: Kỹ thuật số',
    content:
      'Chuyển đổi số không chỉ là xu hướng mà còn là yêu cầu tất yếu để phát triển trong kỷ nguyên công nghệ 4.0.',
    difficulty: 'Trung bình',
  },
  {
    id: 5,
    title: 'Bài 5: Lập trình',
    content:
      'Ngôn ngữ lập trình giúp con người giao tiếp với máy tính, tạo ra những ứng dụng thông minh phục vụ cuộc sống.',
    difficulty: 'Khó',
  },
  {
    id: 6,
    title: 'Bài 6: Internet',
    content:
      'Internet đã kết nối thế giới, biến hành tinh rộng lớn trở thành một ngôi làng toàn cầu nơi mọi người có thể tương tác.',
    difficulty: 'Dễ',
  },
];

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
