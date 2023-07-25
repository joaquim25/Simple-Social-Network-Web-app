// --------------------- Messages ------------------------------
const accNotFound = "Account not found.";
const wrongPassword = "Wrong password.";
const emailTaken = "Email is already taken.";
const succesfullRegistration = "Registration successful. Please log in.";
const successPost = "Post published successfully.";
const userNotFound = "User not found.";
const invalidEmail = "Please enter a valid email address.";
const invalidFollow = "You cannot follow/unfollow yourself.";

// ------------------ Helper Functions -------------------------
// Show message on the DOM
function showMessage(message, parent, state) {
  let messageContainer = "";
  switch (state) {
    case "success":
      messageContainer = createElement("p", "successMsg", null, message);
      break;
    case "error":
      messageContainer = createElement("p", "errorMsg", null, message);
      break;
  }

  parent.appendChild(messageContainer);
  setTimeout(() => {
    messageContainer.remove();
  }, 3000);
}

// Reset page
function clearContent() {
  const mainNode = document.querySelector("body");

  while (mainNode.firstChild) {
    mainNode.removeChild(mainNode.firstChild);
  }
}

// Helper function to create an element with class, attributes and text content
function createElement(tag, className, attributes, textContent) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (attributes) {
    for (const attr in attributes) {
      element.setAttribute(attr, attributes[attr]);
    }
  }
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}

// Create Card Element
function newCard(imageLink, description){
  const card = createElement("div", "profile__card");

  const imageElement = createElement("img", "profile__cardImg", {
    src: imageLink,
  });

  const descriptionElement = createElement(
    "p",
    "profile__cardDescription",
    null,
    description
  );

  card.append(imageElement, descriptionElement);

  // Append card to the posts container
  const postsContainer = document.querySelector(".profile__postsContainer");
  postsContainer.appendChild(card);
}


// -------------------- Components ----------------------------

// Render Login page
function loginPage() {
  clearContent();

  // Login form
  const mainNode = document.querySelector("body");

  const form = createElement("form", "form");
  const formContainer = createElement("div", "form__container");
  const formLogin = createElement("div", "form__login");

  const emailLabel = createElement(
    "label",
    "form__mainLabel",
    { for: "email" },
    "Email"
  );
  const emailInput = createElement("input", "form__input", {
    type: "email",
    name: "email",
    placeholder: "Email",
  });

  const passwordLabel = createElement(
    "label",
    "form__mainLabel",
    { for: "password" },
    "Password"
  );
  const passwordInput = createElement("input", "form__input", {
    type: "password",
    name: "password",
    placeholder: "Password",
  });

  const submitButton = createElement("input", "form__button", {
    type: "submit",
    value: "Submit",
  });

  // Selector form for sign-up and log-in
  const formSelector = createElement("div", "form__selector");
  const signUpLabel = createElement(
    "label",
    "form__selectorLabel",
    { for: "signUp" },
    "Sign up"
  );
  const signUpRadio = createElement("input", null, {
    type: "radio",
    id: "signUp",
    name: "formSelector",
    value: "Sign up",
  });
  const logInLabel = createElement(
    "label",
    "form__selectorLabel",
    { for: "logIn" },
    "Log in"
  );
  const logInRadio = createElement("input", null, {
    type: "radio",
    id: "logIn",
    name: "formSelector",
    value: "Log in",
  });
  logInRadio.checked = true;

  // Append elements
  formLogin.append(
    emailLabel,
    emailInput,
    passwordLabel,
    passwordInput,
    submitButton
  );
  formSelector.append(signUpRadio, signUpLabel, logInRadio, logInLabel);
  formContainer.append(formLogin, formSelector);
  form.appendChild(formContainer);
  mainNode.appendChild(form);

  // Form selector event listener
  formSelector.addEventListener("change", () => {
    const logInRadio = document.querySelector("#logIn");
    if (logInRadio.checked) {
      loginPage();
    } else {
      signUpPage();
    }
  });

  // Form submission event listener
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formSelector = document.querySelector(".form__selector");
    const signUpRadio = document.querySelector("#signUp");
    const emailInput = document.querySelector(".form__input[name='email']");
    const passwordInput = document.querySelector(
      ".form__input[name='password']"
    );
    const nameInput = document.querySelector(".form__input[name='name']");
    const idUserInput = document.querySelector(".form__input[name='idUser']");

    if (formSelector && emailInput && passwordInput) {
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      if (signUpRadio.checked) {
        const name = nameInput.value.trim();
        const idUser = idUserInput.value.trim();
        if (!isEmailValid(email)) {
          const parent = document.querySelector(".form__login");
          showMessage(invalidEmail, parent, "error");
          return;
        }
        const parent = document.querySelector(".form__login");
        switch (signUpFunc(name, email, password, idUser)) {
          case "emailTaken":
            showMessage(emailTaken, parent, "error");
            break;
          case "succesfullRegistration":
            showMessage(succesfullRegistration, parent, "success");
            setTimeout(() => {
              loginPage();
            }, 1500);
            break;
        }
      } else {
        const parent = document.querySelector(".form__login");
        const currentUser = logInFunc(email, password);

        switch (logInFunc(email, password)) {
          case "accNotFound":
            showMessage(accNotFound, parent, "error");
            break;
          case "wrongPassword":
            showMessage(wrongPassword, parent, "error");
            break;
          default:
            profilePage(currentUser);
            break;
        }
      }
    }
  });
}

