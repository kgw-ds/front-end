// 경로
const IMG = "assets/images/";
const PAGE = "pages/";

// 하드코딩 데이터
const STATUS = { selling: "판매중", reserved: "예약중", done: "거래완료" };

const books = [
  { id: 1, title: "HTML5 웹 프로그래밍·자바 세트", price: 18000, dept: "AI소프트웨어학부", college: "AI대학", time: "5분 전", place: "정보과학관 직거래", status: "selling", img: "book_01.svg" },
  { id: 2, title: "운영체제 · 아주 쉬운 세 가지 이야기", price: 22000, dept: "컴퓨터학부", college: "IT대학", time: "18분 전", place: "중앙도서관 직거래", status: "selling", img: "book_02.svg" },
  { id: 3, title: "개발자를 위한 머신러닝&딥러닝", price: 15000, dept: "AI소프트웨어학부", college: "AI대학", time: "32분 전", place: "정보과학관 직거래", status: "reserved", img: "book_03.svg" },
  { id: 4, title: "4차 산업혁명 시대의 이산수학", price: 12000, dept: "수학과", college: "자연과학대학", time: "1시간 전", place: "베어드홀 직거래", status: "selling", img: "book_04.svg" },
  { id: 5, title: "그림으로 배우는 데이터베이스", price: 20000, dept: "컴퓨터학부", college: "IT대학", time: "2시간 전", place: "정보과학관 직거래", status: "selling", img: "book_05.svg" },
  { id: 6, title: "핵심 미분적분학 9판", price: 14000, dept: "수학과", college: "자연과학대학", time: "3시간 전", place: "베어드홀 직거래", status: "done", img: "book_06.svg" },
  { id: 7, title: "컴퓨터·개발 전공서적 일괄", price: 19000, dept: "컴퓨터학부", college: "IT대학", time: "38분 전", place: "중앙도서관 직거래", status: "selling", img: "book_07.svg" },
  { id: 8, title: "처음 시작하는 파이썬 2판", price: 13000, dept: "AI소프트웨어학부", college: "AI대학", time: "5분 전", place: "정보과학관 직거래", status: "selling", img: "book_08.svg" },
];

const HEART = `<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>`;

function won(n) {
  return n.toLocaleString() + "원";
}

// header
function renderHeader() {
  const el = document.getElementById("header");
  if (!el) return;
  el.innerHTML = `
    <header class="header">
      <div class="container header-inner">
        <a href="index.html" class="logo">
          <img src="${IMG}logo.svg" alt="슝책마켓" />
        </a>

        <form class="search-bar" action="${PAGE}search.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
          </svg>
          <input type="text" name="q" placeholder="어떤 전공책을 찾으세요?" />
        </form>

        <nav class="nav">
          <a href="${PAGE}chat.html" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
            </svg>
            채팅하기
          </a>
          <span class="nav-divider"></span>
          <a href="${PAGE}sell.html" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><path d="M12 11v6M9 14h6" />
            </svg>
            판매하기
          </a>
          <span class="nav-divider"></span>
          <a href="${PAGE}mypage.html" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            마이
          </a>
        </nav>
      </div>
    </header>`;
}

// footer
function renderFooter() {
  const el = document.getElementById("footer");
  if (!el) return;
  el.innerHTML = `
    <footer class="footer">
      <div class="container footer-inner">
        <img src="${IMG}logo.svg" alt="슝책마켓" class="footer-logo" />
        <p class="footer-text">숭실대학교 웹프로그래밍 팀 프로젝트 26조</p>
        <p class="footer-copy">© 2026 Team 26. All rights reserved.</p>
      </div>
    </footer>`;
}

// 책 카드 
function cardHTML(b) {
  return `
    <article class="book-card ${b.status}">
      <a href="${PAGE}detail.html?id=${b.id}" class="book-link">
        <div class="book-thumb">
          <img src="${IMG}books/${b.img}" alt="${b.title}" />
        </div>
        <span class="badge ${b.status}">${STATUS[b.status]}</span>
        <h3 class="book-title">${b.title}</h3>
        <p class="book-price">${won(b.price)}</p>
        <p class="book-meta">${b.dept} · ${b.time}</p>
        <p class="book-meta">${b.place}</p>
      </a>
      <button class="like-btn" aria-label="찜하기">${HEART}</button>
    </article>`;
}

// 책 목록 렌더링
function initBookList() {
  const grid = document.querySelector(".book-grid");
  if (!grid) return;

  const chips = document.querySelectorAll(".chip");
  const includeDone = document.getElementById("includeDone");
  const sortSelect = document.getElementById("sortSelect");
  const emptyMsg = document.querySelector(".empty-msg");

  let college = "전체";

  function render() {
    const list = books.filter(
      (b) =>
        (college === "전체" || b.college === college) &&
        (includeDone.checked || b.status !== "done")
    );

    if (sortSelect.value === "low") list.sort((a, b) => a.price - b.price);
    if (sortSelect.value === "high") list.sort((a, b) => b.price - a.price);

    grid.innerHTML = list.map(cardHTML).join("");
    emptyMsg.hidden = list.length > 0;
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      college = chip.dataset.college;
      render();
    });
  });

  includeDone.addEventListener("change", render);
  sortSelect.addEventListener("change", render);
  render();
}

// 학과 더보기
function initMoreButton() {
  const moreBtn = document.getElementById("moreBtn");
  if (!moreBtn) return;

  const extraChips = document.querySelectorAll(".chip.extra");
  let opened = false;

  moreBtn.addEventListener("click", () => {
    opened = !opened;

    extraChips.forEach((chip) => {
      chip.hidden = !opened;
    });

    moreBtn.classList.toggle("open", opened);
    moreBtn.firstChild.textContent = opened ? "접기 " : "학과 더보기 ";

    // 접을 때 숨겨진 칩이 선택돼 있으면 전체로 되돌리기
    const active = document.querySelector(".chip.extra.active");
    if (!opened && active) {
      document.querySelector('.chip[data-college="전체"]').click();
    }
  });
}

// 찜 버튼
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".like-btn");
  if (btn) btn.classList.toggle("liked");
});

// 실행
renderHeader();
renderFooter();
initBookList();
initMoreButton();