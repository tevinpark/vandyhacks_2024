"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/schoolpage.module.css";
import Dropdown from "../components/dropdown";


function SchoolPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [profData, setProfData] = useState([]);
  const [qualityValue, setQualityValue] = useState(0);
  const [difficultyValue, setDifficultyValue] = useState(0);
  const [takeAgainValue, setTakeAgainValue] = useState(0);
  const [profScores, setProfScores] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedDepartment(option);
  };

  const handleQualitySliderChange = (event) => {
    setQualityValue(event.target.value);
  };

  const handleDifficultySliderChange = (event) => {
    setDifficultyValue(event.target.value);
  };

  const handleTakeAgainSliderChange = (event) => {
    setTakeAgainValue(event.target.value);
  };

  useEffect(() => {
    const fetchProfData = async () => {
      if (!selectedDepartment || selectedDepartment === 'Select Department') {
        setProfData([]);
        return;
      }
      try {
        const response = await fetch(`/api/profData?department=${selectedDepartment}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProfData(result);
      } catch (err) {
        console.error("Failed to fetch prof data:", err);
      }
    };

    fetchProfData();
  }, [selectedDepartment]);

  useEffect(() => {
    if (profData && profData.length > 0) {
      const scores = profData.map(professor => {
        const { OverallQuality, Difficulty, TakeAgain } = professor;

        const score = (OverallQuality * qualityValue - Difficulty * difficultyValue + (TakeAgain/20) * takeAgainValue)/15;

        return { ...professor, score };
      });

      scores.sort((a, b) => b.score - a.score);

      setProfScores(scores);
    }
    else {
      setProfScores([]);
    }
  }, [profData, qualityValue, difficultyValue, takeAgainValue]);


  return (
    <div className={styles.schoolpage}>
      <h2>Vanderbilt University</h2>
      <Dropdown selectedOption={selectedDepartment} onOptionChange={handleOptionChange} />
      <input
        type="range"
        min="0"
        max="100"
        value={qualityValue}
        onChange={handleQualitySliderChange}
        className={styles.sliders}
      />
      <p>Current Value: {qualityValue}</p>
      <input
        type="range"
        min="0"
        max="100"
        value={difficultyValue}
        onChange={handleDifficultySliderChange}
        className={styles.sliders}
      />
      <p>Current Value: {difficultyValue}</p>
      <input
        type="range"
        min="0"
        max="100"
        value={takeAgainValue}
        onChange={handleTakeAgainSliderChange}
        className={styles.sliders}
      />
      <p>Current Value: {takeAgainValue}</p>
      <ul>
        {profScores && profScores.length > 0 ? (
          profScores.map((professor, index) => (
            <li key={index}>
              Name: {professor.Name}, Department: {professor.Department}, Score: {professor.score}
            </li>
          ))
        ) : (
          <li>No professors found.</li>
        )}
      </ul>
    </div>
  );
}

export default SchoolPage;