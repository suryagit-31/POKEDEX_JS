let call = document.getElementById("come");

const slider = document.getElementById("slide");

const cross = document.getElementById("cross");

call.addEventListener("click", function () {
  slider.style.display = "block";
  setTimeout(() => {
    slider.style.transform = "translateX(0)";
  }, 500);
  slider.style.transition = "transform 0.5s ease";
});

cross.addEventListener("click", function () {
  slider.style.transform = "translateX(-250px)";
  setTimeout(() => {
    slider.style.display = "none";
  }, 500);
  slider.style.transition = "transform 0.5s ease";
});

let txt = document.getElementById("inp");
const a_list = document.getElementById("abi");

const info_btn = document.getElementById("get");

const main = document.getElementById("main-name");

const s_no = document.getElementById("sno");

const imge = document.getElementById("imge");

const p_name = document.getElementById("name");
const p_weight = document.getElementById("weight");
const p_height = document.getElementById("height");
const p_exp = document.getElementById("exp");
const p_star = document.getElementById("imo");
const p_back = document.getElementById("back_def");
const p_front = document.getElementById("front_def");

const view = document.getElementById("view");
const view2 = document.getElementById("view2");

const load = document.getElementById("get");

const gif = document.getElementById("gif");

let able = document.getElementById("abi");
function ablity(data_s) {
  let powers = [];
  for (let i = 0; i < data_s.abilities.length; i++) {
    powers.push(data_s.abilities[i].ability.name);
  }

  let listitems = "";
  for (let k = 0; k < powers.length; k++) {
    listitems += `<li>${powers[k]}</li>`;
  }
  console.log(listitems);
  a_list.innerHTML = listitems;
}

info_btn.addEventListener("click", function () {
  if (txt.value.trim() === "") {
    window.alert("Input is empty ");
  } else {
    fetchdata();
    load.innerHTML = `fetching info <i class="fa-solid fa-spinner"></i>`;
    imge.src = `https://media.tenor.com/e6J4X97EZkIAAAAi/ash-now.gif`;
    imge.style.width = "20vw";
    imge.style.height = "50vh";
    imge.style.borderRadius = "5%";
    imge.style.top = "15%";
    gif.style.display = "none";
  }
});

function  error_inp(){
  info_btn.innerHTML = `get info <i class="fa-solid fa-arrows-rotate" ></i>`;
    imge.style.borderRadius = "60%";
    s_no.textContent = ` Id No:`;
    p_name.textContent = `  NAME: `;
    p_weight.textContent = ` Weight:`;
    p_height.textContent = ` Height: `;
    p_exp.textContent = ` Base Experince: `;
    a_list.innerHTML = "";
    p_star.innerHTML = "";
    p_back.src = "";
    p_front.src = "";
    p_front.style.visibility = "hidden";
    p_back.style.visibility = "hidden";
    main.textContent = "Please enter a valid Name";
    view.style.visibility = "hidden";
    view2.style.visibility = "hidden";
}

function back_og() {
  imge.style.width = "22vw";
  imge.style.height = "50vh";
  imge.style.top = "10%";
  imge.style.left = "0%";
  imge.style.right = "5%";
}
async function fetchdata() {
  try {
    let k = 0;
    let pokemon = txt.value.toLowerCase().trim();
    txt.value = "";
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!result.ok) {
      throw new Error("cant fetch the pokemon might not exist ");
    } else {
      const data = await result.json();
      let t_id = setTimeout(() => {
        console.log(data);
        main.textContent = data.species.name;
        s_no.textContent = ` Id No:  ${data.id}`;
        p_name.textContent = `  NAME:  ${data.species.name}`;
        p_weight.textContent = ` Weight:  ${data.weight} lbs`;
        p_height.textContent = ` Height:  ${data.height}`;
        p_exp.textContent = ` Base Experince: ${data.base_experience}`;

        let starCount = Math.floor(data.base_experience / 100);
        p_star.innerHTML = "";
        for (let i = 0; i < starCount + 1; i++) {
          p_star.innerHTML += "⭐️ ";
        }
        ablity(data);
        load.innerHTML = `get info <i class="fa-solid fa-arrows-rotate" > `;
      }, 2200);

      setTimeout(() => {
        imge.src = data.sprites.other.dream_world.front_default;
        imge.style.borderRadius = "10%";
        p_back.src = data.sprites.other.showdown.back_default;
        p_front.src = data.sprites.other.showdown.front_default;
        p_front.style.visibility = "visible";
        p_back.style.visibility = "visible";
        view.style.visibility = "visible";
        view2.style.visibility = "visible";
        back_og();
      }, 1700);
    }
  } catch (error) {
    console.log(error);
    window.alert("THE pokemon might not exist ");
    imge.src =
      "https://d2h3d42vkj4fuu.cloudfront.net/dd10c2f3f212c01bd3125e21d7cac184";
    back_og();
    error_inp();
  }
}