// Render the Sign-up page
function signUpPage() {
  const formLogin = document.querySelector(".form__login");
  const formButton = document.querySelector(".form__button");

  // Check if the sign-up fields already exist
  const nameLabel = document.querySelector(".form__mainLabel[for='name']");
  const nameInput = document.querySelector(".form__input[name='name']");
  const idUserLabel = document.querySelector(".form__mainLabel[for='idUser']");
  const idUserInput = document.querySelector(".form__input[name='idUser']");

  if (!nameLabel && !nameInput && !idUserLabel && !idUserInput) {
    const nameLabel = createElement(
      "label",
      "form__mainLabel",
      { for: "name" },
      "Name"
    );
    const nameInput = createElement("input", "form__input", {
      type: "text",
      name: "name",
      placeholder: "Name",
    });
    const idUserLabel = createElement(
      "label",
      "form__mainLabel",
      { for: "idUser" },
      "ID/Username"
    );
    const idUserInput = createElement("input", "form__input", {
      type: "text",
      name: "idUser",
      placeholder: "ID",
    });

    formLogin.insertBefore(nameLabel, formButton);
    formLogin.insertBefore(nameInput, formButton);
    formLogin.insertBefore(idUserLabel, formButton);
    formLogin.insertBefore(idUserInput, formButton);
  }
}

