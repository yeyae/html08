function index() {
  let url = "https://random-data-api.com/api/users/random_user?size=6";
  fetch(url)
    .then(
      (response) => {
        return response.json();
      }
      // 응답을 json 객체 형식으로 반환
    )
    .then(
      (data) => {
        console.log(data);
        let section = document.getElementById("main-section");
        for (let i = 0; i < data.length; i++) {
          let userItem = `
            <div class="card">
            <img src="img/${i}.png" alt="Avatar" style="width:100%">
            <div class="img-container">
                <h1>userid : ${data[i].id}</h1> 
                <p>user name : ${data[i].username}</p> 
            </div>
            </div>
            `;
          section.innerHTML += userItem;
        }
      } // 전달받은 응답 결과 data를 출력
    )
    .catch((error) => {
      console.log(error); // 발생한 예외 상황에 대한 처리
    });

  // 화면이 로드될때 로그인한 유저가 있는지 먼저 판단
  let nav_login = document.getElementById("nav-login"); // 로그인 버튼
  let nav_logout = document.getElementById("nav-logout"); // 로그아웃 버튼
  let user = sessionStorage.getItem("username"); // 세션스토리지에 등록이 되어있어야 가져올수 있겠죠?

  if (user == null) {
    // 세션스토리지에 저장된 user가 없으면
    // 로그아웃 버튼 지우고 로그인 버튼만
    nav_logout.style.display = "none"; // display : none; ==> 차지하고 있는 공간까지 제거
    nav_login.style.display = ""; // display 속성을 기본값으로 바꿈 (없애는게 아님)
  } else {
    // 세션스토리지에 저장된 user가 있으면
    // 로그인 버튼 지우고 로그아웃 버튼만
    nav_login.style.display = "none";
    nav_logout.style.display = "";
  }
}

function login() {
  let id = document.getElementById("id"); // id 태그 가져오기

  let user = JSON.parse(localStorage.getItem(id.value)); // 로컬스토리지에 우리가 input태그에 입력한 id 값을
  // key 로 하는 user 가 있는지 (있으면 가져오고, 없으면 null)
  let password = document.getElementById("password"); // password 태그 가져오기

  if (user == null) {
    // 해당 id가 존재하지 않는다.
    alert("해당 id가 존재하지 않습니다!!");
    // 로그인 실패(아이디가 존재하지 않는다.)
  } else {
    // 해당 id가 있다. (비밀번호도 가져와서 비밀번호가 입력한 비밀번호와 같은지 비교)
    if (user.password == password.value) {
      // 비밀번호도 같으면 로그인 성공!
      alert("로그인 성공!");
      sessionStorage.setItem("username", JSON.stringify(user)); //값을 저장할때는 문자열
      location.href = "index.html";
    } else {
      // 비밀번호가 다르면 로그인 실패(비밀번호 불일치)
      alert("비밀번호가 다릅니다.");
    }
  }
} // 로컬스토리지에 해당 id와 password 정보가 있는지 확인해서
// 정보가 있다면 로그인 성공 이라는 알림을, 없다면 실패(또는 id password가 틀림)
// 알림을 띄워주시면 되겠습니다.

function logout() {
  // 로그아웃 버튼 클릭 이벤트 처리 함수
  sessionStorage.removeItem("username");
  alert("로그아웃 되었습니다.");
  location.reload(); //윈도우 새로고침 함수
}

function regist() {
  // document.getElementById("태그의 id"); => 태그 객체를 가져온다.
  let id = document.getElementById("id");
  let password = document.getElementById("password");
  let email = document.getElementById("email");
  let name = document.getElementById("name");
  let age = document.getElementById("age");

  //객체만 가져온 것이기 때문에 입력된 값을 가져오려면 value라는 속성에 접근
  let user = {
    id: id.value /* id가 "id"인 input 태그 안에 입력된 값*/,
    password: password.value,
    email: email.value,
    name: name.value,
    age: age.value,
  };
  localStorage.setItem(id.value, JSON.stringify(user));
  alert("회원가입 완료");

  location.reload();
} // 로컬스토리지에 회원 정보를 저장

function updateUser() {
  // 회원수정 버튼을 눌렀을때 실행될 함수

  // 회원가입 페이지로 이동하기 전 로그인 상태를 체크
  let user = sessionStorage.getItem("username");
  // 저장소에 있는 로그인 유저의 정보를 가져온다.
  // 그런데 저장소 안에있는 값은 문자열 이므로 객체로 변경해준다.
  user = JSON.parse(user);

  if (user == null) {
    //가져온 정보가 null이면 (없다면)
    //로그인이 안되있다는 뜻
    alert("로그인 후 이용해주세요.");
    return; // 함수 종료
  }
  // 로그인 된 경우에는 계속 진행

  location.href = "register.html";
}

function register_onload() {
  // 회원가입 페이지가 로드됬을때 실행하는 함수
  // 만약 로그인된 사용자가 있다면??
  // input 태그의 값을 로그인된 사용자의 정보로 채워주기

  let user = sessionStorage.getItem("username");
  if (user == null) {
    // 세션스토리지에 로그인 정보가 없는 경우는 최초 회원가입 이므로 처리 필요 없음.
    // 바로 함수 종료
    return;
  }

  document.title = "회원정보 수정"; //탭 이름 바꾸기
  let button = document.getElementById("regist-button"); // 회원가입 버튼 태그 id로 가져오기
  button.innerText = "정보 수정"; // 버튼 안의 텍스트 바꾸기
  button.removeAttribute("onclick"); // 버튼의 onclick 속성 제거 ( 회원가입 이벤트 제거 )

  user = JSON.parse(user);

  let idtag = document.getElementById("id");
  idtag.readOnly = true; // id input 태그는 변경 못하게 하는 방법
  idtag.value = user.id;
  let pwtag = document.getElementById("password");
  pwtag.value = user.password;
  let emailtag = document.getElementById("email");
  emailtag.value = user.email;
  let nametag = document.getElementById("name");
  nametag.value = user.name;
  let agetag = document.getElementById("age");
  agetag.value = user.age;

  button.addEventListener("click", function () {
    let user = {
      id: idtag.value,
      password: pwtag.value,
      email: emailtag.value,
      name: nametag.value,
      age: agetag.value,
    };

    localStorage.setItem(user.id, JSON.stringify(user)); // 로컬스토리지 사용자 정보 수정
    sessionStorage.setItem("username", JSON.stringify(user)); // 세션스토리지 현재 사용자 정보 수정
    alert("수정 완료!");
    location.reload();
  });
}

function deleteAccount() {
  // 회원 탈퇴
  let user = sessionStorage.getItem("username");

  user = JSON.parse(user);

  if (user == null) {
    alert("로그인 후 이용해주세요.");
    return;
  }

  let conf = confirm("정말로 회원 탈퇴 하시겠습니까?");

  if (conf) {
    localStorage.removeItem(user.id);
    sessionStorage.removeItem("username");
    alert("회원 탈퇴 완료");
    location.replace("index.html");
  } else {
    alert("취소되었습니다.");
  }
}
