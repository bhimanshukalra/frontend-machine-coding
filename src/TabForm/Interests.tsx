export const Interests = ({ formData, setFormData, errors }) => {
  const { interests } = formData;
  const availableInterests = ["Coding", "Music", "Javascript"];

  const handleChange = (event, currentInterestItem) => {
    console.log("event.target.checked", event.target.checked);
    if (!event.target.checked) {
      const updatedIterests = interests.filter(
        (item) => item != currentInterestItem
      );
      setFormData((prev) => ({ ...prev, interests: updatedIterests }));
    } else {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, currentInterestItem],
      }));
    }
  };

  return (
    <div>
      <div>
        {availableInterests.map((availableInterestItem) => (
          <label>
            <input
              type="checkbox"
              name={availableInterestItem}
              checked={interests.includes(availableInterestItem)}
              onChange={(e) => handleChange(e, availableInterestItem)}
            />
            {availableInterestItem}
          </label>
        ))}
      </div>
      {errors.interests && (
        <span className="error-msg">{errors.interests}</span>
      )}
    </div>
  );
};
