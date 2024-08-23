document.getElementById('search-btn').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const mentors = [
        { name: 'John Doe', field: 'Software Engineering' },
        { name: 'Jane Smith', field: 'Data Science' },
        { name: 'Emily Johnson', field: 'Marketing' },
        { name: 'Hwang', field: 'IT' }
    ];

    // 검색어를 기준으로 멘토 리스트를 필터링
    const filteredMentors = mentors.filter(mentor => 
        mentor.name.toLowerCase().includes(searchInput) ||
        mentor.field.toLowerCase().includes(searchInput)
    );

    // 필터링된 멘토를 화면에 표시
    displayMentors(filteredMentors);
});

function displayMentors(mentors) {
    const mentorsDiv = document.getElementById('mentors');
    mentorsDiv.innerHTML = '';

    if (mentors.length === 0) {
        mentorsDiv.innerHTML = '<p>검색 결과가 없습니다.</p>';
    } else {
        mentors.forEach(mentor => {
            const mentorCard = document.createElement('div');
            mentorCard.className = 'mentor-card';
            mentorCard.innerHTML = `
                <h3>${mentor.name}</h3>
                <p>${mentor.field}</p>
            `;
            mentorsDiv.appendChild(mentorCard);
        });
    }
}

// 초기 추천 멘토 리스트를 화면에 표시
displayMentors([
    { name: 'John Doe', field: 'Software Engineering' },
    { name: 'Jane Smith', field: 'Data Science' },
    { name: 'Emily Johnson', field: 'Marketing' },
    { name: 'Hwang', field: 'IT' }
]);
