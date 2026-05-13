import { CookieOptions } from "express"

export const cookieConfig: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
    secure: process.env.STAGE === "PROD"
}