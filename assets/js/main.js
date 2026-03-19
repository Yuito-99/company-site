document.addEventListener("DOMContentLoaded", () => {

	// =========================
	// フェード
	// =========================
	const fades = document.querySelectorAll(".fade");

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
				observer.unobserve(entry.target);
			}
		});
	});

	fades.forEach((el, index) => {
		el.style.transitionDelay = `${index * 0.1}s`;
		observer.observe(el);
	});


	// =========================
	// ヘッダースクロール変化
	// =========================
	const header = document.querySelector(".header");

	window.addEventListener("scroll", () => {
		if (window.scrollY > 50) {
			header.classList.add("scrolled");
		} else {
			header.classList.remove("scrolled");
		}
	});


	// =========================
	// メニュー
	// =========================
	const menuBtn = document.querySelector(".menu-btn");
	const navList = document.querySelector(".nav-list");
	const overlay = document.querySelector(".overlay");

	if (!menuBtn || !navList || !overlay) return;

	menuBtn.addEventListener("click", (e) => {
		e.stopPropagation();

		navList.classList.toggle("active");
		overlay.classList.toggle("active");
		document.body.classList.toggle("no-scroll");
	});

	overlay.addEventListener("click", () => {
		closeMenu();
	});

	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener("click", function (e) {

			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();

			const target = document.querySelector(this.getAttribute("href"));
			if (!target) return;

			const headerOffset = 80;
			const targetPosition =
				target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

			if (navList.classList.contains("active")) {
				closeMenu();
			}

			smoothScrollTo(targetPosition);

		});
	});

	document.addEventListener("click", (e) => {
		if (!navList.classList.contains("active")) return;
		if (navList.contains(e.target) || menuBtn.contains(e.target)) return;

		closeMenu();
	});


	// =========================
	// ヒーロー軽パララックス
	// =========================
	const hero = document.querySelector(".hero");

	if (hero) {
		hero.addEventListener("mousemove", (e) => {
			const x = (e.clientX / window.innerWidth - 0.5) * 10;
			const y = (e.clientY / window.innerHeight - 0.5) * 10;

			hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
		});
	}


	// =========================
	// カードちょい動き
	// =========================
	document.querySelectorAll(".card").forEach(card => {

		card.addEventListener("mousemove", (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			// 強めにする
			const rotateX = -(y / rect.height - 0.5) * 20;
			const rotateY = (x / rect.width - 0.5) * 20;

			const moveY = -10; // 浮きも強く

			card.style.transform =
				`perspective(600px) translateY(${moveY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
		});

		card.addEventListener("mouseleave", () => {
			card.style.transform =
				"perspective(600px) translateY(0) rotateX(0) rotateY(0) scale(1)";
		});
	});


	// =========================
	// 共通関数
	// =========================
	function closeMenu() {
		navList.classList.remove("active");
		overlay.classList.remove("active");
		document.body.classList.remove("no-scroll");
	}

	function smoothScrollTo(targetY, duration = 500) {
		const startY = window.pageYOffset;
		const diff = targetY - startY;
		let startTime = null;

		function step(timestamp) {
			if (!startTime) startTime = timestamp;
			const time = timestamp - startTime;
			const percent = Math.min(time / duration, 1);

			window.scrollTo(0, startY + diff * percent);

			if (time < duration) {
				requestAnimationFrame(step);
			}
		}

		requestAnimationFrame(step);
	}

});