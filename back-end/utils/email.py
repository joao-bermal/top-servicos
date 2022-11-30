import smtplib


def send_email(email: str, reset_code: str):
    smtp_server = "smtp.gmail.com"
    port = 587
    sender_email = "topservicos.advocacia@gmail.com"
    password = "dkfevgftbawtiast"
    receiver_email = email
    message = reset_code

    mailserver = smtplib.SMTP(smtp_server, port)
    mailserver.ehlo()
    mailserver.starttls()
    mailserver.login(sender_email, password)
    mailserver.sendmail(sender_email, receiver_email, message)
    mailserver.quit()