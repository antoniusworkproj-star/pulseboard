import { NextResponse } from "next/server";
import { updateTask, deleteTask } from "@/lib/sheets";

export const dynamic = "force-dynamic";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const task = await updateTask(id, body);
    return NextResponse.json({ task });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Gagal memperbarui pekerjaan" },
      { status: error.status || 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deleteTask(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Gagal menghapus pekerjaan" },
      { status: error.status || 500 }
    );
  }
}
