document.addEventListener('DOMContentLoaded', () => {
    const chatOutput = document.getElementById('chat-output');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const inputContainer = document.getElementById('input-container');
  
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
  
    const scrollToBottom = () => {
        chatOutput.scrollTop = chatOutput.scrollHeight;
    };
  
    const appendMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = message;
        messageElement.className = sender;
        chatOutput.appendChild(messageElement);
        scrollToBottom();
    };
  
    const appendRatingButtons = (preferenceType) => {
        const ratings = ['상관없음', '별로', '보통', '중요', '매우 중요'];
        const buttonContainer = document.createElement('div');
  
        ratings.forEach((rating, index) => {
            const button = document.createElement('button');
            button.textContent = rating;
            button.className = 'rating-button';
            button.addEventListener('click', () => {
                userPreferences[preferenceType] = index + 1;
                inputContainer.style.display = 'flex';
                processUserInput();
            });
            buttonContainer.appendChild(button);
        });
  
        chatOutput.appendChild(buttonContainer);
        scrollToBottom();
    };
  
    const getRandomCafe = (cafes) => {
        const randomIndex = Math.floor(Math.random() * cafes.length);
        return cafes[randomIndex];
    };
  
    const recommendCafe = (location, preferences) => {
        let cafes = [];
        switch (location) {
            case '신촌':
                cafes = sinchonCafes;
                break;
            case '연남':
                cafes = yeonnamCafes;
                break;
            case '홍대':
                cafes = hongdaeCafes;
                break;
            default:
                return null;
        }
  
        const filteredCafes = cafes.filter(cafe =>
            cafe.ratings.facility >= preferences.facility &&
            cafe.ratings.noise >= preferences.noise &&
            cafe.ratings.taste >= preferences.taste
        );
  
        return getRandomCafe(filteredCafes);
    };
  
    const processUserInput = (input) => {
        switch (step) {
            case 0:
                if (!['신촌', '연남', '홍대'].includes(input)) {
                    appendMessage('잘못된 입력입니다. 다시 시도해주세요.', 'bot');
                    appendMessage('어느 지역의 카페를 찾고 계신가요? (신촌, 연남, 홍대)', 'bot');
                    break;
                }
                location = input;
                appendMessage('시설 등급을 어느 정도로 중요하다고 생각하시나요?', 'bot');
                inputContainer.style.display = 'none';
                appendRatingButtons('facility');
                step++;
                break;
            case 1:
                appendMessage('소음 등급을 어느 정도로 중요하다고 생각하시나요?', 'bot');
                inputContainer.style.display = 'none';
                appendRatingButtons('noise');
                step++;
                break;
            case 2:
                appendMessage('맛 등급을 어느 정도로 중요하다고 생각하시나요?', 'bot');
                inputContainer.style.display = 'none';
                appendRatingButtons('taste');
                step++;
                break;
            case 3:
                const recommendedCafe = recommendCafe(location, userPreferences);
                if (recommendedCafe) {
                    appendMessage(`여긴 어때요? <span style="background-color: yellow;">${recommendedCafe.name}</span>`, 'bot');
                } else {
                    const fallbackCafe = getRandomCafe(location === '신촌' ? sinchonCafes : location === '연남' ? yeonnamCafes : hongdaeCafes);
                    appendMessage('아쉽지만 조건에 맞는 카페가 없습니다.', 'bot');
                    appendMessage(`그렇다면 이렇게 된거 <span style="background-color: yellow;">${fallbackCafe.name}</span> 카페를 가보는 건 어때요?`, 'bot');
                }
                step = 0;
                appendMessage('다른 지역의 카페를 찾고 싶으시면 지역명을 입력해주세요. (신촌, 연남, 홍대)', 'bot');
                break;
            default:
                appendMessage('잘못된 입력입니다. 다시 시도해주세요.', 'bot');
                step = 0;
                appendMessage('어느 지역의 카페를 찾고 계신가요? (신촌, 연남, 홍대)', 'bot');
                break;
        }
    };
  
    appendMessage('안녕하세요! 카페 추천 챗봇입니다. 어느 지역의 카페를 찾고 계신가요? (신촌, 연남, 홍대)', 'bot');
  
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
  
    const observer = new MutationObserver(scrollToBottom);
    observer.observe(chatOutput, { childList: true });
  });
  