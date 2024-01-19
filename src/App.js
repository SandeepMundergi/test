import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';

function App() {
  const [skillData, setSkillData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/SandeepMundergi/Data/main/output.json');
        const data = await response.json();

        // Check if there are changes in the skill data
        const cachedSkillData = localStorage.getItem('cachedSkillData');
        if (JSON.stringify(cachedSkillData) !== JSON.stringify(data)) {
          // Skill data has changed, update the state
          setSkillData(data);
        } else {
          // Skill data is the same or not in the cache, set it in the cache
          localStorage.setItem('cachedSkillData', JSON.stringify(data));
          setSkillData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);

        // Attempt to load from cache if fetching fails
        const cachedSkillData = localStorage.getItem('cachedSkillData');
        if (cachedSkillData) {
          setSkillData(JSON.parse(cachedSkillData));
        }
      }
    };

    fetchData();
  }, []);

  console.log(skillData);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {skillData && (
          <div>
            <p>Skill Name: {skillData.skills[0].title}</p>
            <p>Skill Image:</p>
            <img src={skillData.skills[0].skills[1].image} alt={skillData.Bio.name} />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
