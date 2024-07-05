import {useState} from "react";
import "./App.css";
import Box from "./component/Box";
import versus from "./images/vs.png";
import happy from "./images/happy.gif"
import sad from "./images/sad.gif"

// import dagger from './images/dagger1.png'
// import bow from './images/bow1.png'
// import staff from './images/staff1.png'

// 1. 박스 2개(타이틀, 사진, 결과)
// 2. 가위,바위,보 버튼이 있다
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택
// 5. 3,4번의 결과를 비교, 누가 이겼는지 승패 따짐
// 6. 승패 결과에 따라 테두리 색 바뀜(이기면-초록, 지면-빨강, 비기면-검정)

const choice = {
  rock: {
    name: "Rock",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjwLvDG1Zgl3hsxUzfSx-xmAPOjw2BpJ9N5Q&s",
  },
  paper: {
    name: "Paper",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Rock-paper-scissors_%28paper%29.png/1200px-Rock-paper-scissors_%28paper%29.png",
  },
  scissors: {
    name: "Scissors",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rock-paper-scissors_%28scissors%29.png/1200px-Rock-paper-scissors_%28scissors%29.png",
  },
};

// dagger
// https://image.similarpng.com/very-thumbnail/2021/06/Hand-drawn-Dagger-on-transparent-PNG.png

// bow and arrow
// bow and arrow png site: https://www.pngall.com/bow-arrow-png/
// https://www.pngall.com/wp-content/uploads/15/Bow-Arrow-PNG-Photos.png

// mage staff
// https://www.vhv.rs/dpng/d/504-5043226_wizard-staff-png-transparent-png.png

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [userResult, setUserResult] = useState("");
  const [compResult, setCompResult] = useState("");
  const [userScore, setScore] = useState(0);
  const [resultGIF, setresultGIF]=useState("");

  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    let userResult = userJudgement(choice[userChoice], computerChoice);
    setUserResult(userResult);
    setCompResult(compJudgement(userResult));
    calcScore(userResult);
    setresultGIF(GIFJudgement(userResult));
  };

  const calcScore = (result) => {
    if((userScore <= 1) &&(result==="Lose")){
      setScore(0);
    }
    else if (result !== "Tie") {
      setScore(result === "Win" ? (userScore+3) : (userScore-2));
    }
    
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice); //Object.keys(객체)->객체의 키값만 뽑아서 array로 만들어주는 함수
    let randomNum = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomNum];
    return choice[final];
  };

  const userJudgement = (user, computer) => {
    const userChoice = user.name;
    const compChoice = computer.name;
    console.log("user", userChoice, "computer", compChoice);
    if (userChoice === compChoice) {
      return "Tie";
    } else if (userChoice === "Rock") {
      return compChoice === "Scissors" ? "Win" : "Lose";
    } else if (userChoice === "Paper") {
      return compChoice === "Rock" ? "Win" : "Lose";
    } else if (userChoice === "Scissors") {
      return compChoice === "Paper" ? "Win" : "Lose";
    } else {
      return "error";
    }
  };

  const GIFJudgement = (user) => {
    if (user==="Tie") return "no-face" 
      else if (user!=="Tie") return (user==="Win"?"happy-face":"sad-face");
  }

  const compJudgement = (user) => {
    if (user === "Tie") {
      return "Tie";
    } else if (user !== "Tie") {
      return user === "Win" ? "Lose" : "Win";
    } else return "Error";
  };

  return (
    <div>
      <div className="top-section">
        <div></div>
        <div className="title-box">
          <h1 className="title">Rock Paper Shoo!</h1>
        </div>
        <div className="score-box">
          <div className="score-section">
            <h3>Total Score: </h3>
            <h3>{userScore}</h3>
          </div>
        </div>
        
      </div>

      <div className="middle-section">
        <div className="main-section">
          <Box title="You" item={userSelect} result={userResult}/>
          <div className="versus-section">
            <img src={happy} className={`result-img happy ${resultGIF}`}/>
            <img src={versus} className="versus-img" />
            <img src={sad} className={`result-img sad ${resultGIF}`}/>
          </div>
          <Box title="Computer" item={computerSelect} result={compResult}/>
          {/* <img src={dagger}/> */}
        </div>
      </div>

      <div className="button-section">
        <button onClick={() => play("scissors")}>
          <i class="fa-regular fa-hand-scissors icon"></i>
        </button>{" "}
        {/*리액트에서는 onClick 안에 함수로, 매개변수 있을 시 콜백형태 함수를 적어야됨*/}
        <button onClick={() => play("rock")}>
          <i class="fa-regular fa-hand-back-fist icon"></i>
        </button>
        <button onClick={() => play("paper")}>
          <i class="fa-regular fa-hand icon"></i>
        </button>
      </div>
      {/* <Box user="you" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjwLvDG1Zgl3hsxUzfSx-xmAPOjw2BpJ9N5Q&s"/>
      <Box user="computer" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Rock-paper-scissors_%28paper%29.png/1200px-Rock-paper-scissors_%28paper%29.png"/> */}
    </div>
  );
}

export default App;

{
  /*아이디어
  1. 단검, 칼방패, 화살로 변경(버튼마다 소리 추가)
  2. 총 점수 표시, 이기면 +3, 지면 -2
  3. 우측하단에 컴퓨터 확률 알려주기(심리)
  3-1. 무작위로 item1하나 뽑기
  3-2. item1을 제외한 item2, item3이 담긴 배열에서 무작위 하나 뽑기
  3-3. item1 2개 otheritem 1개를 새로운 배열에 담기
  3-5. 이 배열에서 무작위 item 뽑아서 finalitem으로 출력
  3-6. 우측하단에 {finalitem}낼거다~(66%확률)
        or {otheritem}낼거다~(33%확률) 둘 중 무작위 출력
  *(나 {weapon}낼건데~ ㅋㅋ(66%확률)),
  *({weapon}이 좀 쌈뽕할듯?)
  *({weapon}을 낼수도, 아닐수도~)
  4. 게임하다 무작위 이벤트 발생(화면에 나오는 무작위 가위바위보 6개를 순서대로 눌러야 됨)
  *만약 20%확률->처음에 변수에 무작위 숫자 0~4 사이 지정. 여기서 4일때만 이벤트 발생
  *패턴 발생 시 'A Goblin has Appeared!' 문구 표시, 배경색 빨간색, 고블린 석궁 사진 출력
  ,무작위 item 6개 사진 출력.

  *잘못 누르면 패턴 바뀜, 시간 안에 달성해야됨, 6개 맞추면 10점 추가, 실패시 -5점
  
  */
}
