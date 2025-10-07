import { useState } from "react";
import "./TabForm.css";
import { Interests } from "./Interests";
import { Profile } from "./Profile";
import { Settings } from "./Settings";

export const TabForm = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "Name",
    age: 18,
    email: "test@test.com",
    interests: ["Coding", "Music"],
    theme: "Dark",
  });

  const [errors, setErrors] = useState({});

  const tabs = [
    {
      title: "Profile",
      component: Profile,
      validate: () => {
        const err = {};
        if (!formData.name || formData.name.length < 2) {
          err.name = "Name is not valid";
        }
        if (!formData.age || formData.age < 18) {
          err.age = "Age is not valid";
        }
        if (!formData.email || formData.email.length < 2) {
          err.email = "Email is not valid";
        }
        setErrors(err);
        console.log(Object.keys(err), formData);
        return Object.keys(err).length === 0;
      },
    },
    {
      title: "Interests",
      component: Interests,
      validate: () => {
        const err = {};
        if (formData.interests.length < 1) {
          err.interests = "Select atleast one interest";
        }
        setErrors(err);
        return Object.keys(err).length === 0;
      },
    },
    {
      title: "Settings",
      component: Settings,
    },
  ];

  const ActiveTabComponent = tabs[activeTabIndex].component;

  const isLastTab = () => {
    return activeTabIndex === tabs.length - 1;
  };
  const isFirstTab = () => {
    return activeTabIndex === 0;
  };
  const onClickPrev = () => {
    if (!tabs[activeTabIndex].validate || tabs[activeTabIndex].validate()) {
      setActiveTabIndex((prev) => prev - 1);
    }
  };
  const onClickSubmit = () => {
    console.log("Submitted details: ", formData);
  };
  const onClickNext = () => {
    if (!tabs[activeTabIndex].validate || tabs[activeTabIndex].validate()) {
      setActiveTabIndex((prev) => prev + 1);
    }
  };

  const handleTabChange = (index) => {
    if (!tabs[activeTabIndex].validate || tabs[activeTabIndex].validate()) {
      setActiveTabIndex(index);
    }
  };

  return (
    <div>
      <div className="heading-container">
        {tabs.map((tabItem, index) => (
          <div
            key={index}
            className="heading-title"
            onClick={() => handleTabChange(index)}
          >
            {tabItem.title}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponent
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
      </div>
      <div className="bottom-button-container">
        {!isFirstTab() && (
          <button className="prev-button" onClick={onClickPrev}>
            Prev
          </button>
        )}
        {isLastTab() && (
          <button className="submit-button" onClick={onClickSubmit}>
            Submit
          </button>
        )}
        {!isLastTab() && (
          <button className="next-button" onClick={onClickNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
