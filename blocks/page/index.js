const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const editButton = document.querySelector(".profile__edit-button");
const editCloseButton = document.querySelector(".popup__close");
const editSubmitHandler = document.querySelector(".popup__form-submit");
const editPopup = document.querySelector(".popup");

const plusButton = document.querySelector(".profile__plus-button");
const plusCloseButton = document.querySelector("#popup-add-close");
const plusSubmitHandler = document.querySelector("#popup-add-submit");
const plusPopup = document.querySelector("#popup-add-card");

const previewPopup = document.querySelector("#popup-image");
const previewCloseButton = previewPopup.querySelector('.popup__close')

const cardTemplate = document.querySelector('#card').content;

const popupImage = document.querySelector(".popup__image");
const popupDescription = document.querySelector(".popup__image-description");

function deleteCard(evt) {
    evt.target.parentElement.remove();
}

function createCard(title, link) {
    const element = cardTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = link;
    element.querySelector('.element__image').alt = title;
    element.querySelector('.element__description').textContent = title;
    element.querySelector(".element__heart").addEventListener('click', function (evt) {
        evt.target.classList.toggle("element__heart_active");
    });
    element.querySelector(".element__delete").addEventListener('click', deleteCard);
    element.querySelector('.element__image').addEventListener('click', showImagePopup);
    return element;
}

function showPopup(type) {
    type.classList.add("popup_opened")
}

function closePopup(type) {
    type.classList.remove("popup_opened");
}
function showImagePopup(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupDescription.textContent = evt.target.alt;
    showPopup(previewPopup);
}

function initCards() {
    const elements = document.querySelector('.elements');
    initialCards.forEach((item) => {
        elements.append(createCard(item.name, item.link))
    })
}

function closeImageForm() {
    document.querySelector("#image-title").value = '';
    document.querySelector("#image-link").value = '';
    closePopup(plusPopup);
}

editButton.addEventListener('click', function () {
    const profileTitle = document.querySelector(".profile__title").textContent;
    const profileDescription = document.querySelector(".profile__description").textContent;

    document.querySelector("#profile-title").value = profileTitle;
    document.querySelector("#profile-description").value = profileDescription;

    showPopup(editPopup);
})

editCloseButton.addEventListener('click', () => closePopup(editPopup))

editSubmitHandler.addEventListener('click', function (evt) {
    evt.preventDefault()

    const formTitle = document.querySelector("#profile-title").value;
    const formDescription = document.querySelector("#profile-description").value;

    document.querySelector(".profile__title").textContent = formTitle;
    document.querySelector(".profile__description").textContent = formDescription;

    closePopup(editPopup);
})

plusButton.addEventListener('click', () => showPopup(plusPopup))

plusCloseButton.addEventListener('click', closeImageForm);

plusSubmitHandler.addEventListener('click', function (evt) {
    evt.preventDefault()

    const formTitle = document.querySelector("#image-title").value;
    const formLink = document.querySelector("#image-link").value;
    if (formTitle === '' || formLink === '') {
        return;
    }

    const elements = document.querySelector('.elements');

    elements.insertBefore(createCard(formTitle, formLink), elements.firstChild);

    closeImageForm();
})

previewCloseButton.addEventListener('click', function () {
    popupImage.src = '';
    popupImage.alt = '';
    popupDescription.textContent = '';

    closePopup(previewPopup);
})

initCards();