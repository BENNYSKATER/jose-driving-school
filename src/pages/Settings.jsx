import { useContext, useState } from "react";
import {
  FaCog,
  FaSchool,
  FaUserTie,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaImage,
  FaSave,
  FaDownload,
  FaUpload,
} from "react-icons/fa";

import {
  backupData,
  restoreData,
} from "../utils/backupRestore";

import { SettingsContext } from "../context/SettingsContext";

import "../css/Settings.css";

function Settings() {
  const { settings, setSettings } =
    useContext(SettingsContext);

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogo = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setSettings((prev) => ({
        ...prev,
        logo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setSettings((prev) => ({
      ...prev,
      logo: "",
    }));
  };

  const saveSettings = () => {
    setSaving(true);

    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    setTimeout(() => {
      setSaving(false);
      alert("Settings Saved Successfully ✅");
      window.location.reload();
    }, 500);
  };

  return (
    <div className="settings-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="settings-header">

        <div className="settings-heading">

          <div className="settings-heading-icon">
            <FaCog />
          </div>

          <div>
            <h1>Settings</h1>

            <p>
              Manage your driving school information
              and application data
            </p>
          </div>

        </div>

      </div>


      {/* =========================
          MAIN GRID
      ========================= */}

      <div className="settings-grid">

        {/* =========================
            SCHOOL INFORMATION
        ========================= */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-card-icon blue">
              <FaSchool />
            </div>

            <div>
              <h2>School Information</h2>

              <p>
                Basic driving school details
              </p>
            </div>

          </div>


          <div className="settings-form">

            {/* SCHOOL NAME */}

            <div className="settings-field full">

              <label>
                Driving School Name
              </label>

              <div className="settings-input">

                <FaSchool />

                <input
                  type="text"
                  name="schoolName"
                  placeholder="Jose Driving School"
                  value={
                    settings?.schoolName || ""
                  }
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* OWNER */}

            <div className="settings-field">

              <label>
                Owner Name
              </label>

              <div className="settings-input">

                <FaUserTie />

                <input
                  type="text"
                  name="ownerName"
                  placeholder="Owner name"
                  value={
                    settings?.ownerName || ""
                  }
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* PHONE */}

            <div className="settings-field">

              <label>
                Phone Number
              </label>

              <div className="settings-input">

                <FaPhone />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={
                    settings?.phone || ""
                  }
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="settings-field full">

              <label>
                Email Address
              </label>

              <div className="settings-input">

                <FaEnvelope />

                <input
                  type="email"
                  name="email"
                  placeholder="school@example.com"
                  value={
                    settings?.email || ""
                  }
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* ADDRESS */}

            <div className="settings-field full">

              <label>
                School Address
              </label>

              <div className="settings-textarea">

                <FaMapMarkerAlt />

                <textarea
                  name="address"
                  placeholder="Enter driving school address"
                  value={
                    settings?.address || ""
                  }
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            LOGO
        ========================= */}

        <div className="settings-card logo-card">

          <div className="settings-card-header">

            <div className="settings-card-icon purple">
              <FaImage />
            </div>

            <div>
              <h2>School Logo</h2>

              <p>
                Upload your driving school logo
              </p>
            </div>

          </div>


          <div className="logo-upload-area">

            <div className="logo-preview">

              {settings?.logo ? (
                <img
                  src={settings.logo}
                  alt="Driving School Logo"
                />
              ) : (
                <div className="logo-placeholder">
                  <FaImage />
                  <span>No Logo</span>
                </div>
              )}

            </div>


            <label className="logo-upload-btn">

              <FaUpload />

              Choose Logo

              <input
                type="file"
                accept="image/*"
                onChange={handleLogo}
                hidden
              />

            </label>


            {settings?.logo && (
              <button
                type="button"
                className="remove-logo-btn"
                onClick={removeLogo}
              >
                Remove Logo
              </button>
            )}


            <p className="logo-help">
              Recommended: PNG or JPG image
            </p>

          </div>

        </div>


        {/* =========================
            DATA MANAGEMENT
        ========================= */}

        <div className="settings-card data-card">

          <div className="settings-card-header">

            <div className="settings-card-icon green">
              <FaDownload />
            </div>

            <div>
              <h2>Data Management</h2>

              <p>
                Backup and restore your JDS data
              </p>
            </div>

          </div>


          <div className="data-actions">

            <button
              className="backup-btn"
              onClick={backupData}
            >
              <FaDownload />

              <div>
                <strong>
                  Backup Data
                </strong>

                <span>
                  Download all application data
                </span>
              </div>

            </button>


            <label className="restore-btn">

              <FaUpload />

              <div>
                <strong>
                  Restore Backup
                </strong>

                <span>
                  Import previous JDS data
                </span>
              </div>

              <input
                type="file"
                hidden
                accept=".json"
                onChange={restoreData}
              />

            </label>

          </div>

        </div>

      </div>


      {/* =========================
          SAVE
      ========================= */}

      <div className="settings-save-section">

        <button
          className="settings-save-btn"
          onClick={saveSettings}
          disabled={saving}
        >
          <FaSave />

          {saving
            ? "Saving..."
            : "Save Settings"}
        </button>

      </div>

    </div>
  );
}

export default Settings;