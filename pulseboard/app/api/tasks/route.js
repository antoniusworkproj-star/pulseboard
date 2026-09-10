import { NextResponse } from "next/server";
import { listTasks, createTask } from "@/lib/sheets";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const tasks = await listTasks();
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Gagal memuat data dari Google Sheet" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { error: "Judul pekerjaan wajib diisi" },
        { status: 400 }
      );
    }

    const task = await createTask({
      title: body.title.trim(),
      description: body.description || "",
      deadline: body.deadline || "",
      urgency: body.urgency || "medium",
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Gagal menambahkan pekerjaan" },
      { status: 500 }
    );
  }
}
