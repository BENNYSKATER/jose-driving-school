export const backupData = () => {
  const data = {
    students: JSON.parse(localStorage.getItem("students")) || [],
    vehicles: JSON.parse(localStorage.getItem("vehicles")) || [],
    instructors: JSON.parse(localStorage.getItem("instructors")) || [],
    schedules: JSON.parse(localStorage.getItem("schedules")) || [],
    attendance: JSON.parse(localStorage.getItem("attendance")) || [],
    settings: JSON.parse(localStorage.getItem("settings")) || {},
  };

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "JDS_Backup.json";

  a.click();

  URL.revokeObjectURL(url);
};

export const restoreData = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const data = JSON.parse(e.target.result);

    localStorage.setItem(
      "students",
      JSON.stringify(data.students || [])
    );

    localStorage.setItem(
      "vehicles",
      JSON.stringify(data.vehicles || [])
    );

    localStorage.setItem(
      "instructors",
      JSON.stringify(data.instructors || [])
    );

    localStorage.setItem(
      "schedules",
      JSON.stringify(data.schedules || [])
    );

    localStorage.setItem(
      "attendance",
      JSON.stringify(data.attendance || [])
    );

    localStorage.setItem(
      "settings",
      JSON.stringify(data.settings || {})
    );

    alert("Backup Restored Successfully ✅");

    window.location.reload();
  };

  reader.readAsText(file);
};