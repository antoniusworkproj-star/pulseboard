"use client";

import { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const loadTasks = useCallback(async () => {
    setError("");
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memuat tugas");
      setTasks(data.tasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function handleCreate(payload) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menambahkan tugas");
      setTasks((prev) => [...prev, data.task]);
      setFormOpen(false);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggleDone(task) {
    const nextStatus = task.status === "done" ? "todo" : "done";
    setBusyId(task.id);
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t))
    );
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: task.status } : t))
      );
      setError("Gagal memperbarui status tugas. Coba lagi.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(task) {
    setBusyId(task.id);
    const prevTasks = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    try {
      const res = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      setTasks(prevTasks);
      setError("Gagal menghapus tugas. Coba lagi.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar tasks={tasks} onNewTask={() => setFormOpen(true)} />

      <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-3xl">
          {error && (
            <div className="mb-6 border border-urgency-critical/50 bg-urgency-critical/10 px-4 py-3 font-mono text-sm text-urgency-critical">
              ! {error}
            </div>
          )}

          {loading ? (
            <div className="border border-void-line px-6 py-14 text-center font-mono text-sm text-ink-faint">
              &gt; menghubungkan ke google sheets...
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onToggleDone={handleToggleDone}
              onDelete={handleDelete}
              busyId={busyId}
            />
          )}
        </div>
      </main>

      <TaskForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreate}
        submitting={submitting}
      />
    </div>
  );
}
