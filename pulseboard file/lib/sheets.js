import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SHEET_TITLE = "Tasks";
const HEADERS = [
  "id",
  "title",
  "description",
  "deadline",
  "urgency",
  "status",
  "createdAt",
  "updatedAt",
];

let cachedDoc = null;

function getEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Variabel environment ${name} belum diset. Cek README untuk setup Google Sheets.`
    );
  }
  return value;
}

function getAuth() {
  const email = getEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  // Vercel/`.env` menyimpan newline sebagai literal \n, jadi perlu diubah kembali
  const key = getEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");

  return new JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function getDoc() {
  if (cachedDoc) return cachedDoc;

  const sheetId = getEnv("GOOGLE_SHEET_ID");
  const doc = new GoogleSpreadsheet(sheetId, getAuth());
  await doc.loadInfo();
  cachedDoc = doc;
  return doc;
}

async function getTaskSheet() {
  const doc = await getDoc();
  let sheet = doc.sheetsByTitle[SHEET_TITLE];

  if (!sheet) {
    sheet = await doc.addSheet({ title: SHEET_TITLE, headerValues: HEADERS });
  } else if (!sheet.headerValues || sheet.headerValues.length === 0) {
    await sheet.setHeaderRow(HEADERS);
  }

  return sheet;
}

function rowToTask(row) {
  return {
    id: row.get("id"),
    title: row.get("title") || "",
    description: row.get("description") || "",
    deadline: row.get("deadline") || "",
    urgency: row.get("urgency") || "medium",
    status: row.get("status") || "todo",
    createdAt: row.get("createdAt") || "",
    updatedAt: row.get("updatedAt") || "",
  };
}

export async function listTasks() {
  const sheet = await getTaskSheet();
  const rows = await sheet.getRows();
  return rows.map(rowToTask).sort((a, b) => {
    // Belum selesai dulu, lalu urutkan berdasarkan deadline terdekat
    if (a.status !== b.status) return a.status === "done" ? 1 : -1;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline) - new Date(b.deadline);
  });
}

export async function createTask(data) {
  const sheet = await getTaskSheet();
  const now = new Date().toISOString();
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const row = await sheet.addRow({
    id,
    title: data.title,
    description: data.description || "",
    deadline: data.deadline || "",
    urgency: data.urgency || "medium",
    status: "todo",
    createdAt: now,
    updatedAt: now,
  });

  return rowToTask(row);
}

async function findRow(sheet, id) {
  const rows = await sheet.getRows();
  const row = rows.find((r) => r.get("id") === id);
  if (!row) {
    const err = new Error("Task tidak ditemukan");
    err.status = 404;
    throw err;
  }
  return row;
}

export async function updateTask(id, updates) {
  const sheet = await getTaskSheet();
  const row = await findRow(sheet, id);

  const fields = ["title", "description", "deadline", "urgency", "status"];
  for (const field of fields) {
    if (updates[field] !== undefined) {
      row.set(field, updates[field]);
    }
  }
  row.set("updatedAt", new Date().toISOString());
  await row.save();

  return rowToTask(row);
}

export async function deleteTask(id) {
  const sheet = await getTaskSheet();
  const row = await findRow(sheet, id);
  await row.delete();
  return { id };
}
