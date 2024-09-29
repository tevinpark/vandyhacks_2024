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
        const { OverallQuality, Difficulty, TakeAgain , NumberOfReviews} = professor;

        const score = ((((OverallQuality * qualityValue * (1 + NumberOfReviews * 0.01)) - Difficulty * difficultyValue + (TakeAgain / 20) * takeAgainValue * (1 + NumberOfReviews * 0.001))) / 15).toFixed(1);

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
      <div className={styles.professorSelectionContainer}>
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
        <p>Quality Weight: {qualityValue}</p>
        <input
          type="range"
          min="0"
          max="100"
          value={difficultyValue}
          onChange={handleDifficultySliderChange}
          className={styles.sliders}
        />
        <p>Difficulty Weight: {difficultyValue}</p>
        <input
          type="range"
          min="0"
          max="100"
          value={takeAgainValue}
          onChange={handleTakeAgainSliderChange}
          className={styles.sliders}
        />
        <p>Take Again Weight: {takeAgainValue}</p>
      </div>
      <div className={styles.professorContainer}>
        {profScores && profScores.length > 0 ? (
          profScores.map((professor, index) => (
            <div className={styles.professorDiv}>
              <div className={styles.professorInfoDiv}>
                <p key={index} className={styles.professorName}>
                  Name: {professor.Name}
                </p>
                <p key={index} className={styles.professorDepartment}>
                  Department: {professor.Department}
                </p>
              </div>
              <div className={styles.professorScoresDiv}>
                <div className={styles.professorScoreDiv}>
                  <p>Overall Quality </p>
                  <p key={index}>
                    {professor.OverallQuality}
                  </p>
                </div>
                <div className={styles.professorScoreDiv}>
                  <p>Difficulty </p>
                  <p key={index}>
                    {professor.Difficulty}
                  </p>
                </div>
                <div className={styles.professorScoreDiv}>
                  <p>Take Again </p>
                  <p key={index}>
                    {professor.TakeAgain}
                  </p>
                </div>
                <div className={styles.professorScoreDiv}>
                  <p># of Reviews </p>
                  <p key={index}>
                    {professor.NumberOfReviews}
                  </p>
                </div>
                <div className={styles.professorScoreDiv}>
                  <p>Score </p>
                  <p key={index}>
                    {professor.score}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <li>No professors found.</li>
        )}
      </div>
    </div>
  );
}

export default SchoolPage;