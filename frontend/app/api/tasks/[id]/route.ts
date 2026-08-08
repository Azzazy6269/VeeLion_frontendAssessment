import { NextResponse } from "next/server";
import { deleteTaskFromBackend, getTaskByIdFromBackend, updateTaskInBackend } from "@/lib/backendApi/taskApi";
import { parseToJson } from "@/lib/parseToJson";
import { PatchTaskRequest } from "@/types/api";
import { paramsIdSchema, updateTaskBodySchema } from "@/lib/validations/task";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const jsonFormat = await parseToJson<PatchTaskRequest>(request);
        if(!jsonFormat.success){
          return jsonFormat.response;
        }

    const validation = updateTaskBodySchema.safeParse(jsonFormat.data);
        if (!validation.success) {
          const errorMessages = validation.error.issues.map((issue) => issue.message);
          return NextResponse.json(
            { error: { message: errorMessages} },
            { status: 400 }
          );
        }
    
    const validationParams = paramsIdSchema.safeParse(params);
        if (!validationParams.success) {
          const errorMessages = validationParams.error.issues.map((issue) => issue.message);
          return NextResponse.json(
            { error: { message: errorMessages} },
            { status: 400 }
          );
        }

    const task = await updateTaskInBackend(validationParams.data.id, validation.data);
    return NextResponse.json({ data: task }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to update task." } },
      { status: 500 }
    );
  }
}

export async function GET(request: Request,{ params }: RouteParams) {
  try {
    console.log(await params)
    const validationParams = paramsIdSchema.safeParse(params);
        if (!validationParams.success) {
          const errorMessages = validationParams.error.issues.map((issue) => issue.message);
          return NextResponse.json(
            { error: { message: errorMessages} },
            { status: 400 }
          );
        }

    const task = await getTaskByIdFromBackend(validationParams.data.id);
    return NextResponse.json({ data: task }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Task not found." } },
      { status: 404 }
    );
  }
}

export async function DELETE(request: Request,{ params }: RouteParams) {
  try {
    console.log(await params)
    const validationParams = paramsIdSchema.safeParse(params);
        if (!validationParams.success) {
          const errorMessages = validationParams.error.issues.map((issue) => issue.message);
          return NextResponse.json(
            { error: { message: errorMessages} },
            { status: 400 }
          );
        }

    const task = await deleteTaskFromBackend(validationParams.data.id);
    return NextResponse.json({ data: task }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Task not found." } },
      { status: 404 }
    );
  }
}
