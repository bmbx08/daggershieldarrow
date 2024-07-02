import React from "react";

const Box = (props) => {
  let result;
  if (
    props.title === "Computer" &&
    props.result !== "Tie" &&
    props.result !== ""
  ){
    result = props.result === "Win" ? "Lose" : "Win";
  }else {
    result = props.result;
  }

  return (
    <div className="box">
      <h1>{props.title}</h1>
      <img className="item-img" src={props.item && props.item.img} />
      {/*'props.item&&'는 에러 방지용으로 넣는다.*/}
      <h2 className={`${result}`}>{result}</h2>
    </div>
  );
};

export default Box;
