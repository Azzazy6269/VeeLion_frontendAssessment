import { NextResponse } from "next/server";
import { createTaskInBackend, getTasksFromBackend } from "@/lib/backendApi/taskApi";

import { createTaskBodySchema } from "@/lib/validations/task";
import { parseToJson } from "@/lib/parseToJson";
import { CreateTaskRequest } from "@/types/api";

export async function GET() {
  try {
    const tasks = await getTasksFromBackend();
    return NextResponse.json({ data: tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to fetch tasks." } },
      { status: 500 }
    );
  }
}



export async function POST(request: Request) {
  try {
    const jsonFormat = await parseToJson<CreateTaskRequest>(request);
    if(!jsonFormat.success){
      return jsonFormat.response;
    }
    const validation = createTaskBodySchema.safeParse(jsonFormat.data);

    if (!validation.success) {
      //console.log(validation.error)
      const errorMessages = validation.error.issues.map((issue) => issue.message);
      return NextResponse.json(
        { error: { message: errorMessages} },
        { status: 400 }
      );
    }
    console.log(validation.data)
    const task = await createTaskInBackend(validation.data);
    return NextResponse.json({ data: task }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Failed to create task." } },
      { status: 400 }
    );
  }
}


/*
{
    "error": {
        "message": [
            {
                "origin": "string",
                "code": "too_small",
                "minimum": 3,
                "inclusive": true,
                "path": [
                    "title"
                ],
                "message": "Title min length = 3"
            }
        ]
    }
}
*/