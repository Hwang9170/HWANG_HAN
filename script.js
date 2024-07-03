let map;
let markers = [];
let currentCafe = null;

// localStorage에서 카페 데이터 불러오기 또는 초기 데이터 설정
let cafes = JSON.parse(localStorage.getItem('cafes')) || [
    {id: 1, name: "카페A", address: "서울시 강남구 123", lat: 37.5665, lng: 126.9780, rating: 4.5},
    {id: 2, name: "카페B", address: "서울시 서초구 456", lat: 37.5675, lng: 126.9790, rating: 4.2},
    {id: 3, name: "카페C", address: "서울시 종로구 789", lat: 37.5685, lng: 126.9800, rating: 4.8}
];

// localStorage에서 리뷰 데이터 불러오기 또는 초기화
let reviews = JSON.parse(localStorage.getItem('reviews')) || {};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.5665, lng: 126.9780},
        zoom: 13
    });
}

function searchCafes() {
    const schoolName = document.getElementById('schoolInput').value;
    // 실제로는 여기서 학교 이름을 기반으로 카페를 필터링해야 합니다.
    displayCafes(cafes);
}

function displayCafes(cafes) {
    clearMarkers();
    let bounds = new google.maps.LatLngBounds();
    let cafeListHtml = '<h2>주변 카페 목록</h2>';

    cafes.forEach(cafe => {
        const marker = new google.maps.Marker({
            position: {lat: cafe.lat, lng: cafe.lng},
            map: map,
            title: cafe.name
        });
        markers.push(marker);
        bounds.extend(marker.getPosition());

        marker.addListener('click', () => showCafeDetails(cafe));

        cafeListHtml += `
            <div class="cafe-item" onclick="showCafeDetails(${JSON.stringify(cafe)})">
                <h3>${cafe.name}</h3>
                <p>${cafe.address}</p>
                <p>평점: ${cafe.rating} <span class="star">★</span></p>
            </div>
        `;
    });

    map.fitBounds(bounds);
    document.getElementById('cafeList').innerHTML = cafeListHtml;
}

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

function showCafeDetails(cafe) {
    currentCafe = cafe;
    document.getElementById('cafeName').textContent = cafe.name;
    document.getElementById('cafeAddress').textContent = cafe.address;
    document.getElementById('cafeRating').innerHTML = `평점: ${cafe.rating} <span class="star">★</span>`;
    
    displayReviews(cafe.id);

    document.getElementById('cafeModal').style.display = 'block';
}

function displayReviews(cafeId) {
    const cafeReviews = reviews[cafeId] || [];

    let reviewListHtml = '';
    cafeReviews.forEach(review => {
        reviewListHtml += `
            <div class="review-item">
                <p>${review.text}</p>
                <p>평점: ${review.rating} <span class="star">★</span></p>
            </div>
        `;
    });

    document.getElementById('reviewList').innerHTML = reviewListHtml;
}

function submitReview() {
    const reviewText = document.getElementById('reviewText').value;
    const rating = 5; // 실제로는 사용자가 선택할 수 있게 해야 합니다

    if (reviewText && currentCafe) {
        if (!reviews[currentCafe.id]) {
            reviews[currentCafe.id] = [];
        }
        reviews[currentCafe.id].push({ text: reviewText, rating: rating });
        
        // localStorage에 리뷰 저장
        localStorage.setItem('reviews', JSON.stringify(reviews));

        alert('리뷰가 제출되었습니다!');
        document.getElementById('reviewText').value = '';
        displayReviews(currentCafe.id);

        // 카페 평점 업데이트
        updateCafeRating(currentCafe.id);
    } else {
        alert('리뷰를 작성해주세요.');
    }
}

function updateCafeRating(cafeId) {
    const cafeReviews = reviews[cafeId] || [];
    if (cafeReviews.length > 0) {
        const totalRating = cafeReviews.reduce((sum, review) => sum + review.rating, 0);
        const newRating = totalRating / cafeReviews.length;
        
        const cafeIndex = cafes.findIndex(cafe => cafe.id === cafeId);
        if (cafeIndex !== -1) {
            cafes[cafeIndex].rating = newRating.toFixed(1);
            // localStorage에 업데이트된 카페 정보 저장
            localStorage.setItem('cafes', JSON.stringify(cafes));
            displayCafes(cafes);
        }
    }
}

function useCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                map.setZoom(15);
                alert('현재 위치를 사용합니다. 이 위치 주변의 카페를 검색합니다.');
            },
            () => {
                alert('위치 정보를 가져올 수 없습니다.');
            }
        );
    } else {
        alert('브라우저가 위치 정보를 지원하지 않습니다.');
    }
}

// 모달 닫기
document.querySelector('.close').onclick = function() {
    document.getElementById('cafeModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('cafeModal')) {
        document.getElementById('cafeModal').style.display = 'none';
    }
}

window.onload = function() {
    initMap();
    displayCafes(cafes);
};

// 기존 코드는 그대로 유지하고 다음 함수들을 추가합니다.

function getAIRecommendation() {
    const userPreference = prompt("어떤 분위기의 카페를 원하시나요? (예: 조용한, 활기찬, 아늑한 등)");
    if (userPreference) {
        const recommendation = simulateAIRecommendation(userPreference, cafes);
        displayAIRecommendation(recommendation);
    }
}

function simulateAIRecommendation(preference, cafes) {
    // 실제로는 이 부분에 OpenAI API 호출 등이 들어가야 합니다.
    // 여기서는 간단한 로직으로 시뮬레이션합니다.
    const keywords = {
        '조용한': ['스터디', '독서', '조용한 분위기'],
        '활기찬': ['대화', '모임', '밝은 분위기'],
        '아늑한': ['아늑한', '포근한', '편안한']
    };

    const matchingKeywords = keywords[preference] || Object.values(keywords).flat();
    
    const recommendedCafe = cafes[Math.floor(Math.random() * cafes.length)];
    
    return {
        cafe: recommendedCafe,
        reason: `${recommendedCafe.name}는 ${matchingKeywords[Math.floor(Math.random() * matchingKeywords.length)]} 분위기로 유명합니다. ${preference} 분위기를 찾으시는 당신에게 잘 맞을 것 같습니다.`
    };
}

function displayAIRecommendation(recommendation) {
    const aiRecommendationDiv = document.getElementById('aiRecommendation');
    aiRecommendationDiv.innerHTML = `
        <h3>AI 추천 카페</h3>
        <p><strong>${recommendation.cafe.name}</strong></p>
        <p>${recommendation.cafe.address}</p>
        <p>평점: ${recommendation.cafe.rating} <span class="star">★</span></p>
        <p>${recommendation.reason}</p>
        <button onclick="showCafeDetails(${JSON.stringify(recommendation.cafe)})">상세 정보 보기</button>
    `;
}

// window.onload 함수를 수정하여 AI 추천 결과를 초기화합니다.
window.onload = function() {
    initMap();
    displayCafes(cafes);
    document.getElementById('aiRecommendation').innerHTML = '';
};