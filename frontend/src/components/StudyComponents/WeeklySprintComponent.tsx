import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {
  GoalDetailResponseDto,
  StudyRole,
} from "../../api/StudyPageAPI/StudyAPI";
import CheckListCard from "./CheckListCard";
interface WeeklySprintComponentProps {
  goalInfo?: GoalDetailResponseDto;
  setPreWeeklySprintId: React.Dispatch<React.SetStateAction<number>>;
  setNextWeeklySprintId: React.Dispatch<React.SetStateAction<number>>;
  preWeeklySprintId: number;
  nextWeeklySprintId: number;
  setGoalInfo: React.Dispatch<
    React.SetStateAction<GoalDetailResponseDto | undefined>
  >;
  studyId: number;
  memberId: number | undefined;
  studyRole: StudyRole | undefined;
}

const WeeklySprintComponent: React.FC<WeeklySprintComponentProps> = ({
  goalInfo,
  setPreWeeklySprintId,
  setNextWeeklySprintId,
  preWeeklySprintId,
  nextWeeklySprintId,
  setGoalInfo,
  studyId,
  memberId,
  studyRole,
}) => {
  const [weeklySprintStatus, setWeeklySprintStatus] = useState(true);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (goalInfo?.targetDate) {
      const sevenDaysLater = new Date(goalInfo.targetDate);
      sevenDaysLater.setDate(sevenDaysLater.getDate() + 6);

      if (today >= goalInfo.targetDate && today <= sevenDaysLater) {
        setWeeklySprintStatus(false);
      } else {
        setWeeklySprintStatus(true);
      }
    }
  }, [goalInfo]);

  interface ArrowProps {
    onClick: () => void;
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
    );
  };
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
    );
  };

  return (
    <div
      className="weeklySprint-container"
      style={{ display: "flex", flexDirection: "row", height: "100vh" }}
    >
      <div style={{ flex: 1 }}>
        <p>
          기간:{" "}
          {goalInfo
            ? `${new Date(goalInfo.targetDate).getFullYear()}.${
                new Date(goalInfo.targetDate).getMonth() + 1
              }.${new Date(goalInfo.targetDate).getDate()} - 
       ${new Date(
         new Date(goalInfo.targetDate).setDate(
           new Date(goalInfo.targetDate).getDate() + 6
         )
       ).getFullYear()}.${
                new Date(
                  new Date(goalInfo.targetDate).setDate(
                    new Date(goalInfo.targetDate).getDate() + 6
                  )
                ).getMonth() + 1
              }.${new Date(
                new Date(goalInfo.targetDate).setDate(
                  new Date(goalInfo.targetDate).getDate() + 6
                )
              ).getDate()}`
            : ""}
        </p>
        {goalInfo?.goalDtoList.map((goal) => (
          <div key={goal.goalId}>
            <li>
              {goal.description} {goal.count}회
            </li>
          </div>
        ))}
      </div>
      <div style={{ flex: 2 }}>
        {goalInfo?.memberCheckListResponseDtoList.map((checkList) => (
          <CheckListCard
            weeklySprintStatus={weeklySprintStatus}
            weeklySprintId={goalInfo?.weeklySprintId}
            studyId={studyId}
            checkList={checkList}
            memberId={memberId}
            setGoalInfo={setGoalInfo}
            setPreWeeklySprintId={setPreWeeklySprintId}
            setNextWeeklySprintId={setNextWeeklySprintId}
          ></CheckListCard>
        ))}
      </div>
    </div>
  );
};

export default WeeklySprintComponent;
