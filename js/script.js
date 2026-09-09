const yearElement =
    document.getElementById(
        "year"
    );


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}

const profileImage =
    document.getElementById(
        "profileImage"
    );

const profilePlaceholder =
    document.getElementById(
        "profilePlaceholder"
    );

const profileWrapper =
    document.querySelector(
        ".profile-wrapper"
    );


if (profileImage) {

    function handleProfileLoad() {

        profileImage.classList.add(
            "loaded"
        );

        if (profilePlaceholder) {

            profilePlaceholder.style.display =
                "none";

        }

    }


    function handleProfileError() {

        if (profileWrapper) {

            profileWrapper.classList.add(
                "image-missing"
            );

        }

    }


    if (
        profileImage.complete
    ) {

        if (
            profileImage.naturalWidth > 0
        ) {

            handleProfileLoad();

        } else {

            handleProfileError();

        }

    }


    profileImage.addEventListener(
        "load",
        handleProfileLoad
    );


    profileImage.addEventListener(
        "error",
        handleProfileError
    );

}