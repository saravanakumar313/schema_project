import React, { useState } from 'react';
import TopBar from "../TopBar/TopBar";
import styles from "./Button.module.css";

function ButtonComp() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [schemaList, setSchemaList] = useState([]);
    const [selectedSchema, setSelectedSchema] = useState('');
    const [segmentName, setSegmentName] = useState(''); // State for segment name

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
        setSegmentName("");
        setSchemaList([]);
    };

    // Schema options
    const schemaOptions = [
        { label: "First Name", value: "first_name", type: "user" },
        { label: "Last Name", value: "last_name", type: "user" },
        { label: "Gender", value: "gender", type: "user" },
        { label: "Age", value: "age", type: "user" },
        { label: "Account Name", value: "account_name", type: "group" },
        { label: "City", value: "city", type: "group" },
        { label: "State", value: "state", type: "group" }
    ];

    // Handle schema selection
    const handleSchemaChange = (e) => {
        setSelectedSchema(e.target.value);
    };

    // Add new schema to the list
    const addSchema = () => {
        if (selectedSchema) {
            setSchemaList([...schemaList, selectedSchema]);
            setSelectedSchema(''); // Reset selected schema
        }
    };

    // Remove schema from the list
    const removeSchema = (index) => {
        setSchemaList(schemaList.filter((_, i) => i !== index));
    };

    // Get bullet color based on schema type
    const getBulletColor = (schema) => {
        const selectedOption = schemaOptions.find(option => option.value === schema);
        return selectedOption && selectedOption.type === "user" ? "green" : "red";
    };

    // Filter the available schema options that have not been selected yet
    const availableSchemas = schemaOptions.filter(option => !schemaList.includes(option.value));

    // Handle save and send data to the server via Webhook
/* const handleSave = async () => {
    const data = {
        segment_name: segmentName,
        schema: schemaList.map((schema) => {
            const selectedOption = schemaOptions.find(option => option.value === schema);
            return { [schema]: selectedOption?.label };
        })
    };

    const proxyUrl = 'http://localhost:3001/proxy'; // Your local proxy server

    // Send the data to the local proxy server
    try {
        const response = await fetch(proxyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('Segment saved successfully', result);
        togglePopup(); // Close the popup after saving
    } catch (error) {
        console.error('Error while saving segment:', error);
    }
}; */

const handleSave = () => {
    const data = {
      segment_name: segmentName,
      schema: schemaList.map((schema) => {
        const selectedOption = schemaOptions.find(option => option.value === schema);
        return { [schema]: selectedOption?.label };
    })
    };

    console.log("data: ",data);
    

    fetch("http://localhost:3001/save-segment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Segment saved:", data);
        setSegmentName("");
        setSchemaList([]);
        togglePopup(); // Close the popup after saving
      })
      .catch((error) => console.error("Error saving segment:", error));
  };


    return (
        <>
            <TopBar title="View Audience" />
            <button className={styles.button} onClick={togglePopup}>Save Segment</button>

            {/* Overlay for background blur */}
            <div className={`${styles.overlay} ${isPopupVisible ? styles.show : ""}`} onClick={togglePopup}></div>

            {/* Popup container */}
            <div className={`${styles.popupContainer} ${isPopupVisible ? styles.show : ""}`}>
                <TopBar title="Saving Segment" onBack={togglePopup} />
                <div className={styles.popupContent}>
                    <label htmlFor="segmentName" className={styles.label}>Enter the Name of the Segment</label><br />
                    <input
                        type="text"
                        id="segmentName"
                        className={styles.input}
                        placeholder="Enter segment name"
                        value={segmentName}
                        onChange={(e) => setSegmentName(e.target.value)} // Update segment name state
                    />
                    <p>To save your segment, you need to add schemas to build the query</p>

                    {/* User and Group Traits Labels with Colored Bullets */}
                    <div className={styles.traitsContainer}>
                        <div className={styles.traitLabel}>
                            <span className={styles.greenBullet}></span>- User Traits
                        </div>&nbsp;&nbsp;
                        <div className={styles.traitLabel}>
                            <span className={styles.redBullet}></span>- Group Traits
                        </div>
                    </div>

                    {/* Blue box displaying added schemas */}
                    <div className={styles.blueBox}>
                        {schemaList.length > 0 && (
                            <div className={styles.addedSchemas}>
                                {schemaList.map((schema, index) => (
                                    <div key={index} className={styles.schemaItem}>
                                        <span className={`${styles.bullet} ${getBulletColor(schema) === "green" ? styles.greenBullet : styles.redBullet}`}></span>
                                        <select className={styles.dropdown} value={schema} disabled>
                                            {schemaOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className={styles.removeButton}
                                            onClick={() => removeSchema(index)}
                                        >
                                            -
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dropdown to add schema */}
                    <div className={styles.schemaContainer}>
                        <select
                            id="addSchema"
                            className={styles.dropdown}
                            value={selectedSchema}
                            onChange={handleSchemaChange}
                        >
                            <option value="">Add schema to segment</option>
                            {availableSchemas.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <span onClick={addSchema} className={styles.addSchemaText}>+Add new schema</span>
                    </div>

                    {/* Footer with Save and Cancel buttons */}
                    <div className={styles.popupFooter}>
                        <button className={styles.saveButton} onClick={handleSave}>Save</button>
                        <button className={styles.cancelButton} onClick={togglePopup}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ButtonComp;
