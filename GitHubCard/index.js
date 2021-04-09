/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
import axios from "axios";

const cardsSelector = document.querySelector(".cards");

axios
	.get("https://api.github.com/users/drslaughterrex")
	.then((futureData) => {
		// console.log(futureData);
		const userCard = cardMaker(futureData);
		cardsSelector.appendChild(userCard);
	})
	.catch((error) => {
		console.log(error);
	});
console.log("3. we requested the data with axios");

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

function appendUserCard(username) {
	axios
		.get(`https://api.github.com/users/${username}`)
		.then((res) => {
			const card = cardMaker(res);
			document.querySelector(".cards").appendChild(card);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			console.log("done");
		});
}

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

axios
	.get(`https://api.github.com/users/drslaughterrex/followers`)
	.then((res) => {
		res.data.forEach((user) => {
			followersArray.push(user.login);
		});
		followersArray.forEach((username) => {
			appendUserCard(username);
		});
	})
	.catch((err) => {
		console.log(err);
	})
	.finally(() => {
		console.log("done");
	});

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function cardMaker(obj) {
	// const {name, avatar_url, login, location, html_url, followers, following, bio} = obj;
	// console.log(obj)
	const cardDiv = document.createElement("div");
	const cardImg = document.createElement("img");
	const infoDiv = document.createElement("div");
	const nameH3 = document.createElement("h3");
	const pUsername = document.createElement("p");
	const pLocation = document.createElement("p");
	const pProfile = document.createElement("p");
	const aProfLink = document.createElement("a");
	const pFollowers = document.createElement("p");
	const pFollowing = document.createElement("p");
	const pBio = document.createElement("p");

	cardDiv.classList.add("card");
	nameH3.classList.add("name");
	pUsername.classList.add("username");
	infoDiv.classList.add("card-info");

	cardImg.src = obj.data.avatar_url;
	nameH3.textContent = obj.data.name;
	pUsername.textContent = obj.data.login;
	pLocation.textContent = "Location: " + obj.data.location;
	pProfile.textContent = "Profile: ";
	aProfLink.textContent = obj.data.html_url;
	aProfLink.href = obj.data.html_url;
	// pFollowers.textContent ='Followers: ' + obj.data.followers;
	pFollowers.textContent = `Followers: ${obj.data.followers}`;
	pFollowing.textContent = "Following: " + obj.data.following;
	pBio.textContent = "Bio: " + obj.data.bio;

	cardDiv.appendChild(cardImg);
	cardDiv.appendChild(infoDiv);
	infoDiv.appendChild(nameH3);
	infoDiv.appendChild(pUsername);
	infoDiv.appendChild(pLocation);
	infoDiv.appendChild(pProfile);
	pProfile.appendChild(aProfLink);
	infoDiv.appendChild(pFollowers);
	infoDiv.appendChild(pFollowing);
	infoDiv.appendChild(pBio);

	return cardDiv;
}

/*
  List of LS Instructors Github username's:
 'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell',
*/
