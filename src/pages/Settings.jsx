import { useState } from "react";
import {
  backupData,
  restoreData,
} from "../utils/backupRestore";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

function Settings() {
const { settings, setSettings } = useContext(SettingsContext);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogo = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    setSettings({
      ...settings,
      logo: reader.result,
    });
  };

  reader.readAsDataURL(file);
};

 const saveSettings = () => {
  localStorage.setItem("settings", JSON.stringify(settings));
  alert("Settings Saved Successfully ✅");

  window.location.reload();
};
  return (
    <div style={{ padding: "30px" }}>
      <h1>⚙️ Settings</h1>

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,.08)",
          maxWidth: "600px",
        }}
      >
        <input
          type="text"
          name="schoolName"
          placeholder="Driving School Name"
          value={settings.schoolName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={settings.ownerName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={settings.phone}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={settings.email}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={settings.address}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            resize: "none",
            height: "80px",
          }}
        />
<div style={{ marginBottom: "20px" }}>
  <label
    style={{
      fontWeight: "bold",
      display: "block",
      marginBottom: "10px",
    }}
  >
    📷 Driving School Logo
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleLogo}
  />

  {settings.logo && (
    <img
      src={settings.logo}
      alt="Logo"
      style={{
        width: "120px",
        marginTop: "15px",
        borderRadius: "10px",
        border: "2px solid #ddd",
      }}
    />
  )}
</div>

        <button
          onClick={saveSettings}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          💾 Save Settings
        </button>
        <hr style={{ margin: "25px 0" }} />

<button
  onClick={backupData}
  style={{
    background: "#16a34a",
    color: "#fff",
    padding: "12px 18px",
    border: "none",
    borderRadius: "8px",
    marginRight: "15px",
    cursor: "pointer",
  }}
>
  💾 Backup Data
</button>

<label
  style={{
    background: "#2563eb",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  📂 Restore Backup

  <input
    type="file"
    hidden
    accept=".json"
    onChange={restoreData}
  />
</label>
      </div>
    </div>
  );
}

export default Settings;