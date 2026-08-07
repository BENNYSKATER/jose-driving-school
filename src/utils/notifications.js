export const getNotifications = (
  students,
  schedules,
  vehicles
) => {
  const notifications = [];

  // Pending Fees
  students.forEach((student) => {
    if ((student.balance || 0) > 0) {
      notifications.push({
        type: "fee",
        message: `${student.name} - Pending Fee ₹${student.balance}`,
      });
    }
  });

  // Today's Practice
  const today = new Date().toISOString().split("T")[0];

  schedules.forEach((schedule) => {
    if (schedule.date === today) {
      notifications.push({
        type: "schedule",
        message: `${schedule.studentName} - Practice Today (${schedule.time})`,
      });
    }
  });

  // Vehicle Service
  vehicles.forEach((vehicle) => {
    if (vehicle.serviceDue === "Yes") {
      notifications.push({
        type: "vehicle",
        message: `${vehicle.vehicleNo} - Service Due`,
      });
    }
  });

  return notifications;
};