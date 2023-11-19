import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { MdAdd, MdModeEdit, MdDelete } from "react-icons/md"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import {
  GoalDetailResponseDto,
  GoalResponseDto,
  OptionType,
  StudyRole,
  getWeeklySprint,
  updateGoal,
  deleteGoal,
  createGoal,
} from "../../api/StudyPageAPI/StudyAPI"
import CheckListCard from "./CheckListCard"

interface WeeklySprintComponentProps {
  goalInfo?: GoalDetailResponseDto
  setPreWeeklySprintId: React.Dispatch<React.SetStateAction<number>>
  setNextWeeklySprintId: React.Dispatch<React.SetStateAction<number>>
  preWeeklySprintId: number
  nextWeeklySprintId: number
  setGoalInfo: React.Dispatch<React.SetStateAction<GoalDetailResponseDto | undefined>>
  studyId: number
  memberId: number | undefined
  studyRole: StudyRole | undefined
}

export interface CreateGoalRequestDto {
  optionType: OptionType | string
  count: number | undefined
  description: string | undefined
}

export interface UpdateGoalResquestDto {
  optionType: OptionType | string
  count: number | undefined
  description: string | undefined
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
  const [pageIndex, setPageIndex] = useState(0)
  const [weeklySprintStatus, setWeeklySprintStatus] = useState(true)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [editing, setEditing] = useState({ status: false, id: 0, text: "" })

  const itemsPerPage = 3

  const onToggleForm = () => setOpen(!open)
  const onChange = (e: any) => setValue(e.target.value)
  const [unregisteredOptionTypes, setUnregisteredOptionTypes] = useState<OptionType[]>([])
  const [selectedOptionType, setSelectedOptionType] = useState<OptionType | string>(
    unregisteredOptionTypes.length > 0 ? unregisteredOptionTypes[0] : OptionType.ETC
  )
  const [editingGoal, setEditingGoal] = useState<GoalResponseDto | undefined>(undefined)

  useEffect(() => {
    if (unregisteredOptionTypes.length > 0) {
      setSelectedOptionType(unregisteredOptionTypes[0])
    } else {
      setSelectedOptionType(OptionType.ETC)
    }
  }, [unregisteredOptionTypes])

  useEffect(() => {
    const registeredOptionTypes = goalInfo?.goalDtoList?.map((goal) => goal.optionType)
    const allOptionTypes = [OptionType.VR, OptionType.QUIZ, OptionType.GAME]
    if (registeredOptionTypes) {
      // registeredOptionTypes가 undefined인지 체크
      const newUnregisteredOptionTypes = allOptionTypes.filter((optionType) => !registeredOptionTypes.includes(optionType))
      setUnregisteredOptionTypes(newUnregisteredOptionTypes)
    }
  }, [goalInfo])

  const onEdit = (goal: GoalResponseDto) => {
    if (editing.status && editing.id === goal.goalId) {
      setEditing({ status: false, id: 0, text: "" })
      setValue("")
      setEditingGoal(undefined)
    } else {
      setEditing({ status: true, id: goal.goalId, text: goal.description })
      setValue(goal.description)
      setEditingGoal(goal)
    }
  }

  const onDelete = (goal: GoalResponseDto) => {
    deleteGoal(studyId, goalInfo?.weeklySprintId, goal.goalId)
      .then((res) => {
        setNextWeeklySprintId(res.data.data.nextWeeklySprintId)
        setPreWeeklySprintId(res.data.data.preWeeklySprintId)
        setGoalInfo(res.data.data.goalDetailResponseDto)
      })
      .catch((error) => {
        console.error("목표 수정 오류 발생", error)
      })
  }

