document.addEventListener('DOMContentLoaded', () => {
  const chatOutput = document.getElementById('chat-output');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

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

  let step = 0;
  let userPreferences = {};
  let location;

  const appendMessage = (message, sender) => {
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      messageElement.className = sender;
      chatOutput.appendChild(messageElement);
      chatOutput.scrollTop = chatOutput.scrollHeight;
  };

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

  const processUserInput = (input) => {
      switch (step) {
          case 0:
              location = input.toLowerCase();
              appendMessage('시설 등급(1-5) 최소 어느 정도를 원하시나요?', 'bot');
              step++;
              break;
          case 1:
              userPreferences.facility = parseInt(input);
              appendMessage('소음 등급(1-5) 최소 어느 정도를 원하시나요?', 'bot');
              step++;
              break;
          case 2:
              userPreferences.noise = parseInt(input);
              appendMessage('맛 등급(1-5) 최소 어느 정도를 원하시나요?', 'bot');
              step++;
              break;
          case 3:
              userPreferences.taste = parseInt(input);
              const recommendedCafes = recommendCafes(location, userPreferences);
              if (recommendedCafes.length > 0) {
                  appendMessage('조건에 맞는 카페를 추천합니다:', 'bot');
                  recommendedCafes.forEach(cafe => {
                      appendMessage(`추천 카페: ${cafe.name}, 맛: ${cafe.ratings.taste}, 시설: ${cafe.ratings.facility}, 소음: ${cafe.ratings.noise}`, 'bot');
                  });
              } else {
                  appendMessage('조건에 맞는 카페가 없습니다.', 'bot');
              }
              step = 0;
              appendMessage('다른 지역의 카페를 찾고 싶으시면 지역명을 입력해주세요. (Sinchon, Yeonnam, Hongdae)', 'bot');
              break;
          default:
              appendMessage('잘못된 입력입니다. 다시 시도해주세요.', 'bot');
              step = 0;
              appendMessage('어느 지역의 카페를 찾고 계신가요? (Sinchon, Yeonnam, Hongdae)', 'bot');
              break;
      }
  };

  appendMessage('어느 지역의 카페를 찾고 계신가요? (Sinchon, Yeonnam, Hongdae)', 'bot');

  sendButton.addEventListener('click', () => {
      const userMessage = userInput.value.trim();
      if (userMessage) {
          appendMessage(userMessage, 'user');
          processUserInput(userMessage);
          userInput.value = '';
      }
  });

  userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          sendButton.click();
      }
  });
});
