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
const editSubmitButton = document.querySelector(".popup__form-submit");
const editPopup = document.querySelector(".popup");

const addCardButton = document.querySelector(".profile__plus-button");
const addCardPopupCloseButton = document.querySelector("#popup-add-close");
const addCardCreateButton = document.querySelector("#popup-add-submit");
const addCardPopup = document.querySelector("#popup-add-card");

const previewPopup = document.querySelector("#popup-image");
const previewCloseButton = previewPopup.querySelector('.popup__close')

const elements = document.querySelector('.elements');

const cardTemplate = document.querySelector('#card').content;
const cardPrototype = cardTemplate.querySelector('.element');

const popupImage = document.querySelector(".popup__image");
const popupDescription = document.querySelector(".popup__image-description");

function deleteCard(evt) {
    evt.target.parentElement.remove();
}

function createCard(title, link) {
    const element = cardPrototype.cloneNode(true);
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

function showPopup(popup) {
    popup.classList.add("popup_opened")
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}
function showImagePopup(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupDescription.textContent = evt.target.alt;
    showPopup(previewPopup);
}



function initCards() {
    initialCards.forEach((item) => {
        elements.append(createCard(item.name, item.link))
    })
}

editButton.addEventListener('click', function () {
    const profileTitle = document.querySelector(".profile__title").textContent;
    const profileDescription = document.querySelector(".profile__description").textContent;

    document.querySelector("#profile-title").value = profileTitle;
    document.querySelector("#profile-description").value = profileDescription;

    showPopup(editPopup);
})

editCloseButton.addEventListener('click', () => closePopup(editPopup))

editSubmitButton.addEventListener('click', function (evt) {
    evt.preventDefault()

    const formTitle = document.querySelector("#profile-title").value;
    const formDescription = document.querySelector("#profile-description").value;

    document.querySelector(".profile__title").textContent = formTitle;
    document.querySelector(".profile__description").textContent = formDescription;

    closePopup(editPopup);
})

addCardButton.addEventListener('click', () => showPopup(addCardPopup))

addCardPopupCloseButton.addEventListener('click', () => {
    document.querySelector('#add-card').reset();
    closePopup(addCardPopup);
});

addCardCreateButton.addEventListener('click', function (evt) {
    evt.preventDefault()

    const formTitle = document.querySelector("#image-title").value;
    const formLink = document.querySelector("#image-link").value;
    if (formTitle === '' || formLink === '') {
        return;
    }

    elements.prepend(createCard(formTitle, formLink));

    document.querySelector('#add-card').reset();
    closePopup(addCardPopup);
})

previewCloseButton.addEventListener('click', () => closePopup(previewPopup))

initCards();