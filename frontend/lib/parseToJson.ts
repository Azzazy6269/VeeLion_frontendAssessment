import { NextResponse } from "next/server";

export async function parseToJson<T>(
  request: Request
): Promise<{ success: true; data: T } | { success: false; response: NextResponse }> {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return {
        success: false,
        response: NextResponse.json(
          { error: { message: "Request body must be a valid JSON object." } },
          { status: 400 }
        ),
      };
    }

    return { success: true, data: body as T };
  } catch {
    return {
      success: false,
      response: NextResponse.json(
        { error: { message: "Invalid JSON body format" } },
        { status: 400 }
      ),
    };
  }
}