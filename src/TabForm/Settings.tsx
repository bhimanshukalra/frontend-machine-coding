export const Settings = ({ formData, setFormData }) => {
  const { theme } = formData;
  const availableSettings = ["Dark", "Light"];

  const handleChange = (event) => {
    // console.log("Settings handleChange", settingItem);
    setFormData((prev) => ({ ...prev, theme: event.target.name }));
  };

  return (
    <div>
      <div>
        {availableSettings.map((settingItem) => (
          <label>
            <input
              type="radio"
              name={settingItem}
              checked={theme === settingItem}
              onChange={handleChange}
            />
            {settingItem}
          </label>
        ))}
      </div>
    </div>
  );
};
