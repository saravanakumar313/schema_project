import React, { useState } from 'react';
import TopBar from "../TopBar/TopBar";
import styles from "./Style.module.css";

function ButtonComp() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [schemaList, setSchemaList] = useState([]);
    const [selectedSchema, setSelectedSchema] = useState('');
    const [segmentName, setSegmentName] = useState(''); 

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

    const handleSchemaChange = (e) => {
        setSelectedSchema(e.target.value);
    };

    const addSchema = () => {
        if (selectedSchema) {
            setSchemaList([...schemaList, selectedSchema]);
            setSelectedSchema('');
        }
    };

    const removeSchema = (index) => {
        setSchemaList(schemaList.filter((_, i) => i !== index));
    };

    const getBulletColor = (schema) => {
        const selectedOption = schemaOptions.find(option => option.value === schema);
        return selectedOption && selectedOption.type === "user" ? "green" : "red";
    };

    const availableSchemas = schemaOptions.filter(option => !schemaList.includes(option.value));

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
        togglePopup(); 
      })
      .catch((error) => console.error("Error saving segment:", error));
  };


    return (
        <>
            <TopBar title="View Audience" />
            <button className={styles.button} onClick={togglePopup}>Save Segment</button>

            <div className={`${styles.overlay} ${isPopupVisible ? styles.show : ""}`} onClick={togglePopup}></div>

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
                        onChange={(e) => setSegmentName(e.target.value)} 
                    />
                    <p>To save your segment, you need to add schemas to build the query</p>

                    <div className={styles.traitsContainer}>
                        <div className={styles.traitLabel}>
                            <span className={styles.greenBullet}></span>- User Traits
                        </div>&nbsp;&nbsp;
                        <div className={styles.traitLabel}>
                            <span className={styles.redBullet}></span>- Group Traits
                        </div>
                    </div>

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
