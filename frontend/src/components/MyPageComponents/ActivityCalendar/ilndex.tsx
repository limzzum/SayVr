import React, { useEffect, useState } from 'react';
import './style.css';

interface Activity {
  day: string;
  activity: number;
}

interface ActivityCalendarProps {
  sampleData: Activity[];
  colorCustomization: any; // Update the type accordingly
  showMonth: boolean;
}

export function ActivityCalendar({ sampleData, colorCustomization, showMonth }: ActivityCalendarProps) {
  const [graphData, setGraphData] = useState<number[]>([]);
  const tempGraphData: number[] = Array(366).fill(0);
  const [currentYear, setCurrentYear] = useState<number>(2023);
  const [dateText, setDayText] = useState<string[]>([]);
  const [showMonthBar, setShowMonthBar] = useState<boolean>(true);

  const getDayOfYear = (date: string): number => {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const year = parseInt(date.substring(0, 4));
    setCurrentYear(year);
    let month = parseInt(date.substring(5, 7));
    let day = parseInt(date.substring(8));
    if (month > 2 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      day = day + 1;
    }
    while (month > 0) {
      month = month - 1;
      if (month !== 0) day = day + days[month - 1];
    }
    return day;
  };

  const dateFromDay = (day: number): string => {
    const date = new Date(currentYear, 0);
    const newDate = new Date(date.setDate(day)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
    return newDate;
  };

  const initialiseDateText = (): void => {
    const tempDateTextList: string[] = Array(366).fill('');
    for (let i = 1; i <= 365; i++) {
      tempDateTextList[i] = dateFromDay(i);
    }
    setDayText(tempDateTextList);
  };

  const initialise = (): void => {
    sampleData.forEach((item) => {
      const activityDay = getDayOfYear(item.day);
      tempGraphData[activityDay] = item.activity;
    });
    setGraphData([...tempGraphData]);
  };

  useEffect(() => {
    setShowMonthBar(showMonth);
    if (!sampleData) sampleData = [];
    initialiseDateText();
  }, []);

  useEffect(() => {
    initialise();
  }, []);

  const matchColorComb = (colorId: number): string => {
    if (!colorCustomization) {
      if (colorId >= 4) return "#5105fd";
      else if (colorId === 0) return "#dadada";
      else if (colorId === 2) return "#5105fd69";
      else if (colorId === 1) return "#5105fd52";
      else return "#5105fd99";
    }
    if (colorId >= 4) return colorCustomization.activity4;
    else if (colorId === 0) return colorCustomization.activity0;
    else if (colorId === 1) return colorCustomization.activity1;
    else if (colorId === 2) return colorCustomization.activity2;
    else return colorCustomization.activity3;
  };

  return (
    <div className="activity-calender">
      {showMonthBar ? (
        <div className="months-wrapper">
          {/* Add your month spans here */}
        </div>
      ) : null}
      <div className="ac-wrapper">
        {[...Array(52)].map((_, i) => (
          <div className="aci-wrapper" key={i}>
            {[...Array(7)].map((_, j) => {
              const dayIndex = i * 7 + j + 1;
              return (
                <div
                  key={dayIndex}
                  className={`ac-item day-${dayIndex} ${graphData[dayIndex] !== 0 ? `active activity-${graphData[dayIndex] < 4 ? graphData[dayIndex] : 4}` : ''}`}
                  style={{
                    background: matchColorComb(graphData[dayIndex]),
                  }}
                >
                  <span className="tooltiptext">{graphData[dayIndex]} activity on {dateText.length !== 0 ? dateText[dayIndex].toString() : ''}</span>
                </div>
              );
            })}
          </div>
        ))}
        <div className="aci-wrapper">
          <div
            className={`ac-item day-365 ${graphData[365] !== 0 ? `active activity-${graphData[365] < 4 ? graphData[365] : 4}` : ''}`}
            style={{
              background: matchColorComb(graphData[365]),
            }}
          >
            <span className="tooltiptext">{graphData[365]} activity on {dateText.length !== 0 ? dateText[365].toString() : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
