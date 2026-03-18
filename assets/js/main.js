document.addEventListener("DOMContentLoaded", () => {

	// フェード
	const fades = document.querySelectorAll(".fade");

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
				observer.unobserve(entry.target);
			}
		});
	});

	fades.forEach(el => observer.observe(el));


	// メニュー
	const menuBtn = document.querySelector(".menu-btn");
	const navList = document.querySelector(".nav-list");
	const overlay = document.querySelector(".overlay");

	if (menuBtn && navList && overlay) {

		menuBtn.addEventListener("click", () => {
			navList.classList.toggle("active");
			overlay.classList.toggle("active");

			// ← これ追加（スクロール制御）
			document.body.classList.toggle("no-scroll");
		});

		// 外タップで閉じる
		overlay.addEventListener("click", () => {
			navList.classList.remove("active");
			overlay.classList.remove("active");
			document.body.classList.remove("no-scroll");
		});

		// メニュークリックでも閉じる
		navList.querySelectorAll("a").forEach(link => {
			link.addEventListener("click", () => {
				navList.classList.remove("active");
				overlay.classList.remove("active");
				document.body.classList.remove("no-scroll");
			});
		});
	}

	// 画面どこでもクリックで閉じる（メニュー以外）
	document.addEventListener("click", (e) => {
		if (!navList.contains(e.target) && !menuBtn.contains(e.target)) {
			navList.classList.remove("active");
			overlay.classList.remove("active");
			document.body.classList.remove("no-scroll");
		}
	});

});