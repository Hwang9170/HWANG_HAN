document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  // 기본적인 로그인 검증 (이 부분은 서버 측에서 실제로 구현해야 함)
  if (username === 'user' && password === 'password') {
      errorMessage.textContent = '';
      alert('로그인 성공!');
      // 실제 로그인 시 홈 페이지로 이동하거나 다른 동작 수행
      // window.location.href = 'home.html'; // 예: 로그인 후 홈 페이지로 이동
  } else {
      errorMessage.textContent = '아이디 또는 비밀번호가 잘못되었습니다.';
  }
});