  const handlePrevClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1)
    }
  }
  const handleNextClick = () => {
    if (goalInfo?.memberCheckListResponseDtoList === undefined) {
      return
    }
    if (pageIndex < Math.ceil(goalInfo?.memberCheckListResponseDtoList.length / itemsPerPage) - 1) {
      setPageIndex(pageIndex + 1)
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (!value.trim()) {
      return
    }

    if (editing.status && editingGoal) {
      console.log("수정할 값:", value)
      const updateGoalRequest: UpdateGoalResquestDto = {
        optionType: editingGoal.optionType,
        description: ["VR", "GAME", "QUIZ"].includes(editingGoal.optionType) ? undefined : value,
        count: ["VR", "GAME", "QUIZ"].includes(editingGoal.optionType) ? parseInt(value) : undefined,
      }
      updateGoal(studyId, goalInfo?.weeklySprintId, editing.id, updateGoalRequest)
        .then((res) => {
          setEditing({ status: false, id: 0, text: "" })
          setNextWeeklySprintId(res.data.data.nextWeeklySprintId)
          setPreWeeklySprintId(res.data.data.preWeeklySprintId)
          setGoalInfo(res.data.data.goalDetailResponseDto)
        })
        .catch((error) => {
          console.error("목표 수정 오류 발생", error)
        })
    } else {
      // 목표 추가 로직
      console.log("추가할 값:", value)
      const createGoalRequest: CreateGoalRequestDto = {
        optionType: selectedOptionType,
        description: ["VR", "GAME", "QUIZ"].includes(selectedOptionType) ? undefined : value,
        count: ["VR", "GAME", "QUIZ"].includes(selectedOptionType) ? parseInt(value) : undefined,
      }
      createGoal(studyId, goalInfo?.weeklySprintId, createGoalRequest)
        .then((res) => {
          console.log(res.data)
          setValue("")
          setNextWeeklySprintId(res.data.data.nextWeeklySprintId)
          setPreWeeklySprintId(res.data.data.preWeeklySprintId)
          setGoalInfo(res.data.data.goalDetailResponseDto)
        })
        .catch((error) => {
          console.error("목표 추가 오류 발생", error)
        })
    }
  }
  const handlePrevDate = () => {
    getWeeklySprint(studyId, preWeeklySprintId)
      .then((res) => {
        setPreWeeklySprintId(res.data.data.preWeeklySprintId)
        setNextWeeklySprintId(res.data.data.nextWeeklySprintId)
        setGoalInfo(res.data.data.goalDetailResponseDto)
      })
      .catch((error) => {
        console.error("이전 스프린트 조회 오류 발생", error)
      })
  }

  const handleNextDate = () => {
    getWeeklySprint(studyId, nextWeeklySprintId)
      .then((res) => {
        setPreWeeklySprintId(res.data.data.preWeeklySprintId)
        setNextWeeklySprintId(res.data.data.nextWeeklySprintId)
        setGoalInfo(res.data.data.goalDetailResponseDto)
      })
      .catch((error) => {
        console.error("다음 스프린트 조회 오류 발생", error)
      })
  }

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (goalInfo?.targetDate) {
      const targetDate = new Date(goalInfo.targetDate)
      targetDate.setHours(0, 0, 0, 0)
      const sevenDaysLater = new Date(targetDate)
      sevenDaysLater.setDate(sevenDaysLater.getDate() + 6)

      console.log("targetDate:", targetDate)
      console.log("sevenDaysLater:", sevenDaysLater)

      if (today >= targetDate && today <= sevenDaysLater) {
        setWeeklySprintStatus(false)
      } else {
        setWeeklySprintStatus(true)
      }

      console.log("weeklySprintStatus:", weeklySprintStatus)
    }
  }, [goalInfo])

  interface ArrowProps {
    onClick: () => void
  }

  const ArrowLeft = (props: ArrowProps) => {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
            width:"4rem"
          }}
          className="clickable"
          onClick={props.onClick}
        >
          <BsArrowLeft />
        </div>
      </>
    )
  }
  const ArrowRight = (props: ArrowProps) => {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
            width:"4rem"
          }}
          className="clickable"
          onClick={props.onClick}
        >
          <BsArrowRight />
        </div>
      </>
    )
  }

  return (
    <div className='weeklySprint-container' style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <div className='week-goal-list' style={{ flex: "0 0 auto", width: "31%"}}>
        <div className='week-goal-inner'>
          <div className='week-inner-list'>
            {goalInfo ?<>
            <p>
              기간 :{preWeeklySprintId && <IoIosArrowBack onClick={handlePrevDate} style={{ cursor: "pointer" }} />}
              {goalInfo
                ? `${new Date(goalInfo.targetDate).getFullYear()}.${new Date(goalInfo.targetDate).getMonth() + 1}.${new Date(
                    goalInfo.targetDate
                  ).getDate()} - 
      ${new Date(new Date(goalInfo.targetDate).setDate(new Date(goalInfo.targetDate).getDate() + 6)).getFullYear()}.${
                    new Date(new Date(goalInfo.targetDate).setDate(new Date(goalInfo.targetDate).getDate() + 6)).getMonth() + 1
                  }.${new Date(new Date(goalInfo.targetDate).setDate(new Date(goalInfo.targetDate).getDate() + 6)).getDate()}`
                : ""}
              {nextWeeklySprintId && <IoIosArrowForward onClick={handleNextDate} style={{ cursor: "pointer" }} />}
            </p></>: <p>목표를 추가하세요.</p>}
          </div>
          <div className="to-scroll" style={{maxHeight:"80%", height:"70%",overflowY:"scroll"}} >
          {goalInfo?.goalDtoList.map((goal) => (
            <div key={goal.goalId}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ margin: 0 }}>목표: {goal.description}</p>
                <p style={{ margin: 0 }}>횟수: {goal.count}</p>
                {!weeklySprintStatus && studyRole === StudyRole.LEADER && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    {/* flex 속성 추가 */}
                    <div className='edit' onClick={() => onEdit(goal)}>
                      <MdModeEdit />
                    </div>
                    <div className='delete' onClick={() => onDelete(goal)}>
                      <MdDelete />
                    </div>
                  </div>
                )}
              </div>
              {editing.status && editing.id === goal.goalId && (
                <div className='insert-form-positioner-goal'>
                  <form className='insert-form-goal' onSubmit={onSubmit}>
                    {["VR", "GAME", "QUIZ"].includes(goal.optionType) ? (
                      <input
                        type='number'
                        autoFocus
                        className='input-goal'
                        onChange={onChange}
                        value={value}
                        placeholder='수정할 횟수를 입력 후, Enter 를 누르세요'
                      />
                    ) : (
                      <input
                        autoFocus
                        className='input-goal'
                        onChange={onChange}
                        value={value}
                        placeholder='수정할 목표를 입력 후, Enter 를 누르세요'
                      />
                    )}
                  </form>
                </div>
              )}
            </div>
          ))}</div>
          {open && !weeklySprintStatus && studyRole === StudyRole.LEADER && (
            <div className='insert-form-positioner-goal'>
              <form className='insert-form-goal' onSubmit={onSubmit}>
                <select value={selectedOptionType} onChange={(e) => setSelectedOptionType(e.target.value)}>
                  {unregisteredOptionTypes.map((optionType) => (
                    <option key={optionType} value={optionType}>
                      {optionType}
                    </option>
                  ))}
                  <option value={OptionType.ETC}>{OptionType.ETC}</option>
                </select>
                {selectedOptionType === "ETC" ? (
                  <input
                    autoFocus
                    className='input-goal'
                    onChange={onChange}
                    value={value}
                    placeholder='설명을 입력 후, Enter 를 누르세요'
                  />
                ) : (
                  <input
                    type='number'
                    autoFocus
                    className='input-goal'
                    onChange={onChange}
                    value={value}
                    placeholder='수정할 횟수를 입력 후, Enter 를 누르세요'
                  />
                )}
                <button type='submit'>추가</button>
              </form>
            </div>
          )}
          {!weeklySprintStatus && studyRole === StudyRole.LEADER && (
            <button className={`circle-button-goal ${open ? "open" : ""}`} onClick={onToggleForm}>
              <MdAdd />
            </button>
          )}
          
        </div>
      </div>
      <div className='checklist-container-div' style={{ width:"69%" ,flex: 2 }}>
        <div className='checklist-container-inner' style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {
            goalInfo && <>
          <ArrowLeft onClick={handlePrevClick} />
          {goalInfo?.memberCheckListResponseDtoList.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((checkList) => (
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
          <ArrowRight onClick={handleNextClick} /></>
          }
        </div>
      </div>
    </div>
  )
}

export default WeeklySprintComponent
