document.addEventListener('DOMContentLoaded', () => {
  const preferencesForm = document.getElementById('preferences-form');
  const cafeList = document.getElementById('cafe-list');

  const sinchonCafes = [
      { name: '스타벅스', ratings: { taste: 3, facility: 4, noise: 4 } },
      { name: '고르드', ratings: { taste: 5, facility: 1, noise: 3 } },
      { name: '알로하', ratings: { taste: 3, facility: 2, noise: 4 } },
      { name: '파이홀', ratings: { taste: 4, facility: 3, noise: 3 } },
      { name: '폴바셋', ratings: { taste: 5, facility: 4, noise: 5 } },
      { name: '커피빈', ratings: { taste: 3, facility: 3, noise: 2 } }
  ];

  const yeonnamCafes = [
      { name: '카페레이어드', ratings: { taste: 4, facility: 2, noise: 3 } },
      { name: '달콤다정', ratings: { taste: 4, facility: 3, noise: 4 } },
      { name: '땡스오트', ratings: { taste: 5, facility: 2, noise: 5 } },
      { name: '테일러커피', ratings: { taste: 5, facility: 3, noise: 3 } },
      { name: '모모스커피', ratings: { taste: 5, facility: 4, noise: 4 } },
      { name: '커피리브레', ratings: { taste: 4, facility: 3, noise: 3 } }
  ];

  const hongdaeCafes = [
      { name: '작당모의', ratings: { taste: 4, facility: 3, noise: 4 } },
      { name: '샌드스톤커피랩', ratings: { taste: 5, facility: 5, noise: 5 } },
      { name: '스타벅스', ratings: { taste: 4, facility: 3, noise: 3 } },
      { name: '투썸플레이스', ratings: { taste: 4, facility: 3, noise: 3 } },
      { name: '망원동티라미수', ratings: { taste: 5, facility: 4, noise: 4 } },
      { name: '커피몽타주', ratings: { taste: 5, facility: 5, noise: 4 } }
  ];

  const recommendCafes = (location, preferences) => {
      let cafes = [];
      switch (location) {
          case 'sinchon':
              cafes = sinchonCafes;
              break;
          case 'yeonnam':
              cafes = yeonnamCafes;
              break;
          case 'hongdae':
              cafes = hongdaeCafes;
              break;
          default:
              return [];
      }

      const filteredCafes = cafes.filter(cafe =>
          cafe.ratings.facility >= preferences.facility &&
          cafe.ratings.noise >= preferences.noise &&
          cafe.ratings.taste >= preferences.taste
      );

      return filteredCafes;
  };

  const displayCafes = (cafes) => {
      cafeList.innerHTML = '';
      cafes.forEach(cafe => {
          const cafeCard = document.createElement('div');
          cafeCard.className = 'cafe-card';
          cafeCard.innerHTML = `
              <h3>${cafe.name}</h3>
              <p>Taste: ${cafe.ratings.taste}</p>
              <p>Facility: ${cafe.ratings.facility}</p>
              <p>Noise: ${cafe.ratings.noise}</p>
          `;
          cafeList.appendChild(cafeCard);
      });
  };

  preferencesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const location = document.getElementById('location').value;
      const facilityRating = document.getElementById('facility-rating').value;
      const noiseRating = document.getElementById('noise-rating').value;
      const tasteRating = document.getElementById('taste-rating').value;

      const userPreferences = {
          facility: parseInt(facilityRating),
          noise: parseInt(noiseRating),
          taste: parseInt(tasteRating)
      };

      const recommendedCafes = recommendCafes(location, userPreferences);
      displayCafes(recommendedCafes);
  });
});
