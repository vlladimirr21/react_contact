import React, { useState, useEffect } from 'react'

const TestLocalStorage = () => {
  const [testData, setTestData] = useState([])

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('testData') || '[]')
    console.log('Loaded test data:', savedData)
    setTestData(savedData)
  }, [])

  useEffect(() => {
    console.log('Saving test data:', testData)
    localStorage.setItem('testData', JSON.stringify(testData))
  }, [testData])

  const handleAddTestData = () => {
    const newData = [...testData, `Item ${testData.length + 1}`]
    setTestData(newData)
  }

  return (
    <div>
      <button onClick={handleAddTestData}>Add Test Data</button>
      <ul>
        {testData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default TestLocalStorage
