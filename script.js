let map;
let markers = [];
let currentCafe = null;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.5665, lng: 126.9780}, // 서울 중심 좌표
        zoom: 13
    });
}

function searchCafes() {
    const schoolName = document.getElementById('schoolInput').value;
    // 실제로는 여기서 API 호출을 통해 카페 데이터를 가져와야 합니다.
    // 이 예제에서는 더미 데이터를 사용합니다.
    const cafes = [
        {id: 1, name: "카페A", address: "서울시 강남구 123", lat: 37.5665, lng: 126.9780, rating: 4.5},
        {id: 2, name: "카페B", address: "서울시 서초구 456", lat: 37.5675, lng: 126.9790, rating: 4.2},
        {id: 3, name: "카페C", address: "서울시 종로구 789", lat: 37.5685, lng: 126.9800, rating: 4.8}
    ];

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
    
    // 리뷰 목록을 가져오는 함수 호출 (실제로는 서버에서 데이터를 가져와야 함)
    displayReviews(cafe.id);

    document.getElementById('cafeModal').style.display = 'block';
}

function displayReviews(cafeId) {
    // 실제로는 서버에서 리뷰 데이터를 가져와야 합니다.
    const reviews = [
        {text: "좋은 카페였습니다!", rating: 5},
        {text: "커피가 맛있어요", rating: 4}
    ];

    let reviewListHtml = '';
    reviews.forEach(review => {
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
    if (reviewText && currentCafe) {
        // 실제로는 서버에 리뷰를 저장해야 합니다.
        alert('리뷰가 제출되었습니다!');
        document.getElementById('reviewText').value = '';
        displayReviews(currentCafe.id);
    } else {
        alert('리뷰를 작성해주세요.');
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
                // 여기서 현재 위치 근처의 카페를 검색하는 함수를 호출해야 합니다.
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

window.onload = initMap;