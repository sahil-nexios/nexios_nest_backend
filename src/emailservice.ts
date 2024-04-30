import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

@Injectable()

export class EmailService {
    async schedule(sendData: any): Promise<any> {
        try {
            const file_template = sendData.file_template;
            const subject = sendData.subject;

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.YOUR_EMAIL,
                    pass: process.env.YOUR_APP_PASSWORD,
                },
            });

            const html = fs.readFileSync(file_template, { encoding: 'utf-8' });
            const template = handlebars.compile(html);
            const htmlToSend = template(sendData);

            const mailOptions = {
                from: process.env.YOUR_EMAIL,
                to: process.env.To_EMAIL,
                subject: subject,
                html: htmlToSend,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            return { status: true, data: [], message: 'Mail sent successfully!' };
        } catch (error) {
            console.error('Error in sending email:', error);
            return { status: false, data: [], message: 'Unable to send email!' };
        }
    }

    async applynow(sendData: any): Promise<{ status: boolean; data: any[]; message: string }> {
        try {
            let html = fs.readFileSync(sendData.file_template, { encoding: 'utf-8' });
            let template = handlebars.compile(html);
            let htmlToSend = template(sendData);

            let resumeFile = fs.readFileSync(sendData.pdfpath);
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.YOUR_EMAIL,
                    pass: process.env.YOUR_APP_PASSWORD,
                },
            });
            let mailOptions = {
                from: process.env.YOUR_EMAIL,
                to: process.env.To_EMAIL,
                subject: 'Job Application',
                html: htmlToSend,
                attachments: [
                    {
                        filename: 'resume.pdf',
                        content: resumeFile,
                    },
                ],
            };

            let info = await transporter.sendMail(mailOptions);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return { status: true, data: [], message: 'Mail sent successfully!' };
        } catch (error) {
            console.error('Error sending email:', error);
            return { status: false, data: [], message: 'Could not send mail!' };
        }
    }

    async contact_usemail(sendData: any): Promise<{ status: boolean; data: any[]; message: string }> {
        try {
            const file_template = sendData.file_template;
            const subject = sendData.subject;

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.YOUR_EMAIL,
                    pass: process.env.YOUR_APP_PASSWORD,
                },
            });

            const html = fs.readFileSync(file_template, { encoding: 'utf-8' });
            const template = handlebars.compile(html);
            const htmlToSend = template(sendData);

            const mailOptions = {
                from: process.env.YOUR_EMAIL,
                to: process.env.To_EMAIL,
                subject: subject,
                html: htmlToSend,
            };

            const info = await transporter.sendMail(mailOptions);

            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return { status: true, data: [], message: 'Mail sent successfully!' };
        } catch (error) {
            console.error('Error sending email:', error);
            return { status: false, data: [], message: 'Unable to send email!' };
        }
    }

}
