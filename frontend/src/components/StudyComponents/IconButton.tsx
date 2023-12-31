import React from "react"
interface Props{
    handleButtonClick: ()=>void,
    size:number,
    icon:React.ReactNode,
    onHover?:boolean,
}

const IconButton : React.FC<Props> = ({ handleButtonClick,size,icon,onHover }) => {
  return (
    <>
      <svg
        className={onHover?'icon-button':'button'}
        onClick={handleButtonClick}
        width={`${size}`}      height={`${size}`} 
        viewBox={`0 0 ${size} ${size}`}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
     {icon}
      </svg>
    </>
  )
}
export default IconButton
