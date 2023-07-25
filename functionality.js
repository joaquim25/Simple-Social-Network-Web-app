// --------------- User Database and State ---------------------
const users = [
  {
    name: "one",
    email: "one@gmail.com",
    password: "one",
    idUser: "one",
    followers: [],
    following: [],
    posts: [],
  },
  {
    name: "two",
    email: "two@gmail.com",
    password: "two",
    idUser: "two",
    followers: [],
    following: [],
    posts: [],
  },
];

let currentUser = null;

// Exit flag
let exitFlag = false;

// ------------------- Functionality ----------------------------

// Email validation
function isEmailValid(email) {
  const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  return regExp.test(email.trim());
}

// Log-in functionality
function logInFunc(email, password) {
  let user = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      user = users[i];
      break;
    }
  }

  if (!user) {
    return "accNotFound";
  }

  if (user.password !== password) {
    return "wrongPassword";
  }

  currentUser = user;
  return currentUser;
}

// Sign-up functionality
function signUpFunc(name, email, password, idUser) {
  // Checks if the email is registered already
  if (hasUser(email)) {
    return "emailTaken";
  }

  // Create a new user object
  const newUser = {
    name,
    email,
    password,
    idUser,
    followers: [],
    following: [],
    posts: [],
  };

  // Add the new user to the database
  users.push(newUser);

  return "succesfullRegistration";
}

// Search functionality
function searchUser(email) {
  for (const user of users) {
    if (user.email === email) {
      return user;
    }
  }
  return undefined;
}

// Publish Post functionality
function publishPost(imageLink, description) {
  const post = {
    imageLink,
    description,
  };

  currentUser.posts.push(post);
}

// Log out functionality
function logOutFunc() {
  currentUser = null;
}

// Exit app
function exit() {
  exitFlag = true;
  return true;
}

// Check if user already exists in sign up
function hasUser(email) {
  for (const user of users) {
    if (user.email === email) {
      return true;
    }
  }
  return false;
}

