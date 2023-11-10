import React, { useEffect, useState } from "react";
import { MdAdd, MdModeEdit } from "react-icons/md";
import {
  OptionCheckItem,
  CheckListStatus,
  MemberCheckListResponseDto,
  updateCheckListItemStatus,
  OptionType,
  deleteCheckListItem,
  GoalDetailResponseDto,
  createCheckListItem,
} from "../../api/StudyPageAPI/StudyAPI";
import AddButton from "./AddButton";
import "./style.css";

interface CheckListProps {
  checkList: MemberCheckListResponseDto;
  studyId: number;
  weeklySprintStatus: boolean;
  memberId: number | undefined;
  weeklySprintId: number | undefined;
  setGoalInfo: React.Dispatch<
    React.SetStateAction<GoalDetailResponseDto | undefined>
  >;
  setPreWeeklySprintId: React.Dispatch<React.SetStateAction<number>>;
  setNextWeeklySprintId: React.Dispatch<React.SetStateAction<number>>;
}

export interface UpdateCheckListStatusResquestDto {
  studyMemberId: number;
  checkListStatus: CheckListStatus;
}

export interface CreateCheckListRequestDto {
  studyMemberId: number;
  description: string;
}

function CheckListCard({
  checkList,
  studyId,
  weeklySprintStatus,
  memberId,
  weeklySprintId,
  setGoalInfo,
  setPreWeeklySprintId,
  setNextWeeklySprintId,
}: CheckListProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [editing, setEditing] = useState({ status: false, id: 0, text: "" });
  if (!checkList) {
    // TODO : 암것도 없을 때 return 문 처리 ( 암것도 없을리가 없긴한데...)
    return (
      <>
        <div></div>
      </>
    );
  }

  const onToggleForm = () => setOpen(!open);
  const onChange = (e: any) => setValue(e.target.value);

  // const onSubmit = (e: any) => {
  //   e.preventDefault();
  //   if (!value.trim()) {
  //     return;
  //   }
  //   if (weeklySprintId === undefined) {
  //     return;
  //   }

  //   createCheckListItem(studyId, weeklySprintId, {
  //     studyMemberId: checkList.studyMemberId,
  //     description: value,
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       setPreWeeklySprintId(res.data.data.preWeeklySprintId);
  //       setNextWeeklySprintId(res.data.data.nextWeeklySprintId);
  //       setGoalInfo(res.data.data.goalDetailResponseDto);
  //     })
  //     .catch((error) => {
  //       console.error("체크리스트 상태 업데이트 오류 발생", error);
  //     });

  //   setValue("");
  // };

  const undoneTasks = checkList.checkListItemDtoList.filter(
    (checkList) => checkList.checkListStatus === CheckListStatus.ONGOING
  );

  const onToggle = (
    id: number,
    nowcheckListStatus: CheckListStatus,
    optionCheckItem: OptionCheckItem,
    optionType: OptionType
  ) => {
    if (
      optionCheckItem === OptionCheckItem.STUDYGOAL &&
      optionType !== OptionType.ETC
    ) {
      return;
    }

    if (!weeklySprintStatus) {
      return;
    }

    if (checkList.studyMemberId !== memberId) {
      return;
    }

    if (weeklySprintId === undefined) {
      return;
    }

    let checkListStatus = nowcheckListStatus;

    checkListStatus =
      checkListStatus === CheckListStatus.DONE
        ? CheckListStatus.ONGOING
        : CheckListStatus.DONE;

    updateCheckListItemStatus(studyId, weeklySprintId, id, {
      studyMemberId: checkList.studyMemberId,
      checkListStatus,
    })
      .then((res) => {
        setPreWeeklySprintId(res.data.data.preWeeklySprintId);
        setNextWeeklySprintId(res.data.data.nextWeeklySprintId);
        setGoalInfo(res.data.data.goalDetailResponseDto);
      })
      .catch((error) => {
        console.error("체크리스트 상태 업데이트 오류 발생", error);
      });
  };

  const onRemove = (id: number) => {
    if (weeklySprintId === undefined) {
      return;
    }
    deleteCheckListItem(studyId, weeklySprintId, id)
      .then((res) => {
        setPreWeeklySprintId(res.data.data.preWeeklySprintId);
        setNextWeeklySprintId(res.data.data.nextWeeklySprintId);
        setGoalInfo(res.data.data.goalDetailResponseDto);
      })
      .catch((error) => {
        console.error("체크리스트 삭제 오류 발생", error);
      });
  };

  const onEdit = (id: number, text: string) => {
    setEditing({ status: true, id: id, text: text });
  };

  const onSubmit = (e: any) => {
    // 수정 잘 초기화하기
    e.preventDefault();
    if (!value.trim()) {
      return;
    }
    if (weeklySprintId === undefined) {
      return;
    }

    if (editing.status) {
      // 여기에 항목을 수정하는 API 호출 로직을 구현합니다.
      // 수정이 완료되면 editing 상태를 초기화합니다.
      setEditing({ status: false, id: 1, text: "" });
    } else {
      createCheckListItem(studyId, weeklySprintId, {
        studyMemberId: checkList.studyMemberId,
        description: value,
      })
        .then((res) => {
          console.log(res.data);
          setPreWeeklySprintId(res.data.data.preWeeklySprintId);
          setNextWeeklySprintId(res.data.data.nextWeeklySprintId);
          setGoalInfo(res.data.data.goalDetailResponseDto);
        })
        .catch((error) => {
          console.error("체크리스트 상태 업데이트 오류 발생", error);
        });
    }

    setValue("");
  };

  return (
    <div className="todo-list">
      <div className="todo-template">
        <div className="todo-header">
          <h1 className="todo-nickName">{checkList.nickName}</h1>
          <div className="task-left">할 일 {undoneTasks.length}개 남음</div>
        </div>
        <div className="todo-listblock">
          {checkList.checkListItemDtoList.map((task) => (
            <div className="todo-item-block" key={task.checkListId}>
              <div
                className={`check-circle ${
                  task.checkListStatus === CheckListStatus.DONE ? "done" : ""
                }`}
                onClick={() =>
                  onToggle(
                    task.checkListId,
                    task.checkListStatus,
                    task.optionCheckItem,
                    task.optionType
                  )
                }
              >
                {task.checkListStatus === CheckListStatus.DONE && (
                  <span>✔</span>
                )}
              </div>
              <div
                className={`text ${
                  task.checkListStatus === CheckListStatus.DONE ? "done" : ""
                }`}
              >
                {task.description}
              </div>
              {weeklySprintStatus &&
                checkList.studyMemberId === memberId &&
                task.optionCheckItem === OptionCheckItem.PERSONAL && (
                  <div
                    className="edit"
                    onClick={() => onEdit(task.checkListId, task.description)}
                  >
                    <MdModeEdit />
                  </div>
                )}
              {weeklySprintStatus &&
                checkList.studyMemberId === memberId &&
                task.optionCheckItem === OptionCheckItem.PERSONAL && (
                  <div
                    className="remove"
                    onClick={() => onRemove(task.checkListId)}
                  >
                    <span>❌</span>
                  </div>
                )}
            </div>
          ))}
        </div>
        {open && weeklySprintStatus && checkList.studyMemberId === memberId && (
          <div className="insert-form-positioner">
            <form className="insert-form" onSubmit={onSubmit}>
              <input
                autoFocus
                className="input"
                onChange={onChange}
                value={editing.status ? editing.text : value}
                placeholder="할 일을 입력 후, Enter 를 누르세요"
              />
            </form>
          </div>
        )}
        {weeklySprintStatus && checkList.studyMemberId === memberId && (
          <button
            className={`circle-button ${open ? "open" : ""}`}
            onClick={onToggleForm}
          >
            <MdAdd />
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckListCard;
