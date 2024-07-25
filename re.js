document.addEventListener('DOMContentLoaded', () => {
    const recommendButton = document.getElementById('recommend-button');
    const cafeInfo = document.getElementById('cafe-info');
    const cafeName = document.getElementById('cafe-name');
    const cafeRatings = document.getElementById('cafe-ratings');
    const themeImage = document.getElementById('theme-image');

    const sinchonCafes = [
        { name: '스타벅스', ratings: { taste: 3, facility: 4, noise: 4 }, themes: ['date', 'relax'] },
        { name: '고르드', ratings: { taste: 5, facility: 1, noise: 3 }, themes: ['study'] },
        { name: '알로하', ratings: { taste: 3, facility: 2, noise: 4 }, themes: ['relax'] },
        { name: '파이홀', ratings: { taste: 4, facility: 3, noise: 3 }, themes: ['date', 'study'] },
        { name: '폴바셋', ratings: { taste: 5, facility: 4, noise: 5 }, themes: ['relax', 'date', 'study'] },
        { name: '커피빈', ratings: { taste: 3, facility: 3, noise: 2 }, themes: ['study'] }
    ];

    const yeonnamCafes = [
        { name: '카페레이어드', ratings: { taste: 4, facility: 2, noise: 3 }, themes: ['date', 'relax'] },
        { name: '달콤다정', ratings: { taste: 4, facility: 3, noise: 4 }, themes: ['date', 'study'] },
        { name: '땡스오트', ratings: { taste: 5, facility: 2, noise: 5 }, themes: ['study'] },
        { name: '테일러커피', ratings: { taste: 5, facility: 3, noise: 3 }, themes: ['relax', 'study'] },
        { name: '모모스커피', ratings: { taste: 5, facility: 4, noise: 4 }, themes: ['relax', 'date', 'study'] },
        { name: '커피리브레', ratings: { taste: 4, facility: 3, noise: 3 }, themes: ['study'] }
    ];

    const hongdaeCafes = [
        { name: '작당모의', ratings: { taste: 4, facility: 3, noise: 4 }, themes: ['date', 'relax'] },
        { name: '샌드스톤커피랩', ratings: { taste: 5, facility: 5, noise: 5 }, themes: ['study'] },
        { name: '스타벅스', ratings: { taste: 4, facility: 3, noise: 3 }, themes: ['relax', 'study'] },
        { name: '투썸플레이스', ratings: { taste: 4, facility: 3, noise: 3 }, themes: ['date', 'study'] },
        { name: '망원동티라미수', ratings: { taste: 5, facility: 4, noise: 4 }, themes: ['relax', 'date'] },
        { name: '커피몽타주', ratings: { taste: 5, facility: 5, noise: 4 }, themes: ['relax', 'study'] }
    ];

    const getRandomCafe = (cafes) => {
        const randomIndex = Math.floor(Math.random() * cafes.length);
        return cafes[randomIndex];
    };

    recommendButton.addEventListener('click', () => {
        const location = document.getElementById('location').value;
        const theme = document.getElementById('theme').value;

        let selectedCafes = [];

        if (location === 'sinchon') {
            selectedCafes = sinchonCafes.filter(cafe => cafe.themes.includes(theme));
        } else if (location === 'yeonnam') {
            selectedCafes = yeonnamCafes.filter(cafe => cafe.themes.includes(theme));
        } else if (location === 'hongdae') {
            selectedCafes = hongdaeCafes.filter(cafe => cafe.themes.includes(theme));
        }

        if (selectedCafes.length > 0) {
            const randomCafe = getRandomCafe(selectedCafes);
            cafeName.textContent = randomCafe.name;
            cafeRatings.textContent = `맛: ${randomCafe.ratings.taste}, 시설: ${randomCafe.ratings.facility}, 소음: ${randomCafe.ratings.noise}`;
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
