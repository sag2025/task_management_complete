const timers = new Map();

class Scheduler {
  static schedule(taskId, remindAt, callback) {
   const delay = new Date(remindAt).getTime() - Date.now();
   console.log("inside scheduler",delay);

    if (delay <= 0) {
      console.log(" Skipping past reminder:", taskId);
      return;
    }

    // clear old timer
    this.cancel(taskId);

    const timeoutId = setTimeout(async () => {
      console.log(" Reminder triggered:", taskId);

      try {
        await callback();
      } catch (err) {
        console.error("Callback error:", err);
      }

      timers.delete(taskId);
    }, delay);

    timers.set(taskId, timeoutId);
  }

  static cancel(taskId) {
    if (timers.has(taskId)) {
      clearTimeout(timers.get(taskId));
      timers.delete(taskId);
      console.log(" Timer cancelled:", taskId);
    }
  }
}

module.exports = Scheduler;