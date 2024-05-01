const guideContainer = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

export const setupUI = (user, doc, db, getDoc) => {
  if (user) {
    // account info
    const userRef = doc(db, 'user', user.uid)
    getDoc(userRef)
    .then((doc) => {
      const html = `
      <div>Logged in as ${user.email}</div>
      <div>${doc.data().bio}</div>
    `;
    accountDetails.innerHTML = html;
    })
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  } else {
    // clear account info
    accountDetails.innerHTML = "";

    // toggle user elements
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};

// setup guide list
export function setupGuide(data) {
  let html = "";
  if (!data.length) {
    guideContainer.innerHTML =
      '<h5 class="center-align">Login to view guides</h5>';
    return;
  }
  data.forEach((el) => {
    html += `<li>
    <div class="collapsible-header grey lighten-4">${el.title}</div>
    <div class="collapsible-body white">${el.content}</div>
  </li>`;
  });
  guideContainer.innerHTML = html;
}

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
