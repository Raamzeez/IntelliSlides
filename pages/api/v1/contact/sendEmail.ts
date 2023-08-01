import sgMail from "@sendgrid/mail"
import { customAlphabet, nanoid } from 'nanoid'
import nodemailer from 'nodemailer'
import { NextApiRequest, NextApiResponse } from "next/types"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log('Calling Email API Handler')
        const { email, type, message } = req.body
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'forwarderbot4@gmail.com',
                pass: 'zctwdylpoulwllau'
            }
        });
        // const key = process.env.SENDGRID_API_KEY
        const nanoid = customAlphabet('1234567890', 12)
        const id = nanoid()
        // if (!key) throw new Error("No SendGrid API key found")
        // sgMail.setApiKey(key)
        const sendmsg = {
            to: "intellislides.contact@gmail.com",
            from: 'forwarderbot4@gmail.com',
            subject: `Contact form submission: ${type} - #${id}`,
            text: message,
        }
        const response = await transporter.sendMail(sendmsg)
        const status = parseInt(response.response.split()[0])
        console.log(status)
        if (status < 200 || status >= 300) {
            console.error(response.response)
            return res.status(404).send("Unable to send email! Please try again later.")
        }
        return res.status(200).send("OK")
        // const sendresponse = await sgMail.send(sendmsg)
        // console.log('Send Response Email 1:', sendresponse)
        // if (
        //     !(sendresponse[0].statusCode < 200 ||
        //     sendresponse[0].statusCode >= 300)
        // ) {
        //     console.log('Valid response 1')
        //     const returnmsg = {
        //         to: email,
        //         from: "intellislides.contact@gmail.com",
        //         subject: `Email Sent Confirmation - #${id}`,
        //         text: `This is an automated response to let you know that we have received your email and will get back to you as soon as possible. \n\nYour support ticket id is #${id} in case you need to reference it in a follow up.\n\nYour message: ${message}`,
        //     }
        //     const returnresponse = await sgMail.send(returnmsg)
        //     console.log('Send Response Email 2:', returnresponse)
        //     if (
        //         !(returnresponse[0].statusCode < 200 ||
        //         returnresponse[0].statusCode >= 300)
        //     ) {
        //         console.log("Valid response 2")
        //         return res.status(200).send("OK")
        //     } else {
        //         console.error("Invalid response 2")
        //         return res
        //             .status(sendresponse[0].statusCode)
        //             .send("Unable to send email! Please try again later.")
        //     }
        // } else {
        //     console.error('Invalid response 1')
        //     return res
        //         .status(sendresponse[0].statusCode)
        //         .send("Unable to send email! Please try again later.")
        // }
    } catch (err) {
        console.error(err)
        return res.status(404).send(err)
    }
}
