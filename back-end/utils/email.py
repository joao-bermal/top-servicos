import os
import smtplib

from dotenv import load_dotenv

load_dotenv(".env")

def send_email(email: str, reset_code: str):
    smtp_server = os.environ["EMAIL_SMPT_SERVER"]
    port = os.environ["EMAIL_PORT"]
    sender_email = os.environ["EMAIL_SENDER"]
    password = os.environ["EMAIL_PASSWORD"]
    receiver_email = email
    message = reset_code

    mailserver = smtplib.SMTP(smtp_server, port)
    mailserver.ehlo()
    mailserver.starttls()
    mailserver.login(sender_email, password)
    mailserver.sendmail(sender_email, receiver_email, message)
    mailserver.quit()