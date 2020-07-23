"use string";
const users = [
  {
    id: 1,
    firstName: "Jason",
    lastName: "Statham",
    profilePicture:
      "https://i.pinimg.com/orignals/24/f5/f8/24f5f8ef9f8af9c7e795ff0ba15f6881.jpg",
  },
  {
    id: 2,
    firstName: "Dwayne",
    lastName: "Johnson",
    profilePicture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/800px-Dwayne_Johnson_2%2C_2013.jpg",
  },
  {
    id: 3,
    firstName: "Emma",
    lastName: "Stone",
    profilePicture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Emma_Stone_at_he_39th_Mill_Valley_Film_Festival_%28cropped%29.jpg/320px-Emma_Stone_at_the_39th_Mill_Valley_Film_Festival_%28cropped%29.jpg",
  },
  {
    id: 4,
    firstName: "Somebody",
    lastName: "Tuffak",
    profilePicture: null,
  },
  {
    id: 100,
    firstName: "",
    lastName: "",
    profilePicture:
      "https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwTUyNzc3Nw@@._V1_.jpg",
  },
  {
    id: 5,
    firstName: "Scarlett",
    lastName: "Johansson",
    profilePicture:
      "https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwNTUyNzc3Nw@@._V1_.jpg",
  },
  {
    id: 6,
    firstName: "Yevgeny",
    lastName: "Ponasenkov",
    profilePicture:
      "https://www.factroom.ru/wp-content/uploads/2019/06/10-faktov-o-evgenii-ponasenkove-kotoryj-svodit-vsekh-s-uma-1250x883.jpg",
  },
  {
    id: 7,
    firstName: "Daniel",
    lastName: "Day-Lewis",
    profilePicture:
      "https://i2.wp.com/comicbookdebate.com/wp-content/uploads/2019/07/There20will20be20blood202-750x460.jpg?resize=750%2C460&ssl=1",
  },
];

document
  .getElementById("usersList")
  ?.append(...users.map((user) => createUserListItem(user)));

/**
 *
 * @param {object} user
 * @param {number | string} user.id
 * @param {string} user.firstName
 * @param {string} user.lastName
 * @param {string} user.profilePicture
 * @returns {HTMLLIElement}
 */
function createUserListItem(user) {
  const { id } = user;
  const userListItemElem = document.createElement("li"); // LI
  userListItemElem.setAttribute("id", id);
  userListItemElem.classList.add("userListItem", "userCard");

  userListItemElem.append(
    createUserPicture(user),
    createUserFullName(user),
    Button({
      onClick: (e) => userListItemElem.remove(),
      children: [
        (() => {
          const img = document.createElement("img");
          img.src = "./icons/remove.svg";
          return img;
        })(),
      ],
      classNames: ["removeBtn"],
    })
  ); // LI > (IMG, DIV, BUTTON)
  return userListItemElem;
}

/**
 *
 * @param {object} props
 * @param {funtion} [props.onClick]
 * @param {Node[]} [props.children]
 * @param {string[]} [props.classNames]
 */
function Button({ onClick = (e) => {}, children = [], classNames = [] } = {}) {
  const btn = document.createElement("button");
  btn.append(...children);
  btn.classList.add(...classNames);
  btn.addEventListener("click", onClick);
  return btn;
}

/**
 *
 * @param {object} param0
 * @returns {HTMLDivElement}
 */
function createUserFullName({ firstName, lastName }) {
  const name = document.createElement("div"); // DIV
  name.classList.add("userFullName");

  name.append(
    document.createTextNode(`${firstName || ""} ${lastName || ""}`.trim())
  );
  return name;
}

/**
 *
 * @param {object} param0
 * @returns {HTMLDivElement}
 */
function createUserPicture(user) {
  const { id, firstName, lastName } = user;
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", `wrapper${id}`);
  wrapper.classList.add("userPictureWrapper", "flexCenter");
  wrapper.style.setProperty(
    "background-color",
    strToHexColor(`${id}${firstName}${lastName}`)
  );

  const initials = document.createElement("span");
  initials.classList.add("userInitials");
  initials.append(
    document.createTextNode(`${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`)
  );
  createUserImage(user, { parentId: wrapper.id });
  wrapper.append(initials);
  return wrapper;
}

/**
 *
 * @param {object} param0
 * @param {object} options
 * @param {string | number} options.parentId
 * @returns {HTMLImageElement}
 */
function createUserImage(
  { profilePicture, firstName, lastName },
  { parentId }
) {
  const img = document.createElement("img"); // new Image(320,320) IMG
  img.setAttribute("data-parent-id", parentId);
  img.setAttribute("src", profilePicture);
  img.setAttribute("alt", `${firstName} ${lastName} photo`);
  img.classList.add("userPicture");
  img.addEventListener("load", onLoadImageHandler);
  img.addEventListener("error", onErrorImageHandler);

  return img;
}

/**
 *
 * Events handlers
 *
 */

function onErrorImageHandler({ target }) {
  target.remove();
}

function onLoadImageHandler({ target }) {
  document.getElementById(target.dataset.parentId)?.append(target);
}

/**
 *
 * Utils
 *
 */

function strToHexColor(str) {
  return "#" + intToARGB(hashCode(str));
}

// Hash any string into an integer value
// Then we'll use the int and convert to hex.
function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

// Convert an int to hexadecimal with a max length
// of six characters.
function intToARGB(i) {
  var hex =
    ((i >> 24) & 0xff).toString(16) +
    ((i >> 16) & 0xff).toString(16) +
    ((i >> 8) & 0xff).toString(16) +
    (i & 0xff).toString(16);
  // Sometimes the string returned will be too short so we
  // add zeros to pad it out, which later get removed if
  // the length is greater than six.
  hex += "000000";
  return hex.substring(0, 6);
}
