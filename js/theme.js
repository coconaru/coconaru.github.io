
const body = document.body;

const themeToggle =
    document.getElementById("themeToggle");

const mobileThemeToggle =
    document.getElementById("mobileThemeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const mobileThemeIcon =
    document.getElementById("mobileThemeIcon");


const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );

const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

const initialDark =
    savedTheme === "dark" ||
    (
        !savedTheme &&
        systemPrefersDark
    );

function updateThemeIcons() {

    const isDark =
        body.classList.contains("dark");

    const icon =
        isDark
            ? "🌙"
            : "☀️";

    if (themeIcon) {
        themeIcon.textContent = icon;
    }

    if (mobileThemeIcon) {
        mobileThemeIcon.textContent = icon;
    }

}

function applyTheme(isDark) {

    body.classList.toggle(
        "dark",
        isDark
    );

    body.classList.toggle(
        "light",
        !isDark
    );

    if (isDark) {

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

    } else {

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

    }

    updateThemeIcons();

}

function toggleTheme() {

    const isDark =
        body.classList.contains("dark");

    applyTheme(!isDark);

}

applyTheme(initialDark);

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


if (mobileThemeToggle) {

    mobileThemeToggle.addEventListener(
        "click",
        toggleTheme
    );

}

if (window.matchMedia) {

    const mediaQuery =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

    mediaQuery.addEventListener(
        "change",
        function (event) {

            const userTheme =
                localStorage.getItem(
                    "portfolio-theme"
                );

            if (!userTheme) {

                applyTheme(
                    event.matches
                );

            }

        }
    );

}