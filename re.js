document.addEventListener('DOMContentLoaded', () => {
    const recommendButton = document.getElementById('recommend-button');
    const cafeInfo = document.getElementById('cafe-info');
    const cafeName = document.getElementById('cafe-name');
    const cafeRatings = document.getElementById('cafe-ratings');
    const themeImage = document.getElementById('theme-image');

    const sinchonCafes = {
        date: ['스타벅스', '파이홀', '폴바셋'],
        relax: ['스타벅스', '파이홀', '폴바셋', '알로하'],
        study: ['고르드', '커피빈 신촌점']
    };

    const yeonnamCafes = {
        date: ['카페 레이어드', '터틀힙', '클로리스'],
        relax: ['카페 레이어드', '터틀힙', '클로리스', '카페공명'],
        study: ['땡스오트', '테일러커피']
    };

    const hongdaeCafes = {
        date: ['작당모의', '망원동티라미수', '투썸플레이스'],
        relax: ['작당모의', '망원동티라미수', '투썸플레이스', '커피몽타주'],
        study: ['샌드스톤커피랩', '커피몽타주']
    };

    const getRandomCafe = (cafes) => {
        const randomIndex = Math.floor(Math.random() * cafes.length);
        return cafes[randomIndex];
    };

    recommendButton.addEventListener('click', () => {
        const location = document.getElementById('location').value;
        const theme = document.getElementById('theme').value;

        let selectedCafes = [];

        if (location === 'sinchon') {
            selectedCafes = sinchonCafes[theme];
        } else if (location === 'yeonnam') {
            selectedCafes = yeonnamCafes[theme];
        } else if (location === 'hongdae') {
            selectedCafes = hongdaeCafes[theme];
        }

        if (selectedCafes.length > 0) {
            const randomCafe = getRandomCafe(selectedCafes);
            cafeName.textContent = randomCafe;
            cafeRatings.textContent = `장소: ${location}, 테마: ${theme}`;
            cafeInfo.classList.remove('hidden');
        } else {
            cafeName.textContent = '조건에 맞는 카페가 없습니다.';
            cafeRatings.textContent = '';
            cafeInfo.classList.remove('hidden');
        }

        // Change theme image based on selected theme
        if (theme === 'date') {
            themeImage.src = '/re_img/002.png';
        } else if (theme === 'relax') {
            themeImage.src = '/re_img/003.png';
        } else if (theme === 'study') {
            themeImage.src = '/re_img/004.png';
        }
    });
});
