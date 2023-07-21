import sgMail from "@sendgrid/mail"
import { NextApiRequest, NextApiResponse } from "next/types"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { email, type, message } = req.body
        const key = process.env.SENDGRID_API_KEY
        if (!key) throw new Error("No SendGrid API key found")
        sgMail.setApiKey(key)
        const sendmsg = {
            to: "intellislides.contact@gmail.com",
            from: email,
            subject: `Contact form submission: ${type}`,
            text: message,
        }
        const sendresponse = await sgMail.send(sendmsg)
        if (
            sendresponse[0].statusCode < 200 ||
            sendresponse[0].statusCode >= 300
        ) {
            const returnmsg = {
                to: email,
                from: "intellislides.contact@gmail.com",
                subject: `Email Sent Confirmation`,
                text: `This is an automated response to let you know that we have received your email and will get back to you as soon as possible. \n\nYour message: ${message}`,
            }
            const returnresponse = await sgMail.send(returnmsg)
            if (
                returnresponse[0].statusCode < 200 ||
                returnresponse[0].statusCode >= 300
            ) {
                return res.status(200).send("OK")
            } else {
                return res
                    .status(sendresponse[0].statusCode)
                    .send("Unable to send email! Please try again later.")
            }
        } else {
            return res
                .status(sendresponse[0].statusCode)
                .send("Unable to send email! Please try again later.")
        }
    } catch (err) {
        return res.status(err.status).send(err)
    }
}