// Render the Profile page
function profilePage(user) {
  clearContent();
  const mainNode = document.querySelector("body");

  const searchDiv = createElement("div", "search");
  const profilePg = createElement("div", "profile");

  const searchInput = createElement("input", "form__input", {
    type: "email",
    name: "searchEmail",
    placeholder: "Search a profile (email)",
  });

  const searchSvg = createElement("div", "search__svg");
  searchSvg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>`;
  searchDiv.append(searchInput, searchSvg);

  const buttonContainer = createElement("div", "profile__buttonContainer");
  const myProfileButton = createElement("div", "profile__profileButton");
  myProfileButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>`;

  const followButton = createElement("div", "profile__followBtn");
  followButton.innerHTML = user.followers.includes(currentUser)
    ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
      </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
      </svg>`;

  const logoutButton = createElement("div", "profile__logoutBtn");
  logoutButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>`;

  buttonContainer.append(myProfileButton, followButton, logoutButton);

  const publishForm = createElement("form", "profile__publishForm");

  const publishLabel = createElement(
    "label",
    "form__mainLabel",
    { for: "publishImage" },
    "Add Photo:"
  );
  const publishInput = createElement("input", "form__input", {
    type: "text",
    name: "publishImage",
    placeholder: "Insert image URL...",
  });

  const publishDescription = createElement(
    "textarea",
    "profile__publishDescription",
    {
      id: "publishDescription",
      name: "publishDescription",
      placeholder: "Add a description...",
    }
  );

  const publishButton = createElement("input", "profile__publishButton", {
    type: "submit",
    value: "Publish",
  });

  const infoContainer = createElement("div", "profile__infoContainer");

  const nameElement = createElement("p", null, null, "Name: " + user.name);

  const followersElement = createElement(
    "p",
    null,
    null,
    "Followers: " + user.followers.length
  );

  const followingElement = createElement(
    "p",
    null,
    null,
    "Following: " + user.following.length
  );

  infoContainer.append(nameElement, followersElement, followingElement);

  const postsContainer = createElement("div", "profile__postsContainer");

  // Show message when user has no posts, show post cards when user has posts
  if (user.posts.length === 0 && user === currentUser) {
    const noPostsMessage = createElement(
      "p",
      "profile__noPostsMessage",
      null,
      "You have no posts."
    );
    postsContainer.appendChild(noPostsMessage);
  } else if (user.posts.length === 0) {
    const noPostsMessage = createElement(
      "p",
      "profile__noPostsMessage",
      null,
      "The user has no posts to show."
    );
    postsContainer.appendChild(noPostsMessage);
  } else {
    for (let i = 0; i < user.posts.length; i++) {
      const post = user.posts[i];
      const card = createElement("div", "profile__card");

      const imageElement = createElement("img", "profile__cardImg", {
        src: post.imageLink,
      });

      const descriptionElement = createElement(
        "p",
        "profile__cardDescription",
        null,
        post.description
      );

      card.append(imageElement, descriptionElement);
      postsContainer.appendChild(card);
    }
  }

  profilePg.append(buttonContainer, infoContainer, postsContainer);

  if (user === currentUser) {
    // Only show the "Add Photo" section for the logged user
    publishForm.append(
      publishLabel,
      publishInput,
      publishDescription,
      publishButton
    );
    profilePg.insertBefore(publishForm, infoContainer);
  }

  mainNode.appendChild(searchDiv);
  mainNode.appendChild(profilePg);

  // Add event listeners for profile page buttons
  const searchBar = document.querySelector(".form__input");
  searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const parent = document.querySelector(".search");
      const email = searchInput.value.trim();
      let user = searchUser(email);

      if (user) {
        profilePage(user);
      } else {
        showMessage(userNotFound, parent, "error");
      }
    }
  });

  searchSvg.addEventListener("click", () => {
    const parent = document.querySelector(".search");
    const email = searchInput.value.trim();
    let user = searchUser(email);

    if (user) {
      profilePage(user);
    } else {
      showMessage(userNotFound, parent, "error");
    }
  });

  publishForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const publishImageInput = document.querySelector(
      ".profile__publishForm input[name='publishImage']"
    );
    const publishDescriptionInput = document.querySelector(
      ".profile__publishForm textarea[name='publishDescription']"
    );
    if (publishImageInput && publishDescriptionInput) {
      const image = publishImageInput.value.trim();
      const description = publishDescriptionInput.value.trim();
      const parent = document.querySelector("body");

      publishPost(image, description);
      newCard(image, description);
      showMessage(successPost, parent, "success");
    }
    setTimeout(() => {
      profilePage(currentUser);
    }, 500);
  });

  followButton.addEventListener("click", () => {
    const parent = document.querySelector("body");
    if (currentUser === user) {
      showMessage(invalidFollow, parent, "error");
      return;
    }

    let isFollowing = false;
    for (let i = 0; i < currentUser.following.length; i++) {
      if (currentUser.following[i].email === user.email) {
        isFollowing = true;
        currentUser.following.splice(i, 1);
        break;
      }
    }

    if (isFollowing) {
      for (let i = 0; i < user.followers.length; i++) {
        if (user.followers[i].email === currentUser.email) {
          user.followers.splice(i, 1);
          break;
        }
      }
    } else {
      currentUser.following.push(user);
      user.followers.push(currentUser);
    }

    // Re-render the profile page
    profilePage(user);
  });

  logoutButton.addEventListener("click", () => {
    logOutFunc();
    loginPage();
  });

  myProfileButton.addEventListener("click", () => {
    profilePg.remove();
    profilePage(currentUser);
  });
}

loginPage();
