document.addEventListener('DOMContentLoaded', () => {
  const preferencesForm = document.getElementById('preferences-form');
  const cafeList = document.getElementById('cafe-list');
  
  // Sample cafe data
  const cafes = [
      { name: 'Cafe A', ratings: { facility: 5, noise: 3, taste: 4 }},
      { name: 'Cafe B', ratings: { facility: 3, noise: 5, taste: 5 }},
      { name: 'Cafe C', ratings: { facility: 4, noise: 2, taste: 3 }},
      { name: 'Cafe D', ratings: { facility: 2, noise: 4, taste: 4 }},
      { name: 'Cafe E', ratings: { facility: 5, noise: 5, taste: 5 }},
      // More cafes...
  ];

  // Function to filter and display cafes based on user preferences
  const recommendCafes = (preferences) => {
      const filteredCafes = cafes.filter(cafe => 
          cafe.ratings.facility >= preferences.facility &&
          cafe.ratings.noise >= preferences.noise &&
          cafe.ratings.taste >= preferences.taste
      );
      
      displayCafes(filteredCafes);
  };

  // Function to display cafes
  const displayCafes = (cafes) => {
      cafeList.innerHTML = '';
      cafes.forEach(cafe => {
          const cafeCard = document.createElement('div');
          cafeCard.className = 'cafe-card';
          cafeCard.innerHTML = `
              <h3>${cafe.name}</h3>
              <p>Facility: ${cafe.ratings.facility}</p>
              <p>Noise: ${cafe.ratings.noise}</p>
              <p>Taste: ${cafe.ratings.taste}</p>
          `;
          cafeList.appendChild(cafeCard);
      });
  };

  // Handle form submission
  preferencesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const facilityRating = document.getElementById('facility-rating').value;
      const noiseRating = document.getElementById('noise-rating').value;
      const tasteRating = document.getElementById('taste-rating').value;
      
      const userPreferences = {
          facility: parseInt(facilityRating),
          noise: parseInt(noiseRating),
          taste: parseInt(tasteRating)
      };
      
      recommendCafes(userPreferences);
  });
});
