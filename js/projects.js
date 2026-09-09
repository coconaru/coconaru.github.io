    document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector("#projectSlider");

    if (!slider) return;

    const viewport = slider.querySelector(
        ".project-slider-viewport"
    );

    const track = slider.querySelector(
        ".project-slider-track"
    );

    const prevButton = document.querySelector(
        "#projectPrev"
    );

    const nextButton = document.querySelector(
        "#projectNext"
    );

    if (!viewport || !track) return;


    
    function loadEmbla() {
        return new Promise((resolve, reject) => {
        if (typeof window.EmblaCarousel === "function") {
            resolve(window.EmblaCarousel);
            return;
        }

        const existingScript = document.querySelector(
            'script[data-embla="true"]'
        );

        if (existingScript) {
            existingScript.addEventListener(
            "load",
            () => {
                if (
                typeof window.EmblaCarousel === "function"
                ) {
                resolve(window.EmblaCarousel);
                } else {
                reject(
                    new Error(
                    "Embla Carousel gagal dimuat."
                    )
                );
                }
            },
            { once: true }
            );

            existingScript.addEventListener(
            "error",
            reject,
            { once: true }
            );

            return;
        }

        const script = document.createElement("script");

        script.src =
            "https://cdn.jsdelivr.net/npm/embla-carousel@8.5.2/embla-carousel.umd.js";

        script.async = true;
        script.dataset.embla = "true";

        script.onload = () => {
            if (
            typeof window.EmblaCarousel === "function"
            ) {
            resolve(window.EmblaCarousel);
            } else {
            reject(
                new Error(
                "Embla Carousel tidak tersedia."
                )
            );
            }
        };

        script.onerror = () => {
            reject(
            new Error(
                "Gagal memuat Embla Carousel."
            )
            );
        };

        document.head.appendChild(script);
        });
    }


    track
        .querySelectorAll(".project-clone")
        .forEach((clone) => {
        clone.remove();
        });

    const cards = Array.from(
        track.querySelectorAll(
        ".featured-project:not(.project-clone)"
        )
    );

    if (!cards.length) return;

    const projectDescriptions = [
        "A web-based Department Administration Information System developed to streamline academic and administrative data management. Built with Laravel, PHP, HTML, CSS, and JavaScript, applying object-oriented programming principles as a final project for the Object-Oriented Software Programming course.",

        "A web-based customer relationship visualization system developed during an internship at PT Bank Negara Indonesia (Persero) Tbk. The system visualizes relationships between individual and non-individual customers while managing essential customer data stored in a MySQL database. Built using PHP, JavaScript, and CSS.",

        "A frontend-focused landing page inspired by U.A. Academy from the anime 'My Hero Academia'. Built using HTML and CSS, the project focuses on creating a visually engaging and responsive user interface. Developed as a final project for the Web Programming 2 course.",

        "An XLM-RoBERTa-based machine learning model was trained using 28,754 Tripadvisor comments, achieving an accuracy of 0.9739, precision of 0.9726, recall of 0.9673, and an F1-score of 0.969. This model was developed as an Informatics Engineering undergraduate thesis.",

        "A collaborative visual novel game featuring an engaging post-meteor storyline, interactive dialogue, and water purification minigames. The game was developed together with a team as a final project for a Game Programming course."
    ];


    let embla = null;

    let resizeTimer = null;
    let resizeAnimationFrame = null;

    let lastViewportWidth = window.innerWidth;
    let lastViewportHeight = window.innerHeight;

    function updateCards() {
        if (!embla) return;

        const selectedIndex =
        embla.selectedScrollSnap();

        cards.forEach((card, index) => {
        card.classList.toggle(
            "is-active",
            index === selectedIndex
        );
        });
    }

    function restoreCurrentPosition() {
        if (!embla) return;

        const selectedIndex =
        embla.selectedScrollSnap();

        embla.reInit();

        requestAnimationFrame(() => {
        if (!embla) return;

        embla.scrollTo(
            selectedIndex,
            true
        );

        updateCards();
        });
    }

    function handleResize() {
        clearTimeout(resizeTimer);

        if (resizeAnimationFrame) {
        cancelAnimationFrame(
            resizeAnimationFrame
        );
        }

        resizeTimer = setTimeout(() => {
        resizeAnimationFrame =
            requestAnimationFrame(() => {
            if (!embla) return;

            const currentWidth =
                window.innerWidth;

            const currentHeight =
                window.innerHeight;

            const widthChanged =
                currentWidth !== lastViewportWidth;

            const heightChanged =
                currentHeight !== lastViewportHeight;

            lastViewportWidth =
                currentWidth;

            lastViewportHeight =
                currentHeight;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                if (!embla) return;

                if (
                    widthChanged ||
                    heightChanged
                ) {
                    restoreCurrentPosition();
                } else {
                    embla.reInit();
                    updateCards();
                }
                });
            });
            });
        }, 120);
    }


    function handleFullscreenChange() {
        setTimeout(() => {
        handleResize();
        }, 50);

        setTimeout(() => {
        handleResize();
        }, 250);

        setTimeout(() => {
        handleResize();
        }, 500);
    }

    function prepareTrack() {
        track.style.paddingLeft = "0px";
        track.style.paddingRight = "0px";
    }

    prepareTrack();

    loadEmbla()
        .then((EmblaCarousel) => {
        embla = EmblaCarousel(
            viewport,
            {

            loop: true,

            align: "center",

            slidesToScroll: 1,

            dragFree: false,

            skipSnaps: false,

            duration: 32,

            containScroll: false
            }
        );

        embla.on(
            "select",
            updateCards
        );

        embla.on(
            "reInit",
            () => {
            prepareTrack();
            updateCards();
            }
        );


        if (nextButton) {
            nextButton.addEventListener(
            "click",
            () => {
                if (!embla) return;

                embla.scrollNext();
            }
            );
        }

        if (prevButton) {
            prevButton.addEventListener(
            "click",
            () => {
                if (!embla) return;

                embla.scrollPrev();
            }
            );
        }

        document.addEventListener(
            "keydown",
            (event) => {
            const overlay =
                document.querySelector(
                "#projectOverlay"
                );

            if (
                overlay &&
                overlay.classList.contains(
                "is-open"
                )
            ) {
                return;
            }

            if (!embla) return;

            if (
                event.key === "ArrowRight"
            ) {
                embla.scrollNext();
            }

            if (
                event.key === "ArrowLeft"
            ) {
                embla.scrollPrev();
            }
            }
        );


        updateCards();

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
            if (!embla) return;

            embla.reInit();

            embla.scrollTo(
                embla.selectedScrollSnap(),
                true
            );

            updateCards();
            });
        });


        cards.forEach((card) => {
            const image =
            card.querySelector("img");

            if (!image) return;

            if (image.complete) {
            requestAnimationFrame(() => {
                if (!embla) return;

                embla.reInit();
                updateCards();
            });
            } else {
            image.addEventListener(
                "load",
                () => {
                if (!embla) return;

                requestAnimationFrame(() => {
                    embla.reInit();
                    updateCards();
                });
                },
                { once: true }
            );
            }
        });


        window.addEventListener(
            "resize",
            handleResize,
            { passive: true }
        );


        window.addEventListener(
            "orientationchange",
            () => {
            setTimeout(
                handleResize,
                150
            );
            },
            { passive: true }
        );

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange
        );

        document.addEventListener(
            "webkitfullscreenchange",
            handleFullscreenChange
        );

  

        if (window.visualViewport) {
            window.visualViewport.addEventListener(
            "resize",
            handleResize,
            { passive: true }
            );
        }


        if (
            typeof ResizeObserver !==
            "undefined"
        ) {
            const resizeObserver =
            new ResizeObserver(() => {
                handleResize();
            });

            resizeObserver.observe(
            viewport
            );

            slider._projectResizeObserver =
            resizeObserver;
        }
        })
        .catch((error) => {
        console.error(
            "Project slider error:",
            error
        );
        });


    const overlay =
        document.createElement("div");

    overlay.className =
        "project-overlay";

    overlay.id =
        "projectOverlay";

    overlay.setAttribute(
        "aria-hidden",
        "true"
    );

    overlay.innerHTML = `
        <div class="project-overlay-backdrop"></div>

        <div
        class="project-overlay-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="projectOverlayTitle"
        >

        <button
            type="button"
            class="project-overlay-close"
            aria-label="Close project details"
        >
            ×
        </button>

        <div class="project-overlay-media">

            <button
            type="button"
            class="project-overlay-arrow prev"
            aria-label="Previous screenshot"
            >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <polyline
                points="15 18 9 12 15 6"
                ></polyline>
            </svg>
            </button>

            <div class="project-overlay-viewport">
            <div class="project-overlay-track"></div>
            </div>

            <button
            type="button"
            class="project-overlay-arrow next"
            aria-label="Next screenshot"
            >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <polyline
                points="9 18 15 12 9 6"
                ></polyline>
            </svg>
            </button>

            <div class="project-overlay-counter">
            01 / 01
            </div>

        </div>

        <div class="project-overlay-info">

            <h6
            class="project-overlay-title"
            id="projectOverlayTitle"
            ></h6>

            <div class="project-overlay-details">

            <div
                class="project-overlay-section-title"
            >
                Project Details
            </div>

            <p
                class="project-overlay-description"
            ></p>

            </div>

        </div>

        </div>
    `;

    document.body.appendChild(
        overlay
    );


    const overlayBackdrop =
        overlay.querySelector(
        ".project-overlay-backdrop"
        );

    const overlayDialog =
        overlay.querySelector(
        ".project-overlay-dialog"
        );

    const overlayClose =
        overlay.querySelector(
        ".project-overlay-close"
        );

    const overlayTrack =
        overlay.querySelector(
        ".project-overlay-track"
        );

    const overlayPrev =
        overlay.querySelector(
        ".project-overlay-arrow.prev"
        );

    const overlayNext =
        overlay.querySelector(
        ".project-overlay-arrow.next"
        );

    const overlayCounter =
        overlay.querySelector(
        ".project-overlay-counter"
        );

    const overlayTitle =
        overlay.querySelector(
        ".project-overlay-title"
        );

    const overlayDescription =
        overlay.querySelector(
        ".project-overlay-description"
        );

    let overlayImages = [];

    let overlayCurrentIndex = 0;

    let previousFocusedElement = null;

    let projectNumber = 0;

    function imageExists(url) {
        return new Promise(
        (resolve) => {
            const image =
            new Image();

            image.onload = () =>
            resolve(true);

            image.onerror = () =>
            resolve(false);

            image.src = url;
        }
        );
    }


    async function findScreenshot(
        number,
        screenshotNumber
    ) {
        const extensions = [
        "jpg",
        "jpeg",
        "png",
        "webp"
        ];

        for (
        const extension of extensions
        ) {
        const url =
            `img/projects/project-${number}-${screenshotNumber}.${extension}`;

        const exists =
            await imageExists(url);

        if (exists) {
            return url;
        }
        }

        return null;
    }


    async function getProjectImages(
        number,
        mainImage
    ) {
        const images = [];


        for (
        let i = 1;
        i <= 8;
        i++
        ) {
        const screenshot =
            await findScreenshot(
            number,
            i
            );

        if (screenshot) {
            images.push(
            screenshot
            );
        }
        }

        return [
        ...new Set(images)
        ];
    }

    function getProjectData(
        card,
        number
    ) {
        const imageElement =
        card.querySelector(
            ".featured-project-image img"
        );

        const titleElement =
        card.querySelector(
            ".featured-project-content h3"
        );

        const mainImage =
        imageElement?.currentSrc ||
        imageElement?.src ||
        "";

        const title =
        titleElement?.textContent.trim() ||
        "Project";

        const description =
        projectDescriptions[
            number - 1
        ] ||
        "Project details are not available.";

        return {
        number,
        mainImage,
        title,
        description
        };
    }

    cards.forEach(
        (card, index) => {
        const imageContainer =
            card.querySelector(
            ".featured-project-image"
            );

        if (!imageContainer) {
            return;
        }

        if (
            imageContainer.querySelector(
            ".project-view-more"
            )
        ) {
            return;
        }

        const button =
            document.createElement(
            "button"
            );

        button.type = "button";

        button.className =
            "project-view-more";

        button.innerHTML = `
            <span>View More</span>

            <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            >
            <path
                d="M5 12h14"
            ></path>

            <path
                d="m13 6 6 6-6 6"
            ></path>
            </svg>
        `;

        imageContainer.appendChild(
            button
        );

        button.addEventListener(
            "click",
            (event) => {
            event.preventDefault();
            event.stopPropagation();

            openProjectOverlay(
                card,
                index + 1
            );
            }
        );
        }
    );


    function renderOverlaySlides() {
        overlayTrack.innerHTML =
        "";

        overlayImages.forEach(
        (imageUrl, index) => {
            const slide =
            document.createElement(
                "div"
            );

            slide.className =
            "project-overlay-slide";

            const image =
            document.createElement(
                "img"
            );

            image.src =
            imageUrl;

            image.alt =
            `${overlayTitle.textContent} screenshot ${index + 1}`;

            image.loading =
            "lazy";

            slide.appendChild(
            image
            );

            overlayTrack.appendChild(
            slide
            );
        }
        );

        updateOverlayPosition();
    }

    function updateOverlayPosition() {
        overlayTrack.style.transform =
        `translateX(-${overlayCurrentIndex * 100}%)`;

        const total =
        overlayImages.length;

        const current =
        String(
            overlayCurrentIndex + 1
        ).padStart(
            2,
            "0"
        );

        const totalFormatted =
        String(total).padStart(
            2,
            "0"
        );

        overlayCounter.textContent =
        `${current} / ${totalFormatted}`;

        const hasMultipleImages =
        total > 1;

        overlayPrev.style.display =
        hasMultipleImages
            ? "flex"
            : "none";

        overlayNext.style.display =
        hasMultipleImages
            ? "flex"
            : "none";

        overlayCounter.style.display =
        hasMultipleImages
            ? "block"
            : "none";
    }

    async function openProjectOverlay(
        card,
        number
    ) {
        previousFocusedElement =
        document.activeElement;

        projectNumber =
        number;

        const data =
        getProjectData(
            card,
            number
        );

        overlayTitle.textContent =
        data.title;

        overlayDescription.textContent =
        data.description;

        overlayCurrentIndex =
        0;

        overlay.classList.add(
        "is-open"
        );

        overlay.setAttribute(
        "aria-hidden",
        "false"
        );

        document.body.style.overflow =
        "hidden";

        overlayImages =
        await getProjectImages(
            projectNumber,
            data.mainImage
        );

        renderOverlaySlides();

        overlayClose.focus();
    }

    function closeProjectOverlay() {
        overlay.classList.remove(
        "is-open"
        );

        overlay.setAttribute(
        "aria-hidden",
        "true"
        );

        document.body.style.overflow =
        "";

        overlayTrack.innerHTML =
        "";

        overlayImages = [];

        overlayCurrentIndex =
        0;

        if (
        previousFocusedElement &&
        typeof previousFocusedElement.focus ===
            "function"
        ) {
        previousFocusedElement.focus();
        }
    }

    function nextOverlayImage() {
        if (
        overlayImages.length <= 1
        ) {
        return;
        }

        overlayCurrentIndex =
        (
            overlayCurrentIndex + 1
        ) %
        overlayImages.length;

        updateOverlayPosition();
    }

    function previousOverlayImage() {
        if (
        overlayImages.length <= 1
        ) {
        return;
        }

        overlayCurrentIndex =
        (
            overlayCurrentIndex -
            1 +
            overlayImages.length
        ) %
        overlayImages.length;

        updateOverlayPosition();
    }

    overlayClose.addEventListener(
        "click",
        closeProjectOverlay
    );

    overlayBackdrop.addEventListener(
        "click",
        closeProjectOverlay
    );

    overlayDialog.addEventListener(
        "click",
        (event) => {
        event.stopPropagation();
        }
    );

    overlayPrev.addEventListener(
        "click",
        previousOverlayImage
    );

    overlayNext.addEventListener(
        "click",
        nextOverlayImage
    );


    document.addEventListener(
        "keydown",
        (event) => {
        if (
            !overlay.classList.contains(
            "is-open"
            )
        ) {
            return;
        }

        if (
            event.key === "Escape"
        ) {
            closeProjectOverlay();
            return;
        }

        if (
            event.key === "ArrowRight"
        ) {
            nextOverlayImage();
            return;
        }

        if (
            event.key === "ArrowLeft"
        ) {
            previousOverlayImage();
        }
        }
    );

 
    let touchStartX = 0;
    let touchEndX = 0;

    overlayTrack.addEventListener(
        "touchstart",
        (event) => {
        touchStartX =
            event.changedTouches[0]
            .screenX;
        },
        {
        passive: true
        }
    );

    overlayTrack.addEventListener(
        "touchend",
        (event) => {
        touchEndX =
            event.changedTouches[0]
            .screenX;

        const distance =
            touchEndX -
            touchStartX;

        if (
            Math.abs(distance) < 50
        ) {
            return;
        }

        if (distance < 0) {
            nextOverlayImage();
        } else {
            previousOverlayImage();
        }
        },
        {
        passive: true
        }
    );
    });