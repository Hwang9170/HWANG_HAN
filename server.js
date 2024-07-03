const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// 임시 데이터 저장소 (실제로는 데이터베이스를 사용해야 합니다)
let cafes = [
    {id: 1, name: "카페A", address: "서울시 강남구 123", lat: 37.5665, lng: 126.9780, rating: 4.5},
    {id: 2, name: "카페B", address: "서울시 서초구 456", lat: 37.5675, lng: 126.9790, rating: 4.2},
    {id: 3, name: "카페C", address: "서울시 종로구 789", lat: 37.5685, lng: 126.9800, rating: 4.8}
];

let reviews = {};

// 카페 목록 조회
app.get('/api/cafes', (req, res) => {
    res.json(cafes);
});

// 리뷰 조회
app.get('/api/reviews/:cafeId', (req, res) => {
    const cafeId = parseInt(req.params.cafeId);
    res.json(reviews[cafeId] || []);
});

// 리뷰 추가
app.post('/api/reviews/:cafeId', (req, res) => {
    const cafeId = parseInt(req.params.cafeId);
    const { text, rating } = req.body;
    
    if (!reviews[cafeId]) {
        reviews[cafeId] = [];
    }
    
    reviews[cafeId].push({ text, rating });
    res.status(201).json({ message: "리뷰가 추가되었습니다." });
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});