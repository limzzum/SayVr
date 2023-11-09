import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const WeeklySprintComponent: React.FC = () => {
  useEffect(() => {
    
  }, []);

  interface ArrowProps {
    onClick: () => void
  }

  const ArrowLeft = (props: ArrowProps) => {
    return (
      <>
        <Button
          style={{
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
          }}
          onClick={props.onClick}
        >
          <BsArrowLeft />
        </Button>
      </>
    )
  }
  const ArrowRight = (props: ArrowProps) => {
    return (
      <>
        <Button
          style={{
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
          }}
          onClick={props.onClick}
        >
          <BsArrowRight />
        </Button>
      </>
    )
  }

  return (
    <div className="container">

    </div>
  );
};

export default WeeklySprintComponent;
