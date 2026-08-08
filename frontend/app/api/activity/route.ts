import { NextResponse } from "next/server";
import {
  createActivityInBackend,
  getActivityFromBackend,
} from "@/lib/backendApi/activityApi";
import { parseToJson } from "@/lib/parseToJson";
import { createActivityBodySchema } from "@/lib/validations/activity";
import type { CreateActivityRequest } from "@/types/api";

export async function GET() {
  try {
    const logs = await getActivityFromBackend();
    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to fetch activity logs." } },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const jsonFormat = await parseToJson<CreateActivityRequest>(request);
    if (!jsonFormat.success) {
      return jsonFormat.response;
    }

    const validation = createActivityBodySchema.safeParse(jsonFormat.data);

    if (!validation.success) {
      const errorMessages = validation.error.issues.map((issue) => issue.message);
      return NextResponse.json(
        { error: { message: errorMessages } },
        { status: 400 }
      );
    }

    const newActivity = await createActivityInBackend(validation.data);
    return NextResponse.json(newActivity, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {error: {message: error instanceof Error ? error.message : "Failed to create activity log."}},
      { status: 400 }
    );
  }
}