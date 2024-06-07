export const ProfileField = ({ label, value, edit, handleChange }) => (
    <div className="mb-2">
      <label className="block text-gray-700">{label}:</label>
      {edit ? (
        <input
          type="text"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
      ) : (
        <span className="text-gray-900">{value}</span>
      )}
    </div>
  );
  