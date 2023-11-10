import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  createWeeklySprint,
  OptionType,
} from "../../api/StudyPageAPI/StudyAPI";

// TODO : + 버튼 누를 때 : 목표기간동안은 목표를 설정할 수 없습니다. alert창 띄우기
interface CreateNewWeeklySprintModalProps {
  showModal: boolean;
  handleClose: () => void;
  studyId: Number;
}

export interface CreateGoalRequestDto {
  optionType: OptionType;
  count: number;
  description: string;
}

export interface CreateWeeklySprintRequestDto {
  startDate: Date;
  goalDtoList: CreateGoalRequestDto[];
}

const CreatWeeklySprintModal: React.FC<CreateNewWeeklySprintModalProps> = ({
  showModal,
  handleClose,
  studyId,
}) => {
  const [weeklySprintFrom, setWeeklySprintForm] =
    useState<CreateWeeklySprintRequestDto>({
      startDate: new Date(),
      goalDtoList: [
        { optionType: OptionType.VR, count: 0, description: "" },
        { optionType: OptionType.GAME, count: 0, description: "" },
      ],
    });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setWeeklySprintForm((prevData) => ({
      ...prevData,
      [name]: new Date(value),
    }));
  };

  const handleGoalCountChange = (optionType: OptionType, value: number) => {
    setWeeklySprintForm((prevData) => {
      const newGoalDtoList = [...prevData.goalDtoList];
      const index = newGoalDtoList.findIndex(
        (goal) => goal.optionType === optionType
      );
      if (index !== -1) {
        newGoalDtoList[index].count = Number(String(value).replace(/^0+/, ""));
      }
      return { ...prevData, goalDtoList: newGoalDtoList };
    });
  }; // TODO : 03이런식으로 넣어보기 -> 8진수 취급되나?

  const addGoal = () => {
    setWeeklySprintForm((prevData) => ({
      ...prevData,
      goalDtoList: [
        ...prevData.goalDtoList,
        { optionType: OptionType.ETC, count: 0, description: "" },
      ],
    }));
  };

  const handleGoalDescriptionChange = (
    descriptionIndex: number,
    value: string
  ) => {
    setWeeklySprintForm((prevData) => {
      const newGoalDtoList = [...prevData.goalDtoList];
      const etcGoals = newGoalDtoList.filter(
        (goal) => goal.optionType === OptionType.ETC
      );
      if (etcGoals[descriptionIndex]) {
        etcGoals[descriptionIndex].description = value;
      }
      return { ...prevData, goalDtoList: newGoalDtoList };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (weeklySprintFrom.startDate < today) {
      alert("목표 날짜는 오늘 날짜 이후여야 합니다.");
      return;
    }
    // VR 대화나 매칭 게임의 카운트 검사
    const vrCount =
      weeklySprintFrom.goalDtoList.find(
        (goal) => goal.optionType === OptionType.VR
      )?.count || 0;
    const gameCount =
      weeklySprintFrom.goalDtoList.find(
        (goal) => goal.optionType === OptionType.GAME
      )?.count || 0;
    const etcGoals = weeklySprintFrom.goalDtoList.filter(
      (goal) => goal.optionType === OptionType.ETC && goal.count > 0
    );

    if (vrCount < 1 && gameCount < 1 && etcGoals.length === 0) {
      alert("목표를 설정하셔야 합니다.");
      return;
    }
    createWeeklySprint(studyId, weeklySprintFrom)
      .then((res) => {
        console.log(res.data);
        handleClose();
      })
      .catch((error) => {
        console.error("스프린트 생성 중 오류 발생", error);
      });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>스프린트 만들기</Modal.Title>
      </Modal.Header>
      <Modal.Body className="row">
        <p>시작 날짜</p>
        <input
          name="startDate"
          type="date"
          value={weeklySprintFrom.startDate.toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
        <p>VR 대화</p>
        <input
          type="number"
          value={
            weeklySprintFrom.goalDtoList.find(
              (goal) => goal.optionType === OptionType.VR
            )?.count || 0
          }
          onChange={(event) =>
            handleGoalCountChange(OptionType.VR, Number(event.target.value))
          }
        />
        <p>매칭 게임</p>
        <input
          type="number"
          value={
            weeklySprintFrom.goalDtoList.find(
              (goal) => goal.optionType === OptionType.GAME
            )?.count || 0
          }
          onChange={(event) =>
            handleGoalCountChange(OptionType.GAME, Number(event.target.value))
          }
        />
        {weeklySprintFrom.goalDtoList
          .filter((goal) => goal.optionType === OptionType.ETC)
          .map((goal, index) => (
            <div key={index}>
              <p>기타 목표</p>
              <input
                name="description"
                type="text"
                value={goal.description}
                onChange={(event) =>
                  handleGoalDescriptionChange(index, event.target.value)
                }
              ></input>
            </div>
          ))}
        <Button onClick={addGoal}>목표 추가</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          생성
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatWeeklySprintModal;
